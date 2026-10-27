import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Minimap } from '../src/application/editor/minimap.ts'
import {
  ZOOM_LEVELS,
  type MapFrame,
  type MapView,
  type MapViewport,
  type ZoomLevel
} from '../src/application/map/map-grid.ts'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

const WORLD: MapFrame = {
  x: 100,
  y: 200,
  width: 1000,
  height: 500
}

const INITIAL_VIEW: MapView = {
  ...WORLD,
  zoomLevel: 1
}

function createMapViewport(initialView: MapView = INITIAL_VIEW) {
  let view = { ...initialView }
  const listeners: Array<(view: MapView) => void> = []

  const map: MapViewport = {
    getWorldFrame: vi.fn(() => ({ ...WORLD })),
    getView: vi.fn(() => ({ ...view })),
    setZoomLevel: vi.fn((level: ZoomLevel) => {
      view = { ...view, zoomLevel: level }

      for (const listener of listeners) {
        listener({ ...view })
      }
    }),
    centerOn: vi.fn((x: number, y: number) => {
      view = {
        ...view,
        x: x - view.width / 2,
        y: y - view.height / 2
      }

      for (const listener of listeners) {
        listener({ ...view })
      }
    }),
    onViewChange: vi.fn((listener: (view: MapView) => void) => {
      listeners.push(listener)
    })
  }

  const emitView = (nextView: MapView): void => {
    view = { ...nextView }

    for (const listener of listeners) {
      listener({ ...view })
    }
  }

  return { map, emitView }
}

function getSvg(minimap: Minimap): SVGSVGElement {
  const svg = minimap.element.querySelector<SVGSVGElement>('svg')

  if (!svg) {
    throw new Error('Minimap SVG element was not found')
  }

  return svg
}

function getViewport(minimap: Minimap): SVGRectElement {
  const viewport = minimap.element.querySelector<SVGRectElement>(
    '.minimap__viewport'
  )

  if (!viewport) {
    throw new Error('Minimap viewport was not found')
  }

  return viewport
}

function getZoomButton(
  minimap: Minimap,
  level: ZoomLevel
): HTMLButtonElement {
  const button = minimap.element.querySelector<HTMLButtonElement>(
    `[aria-label="Zoom ${level}"]`
  )

  if (!button) {
    throw new Error(`Zoom button ${level} was not found`)
  }

  return button
}

function expectViewport(
  minimap: Minimap,
  view: MapView
): void {
  const viewport = getViewport(minimap)

  expect(viewport.getAttribute('x')).toBe(String(view.x))
  expect(viewport.getAttribute('y')).toBe(String(view.y))
  expect(viewport.getAttribute('width')).toBe(String(view.width))
  expect(viewport.getAttribute('height')).toBe(String(view.height))
}

function mockSvgCoordinates(
  svg: SVGSVGElement,
  transform: (x: number, y: number) => { x: number; y: number }
): void {
  const matrix = {
    inverse: vi.fn(() => matrix)
  }

  Object.defineProperty(svg, 'getScreenCTM', {
    configurable: true,
    value: vi.fn(() => matrix)
  })

  Object.defineProperty(svg, 'createSVGPoint', {
    configurable: true,
    value: vi.fn(() => ({
      x: 0,
      y: 0,
      matrixTransform() {
        return transform(this.x, this.y)
      }
    }))
  })
}

describe('Minimap — existing behavior', () => {
  beforeEach(() => {
    document.body.replaceChildren()
  })

  it('creates an accessible section', () => {
    const minimap = new Minimap(WORLD)

    expect(minimap.element.tagName.toLowerCase()).toBe('section')
    expect(minimap.element.className).toBe('minimap')
    expect(minimap.element.getAttribute('aria-label')).toBe('Minimap')
  })

  it('sets the world aspect ratio', () => {
    const minimap = new Minimap(WORLD)

    expect(
      minimap.element.style.getPropertyValue('--world-aspect')
    ).toBe('2')
  })

  it('creates the heading and north indicator', () => {
    const minimap = new Minimap(WORLD)

    expect(
      minimap.element.querySelector('.minimap__title')?.textContent
    ).toBe('Minimap')

    expect(
      minimap.element.querySelector('.minimap__north')?.textContent
    ).toBe('N')
  })

  it('creates an accessible zoom control group', () => {
    const minimap = new Minimap(WORLD)
    const group = minimap.element.querySelector(
      '.minimap__zoom-levels'
    )

    expect(group?.getAttribute('role')).toBe('group')
    expect(group?.getAttribute('aria-label')).toBe('Zoom level')

    expect(
      minimap.element.querySelector('.minimap__zoom-label')?.textContent
    ).toBe('Zoom')
  })

  it('creates all five zoom buttons', () => {
    const minimap = new Minimap(WORLD)

    expect(
      minimap.element.querySelectorAll('.zoom-button')
    ).toHaveLength(ZOOM_LEVELS.length)

    for (const level of ZOOM_LEVELS) {
      const button = getZoomButton(minimap, level)

      expect(button.type).toBe('button')
      expect(button.textContent).toBe(String(level))
    }
  })

  it('selects zoom level 1 initially', () => {
    const minimap = new Minimap(WORLD)

    for (const level of ZOOM_LEVELS) {
      const button = getZoomButton(minimap, level)
      const selected = level === 1

      expect(button.classList.contains('is-selected')).toBe(selected)
      expect(button.getAttribute('aria-pressed')).toBe(
        selected ? 'true' : 'false'
      )
    }
  })

  it('creates an SVG canvas with the expected structure', () => {
    const minimap = new Minimap(WORLD)
    const svg = getSvg(minimap)

    expect(svg.namespaceURI).toBe(SVG_NAMESPACE)
    expect(svg.classList.contains('minimap__grid')).toBe(true)
    expect(
      minimap.element.querySelector('.minimap__frame')?.contains(svg)
    ).toBe(true)

    expect(svg.querySelector('.minimap__hexagons')).not.toBeNull()
    expect(getViewport(minimap).parentElement).toBe(svg)
  })

  it('renders the same number of hexagons as the world map', () => {
    const minimap = new Minimap(WORLD)
    const hexagons = minimap.element.querySelectorAll(
      '.minimap__hexagons polygon'
    )

    expect(hexagons).toHaveLength(1174)
  })

  it('draws the viewport above the hexagon layer', () => {
    const minimap = new Minimap(WORLD)
    const svg = getSvg(minimap)
    const viewport = getViewport(minimap)

    expect(svg.lastElementChild).toBe(viewport)
  })

  it('registers a view listener when connected', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()

    minimap.connect(map)

    expect(map.onViewChange).toHaveBeenCalledOnce()
    expect(map.getView).toHaveBeenCalledOnce()
  })

  it('shows the current map viewport immediately on connection', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()

    minimap.connect(map)

    expectViewport(minimap, INITIAL_VIEW)
  })

  it('updates the viewport when the main map view changes', () => {
    const minimap = new Minimap(WORLD)
    const { map, emitView } = createMapViewport()

    minimap.connect(map)

    const nextView: MapView = {
      x: 250,
      y: 275,
      width: 400,
      height: 200,
      zoomLevel: 3
    }

    emitView(nextView)

    expectViewport(minimap, nextView)
  })

  it('updates the selected zoom indicator when the view changes', () => {
    const minimap = new Minimap(WORLD)
    const { map, emitView } = createMapViewport()

    minimap.connect(map)

    emitView({
      x: 300,
      y: 300,
      width: 200,
      height: 100,
      zoomLevel: 4
    })

    for (const level of ZOOM_LEVELS) {
      const button = getZoomButton(minimap, level)
      const selected = level === 4

      expect(button.classList.contains('is-selected')).toBe(selected)
      expect(button.getAttribute('aria-pressed')).toBe(
        selected ? 'true' : 'false'
      )
    }
  })

  it('forwards zoom button clicks to the main map', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()

    minimap.connect(map)

    for (const level of ZOOM_LEVELS) {
      getZoomButton(minimap, level).click()

      expect(map.setZoomLevel).toHaveBeenLastCalledWith(level)
    }

    expect(map.setZoomLevel).toHaveBeenCalledTimes(5)
  })

  it('updates the zoom indicator after clicking a zoom button', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()

    minimap.connect(map)
    getZoomButton(minimap, 5).click()

    expect(getZoomButton(minimap, 5).getAttribute('aria-pressed')).toBe(
      'true'
    )
    expect(getZoomButton(minimap, 1).getAttribute('aria-pressed')).toBe(
      'false'
    )
  })

  it('does not change zoom before connecting to a map', () => {
    const minimap = new Minimap(WORLD)

    getZoomButton(minimap, 4).click()

    expect(getZoomButton(minimap, 1).getAttribute('aria-pressed')).toBe(
      'true'
    )
    expect(getZoomButton(minimap, 4).getAttribute('aria-pressed')).toBe(
      'false'
    )
  })

  it('converts minimap clicks into world coordinates', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()
    const svg = getSvg(minimap)

    minimap.connect(map)

    mockSvgCoordinates(svg, (x, y) => ({
      x: x * 2 + 100,
      y: y * 3 + 200
    }))

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 150,
      clientY: 80
    }))

    expect(map.centerOn).toHaveBeenCalledExactlyOnceWith(400, 440)
  })

  it('ignores minimap clicks when no SVG transformation exists', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()
    const svg = getSvg(minimap)

    minimap.connect(map)

    Object.defineProperty(svg, 'getScreenCTM', {
      configurable: true,
      value: vi.fn(() => null)
    })

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 150,
      clientY: 80
    }))

    expect(map.centerOn).not.toHaveBeenCalled()
  })

  it('does not center an unconnected map', () => {
    const minimap = new Minimap(WORLD)
    const svg = getSvg(minimap)

    mockSvgCoordinates(svg, (x, y) => ({ x, y }))

    expect(() => {
      svg.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        clientX: 150,
        clientY: 80
      }))
    }).not.toThrow()
  })

  it('updates the viewport after centering through a minimap click', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()
    const svg = getSvg(minimap)

    minimap.connect(map)

    mockSvgCoordinates(svg, (x, y) => ({ x, y }))

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 600,
      clientY: 350
    }))

    expect(map.centerOn).toHaveBeenCalledWith(600, 350)

    expectViewport(minimap, {
      x: 100,
      y: 100,
      width: 1000,
      height: 500,
      zoomLevel: 1
    })
  })

  it('preserves click coordinates near the minimap boundaries', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()
    const svg = getSvg(minimap)

    minimap.connect(map)
    mockSvgCoordinates(svg, (x, y) => ({ x, y }))

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: WORLD.x,
      clientY: WORLD.y
    }))

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: WORLD.x + WORLD.width,
      clientY: WORLD.y + WORLD.height
    }))

    expect(map.centerOn).toHaveBeenNthCalledWith(
      1,
      WORLD.x,
      WORLD.y
    )

    expect(map.centerOn).toHaveBeenNthCalledWith(
      2,
      WORLD.x + WORLD.width,
      WORLD.y + WORLD.height
    )
  })

  it('keeps separate minimap instances independent', () => {
    const first = new Minimap(WORLD)
    const second = new Minimap(WORLD)
    const firstMap = createMapViewport()
    const secondMap = createMapViewport()

    first.connect(firstMap.map)
    second.connect(secondMap.map)

    firstMap.emitView({
      x: 300,
      y: 300,
      width: 200,
      height: 100,
      zoomLevel: 5
    })

    expect(getZoomButton(first, 5).getAttribute('aria-pressed')).toBe(
      'true'
    )

    expect(getZoomButton(second, 1).getAttribute('aria-pressed')).toBe(
      'true'
    )

    expectViewport(second, INITIAL_VIEW)
  })

  it('does not expose internal fields as ordinary properties', () => {
    const minimap = new Minimap(WORLD)

    const privateNames = [
      'svg',
      'viewport',
      'zoomButtons',
      'zoomListener',
      'centerListener'
    ]

    for (const name of privateNames) {
      expect(Object.hasOwn(minimap, name)).toBe(false)
      expect(Reflect.get(minimap, name)).toBeUndefined()
    }

    expect(Reflect.get(minimap, '#svg')).toBeUndefined()
    expect(Reflect.get(minimap, '#viewport')).toBeUndefined()
  })

  it('does not expose the private showView method', () => {
    const minimap = new Minimap(WORLD)

    expect(Reflect.get(minimap, 'showView')).toBeUndefined()
    expect('showView' in minimap).toBe(false)
    expect(Reflect.get(minimap, '#showView')).toBeUndefined()
  })

  it('exposes the root element through a read-only getter', () => {
    const minimap = new Minimap(WORLD)
    const originalElement = minimap.element

    const descriptor = Object.getOwnPropertyDescriptor(
      Minimap.prototype,
      'element'
    )

    expect(descriptor?.get).toBeTypeOf('function')
    expect(descriptor?.set).toBeUndefined()

    expect(Object.hasOwn(minimap, 'element')).toBe(false)
    expect(minimap.element).toBe(originalElement)

    expect(
      Reflect.set(minimap, 'element', document.createElement('section'))
    ).toBe(false)

    expect(minimap.element).toBe(originalElement)
  })

  it('keeps internal listeners independent of shadow properties', () => {
    const minimap = new Minimap(WORLD)
    const { map } = createMapViewport()
    const fakeZoomListener = vi.fn()
    const fakeCenterListener = vi.fn()

    minimap.connect(map)

    Object.defineProperty(minimap, 'zoomListener', {
      value: fakeZoomListener,
      configurable: true
    })

    Object.defineProperty(minimap, 'centerListener', {
      value: fakeCenterListener,
      configurable: true
    })

    getZoomButton(minimap, 3).click()

    expect(map.setZoomLevel).toHaveBeenCalledWith(3)
    expect(fakeZoomListener).not.toHaveBeenCalled()

    const svg = getSvg(minimap)
    mockSvgCoordinates(svg, (x, y) => ({ x, y }))

    svg.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 400,
      clientY: 300
    }))

    expect(map.centerOn).toHaveBeenCalledWith(400, 300)
    expect(fakeCenterListener).not.toHaveBeenCalled()
  })
})