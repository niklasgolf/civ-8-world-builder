import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HexGrid } from 'midgard-hex-grid'
import {
  MapGrid,
  ZOOM_LEVELS
} from '../src/application/map/map-grid.ts'
import {
  HEX_BOUNDS,
  HEX_WORLD_WIDTH
} from '../src/library-svg-graphics/definitions/hex.ts'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

const createGraphic = (): SVGSVGElement =>
  document.createElementNS(SVG_NAMESPACE, 'svg')

const setViewport = (
  map: MapGrid,
  width = 800,
  height = 600
): void => {
  vi.spyOn(map.element, 'getBoundingClientRect').mockReturnValue({
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
    toJSON: () => ({})
  })
}

const firstCoordinate = (map: MapGrid) => {
  const coordinate = map.getCoordinates()[0]

  if (!coordinate) {
    throw new Error('MapGrid contains no coordinates')
  }

  return coordinate
}

const getPolygon = (
  map: MapGrid,
  coordinate: { x: number; y: number }
): SVGPolygonElement => {
  const polygon = map.element.querySelector<SVGPolygonElement>(
    `#hex-${coordinate.x}-${coordinate.y}`
  )

  if (!polygon) {
    throw new Error('Expected hexagon polygon was not found')
  }

  return polygon
}

describe('MapGrid — existing behavior', () => {
  beforeEach(() => {
    document.body.replaceChildren()

    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe(): void { }
        unobserve(): void { }
        disconnect(): void { }
      }
    )
  })

  it('creates an SVG map with the expected attributes', () => {
    const map = new MapGrid()

    expect(map.element.namespaceURI).toBe(SVG_NAMESPACE)
    expect(map.element.tagName.toLowerCase()).toBe('svg')
    expect(map.element.classList.contains('map-area__grid')).toBe(true)
    expect(map.element.getAttribute('role')).toBe('img')
    expect(map.element.getAttribute('aria-label')).toBe(
      'Hexagonal world map'
    )
    expect(map.element.getAttribute('preserveAspectRatio')).toBe(
      'xMidYMid meet'
    )
  })

  it('creates one polygon for every coordinate', () => {
    const map = new MapGrid()

    expect(map.getCoordinates().length).toBeGreaterThan(0)
    expect(
      map.element.querySelectorAll('polygon').length
    ).toBe(map.getCoordinates().length)
  })

  it('creates polygons with the expected identifiers and colors', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)
    const polygon = getPolygon(map, coordinate)

    expect(polygon.id).toBe(
      `hex-${coordinate.x}-${coordinate.y}`
    )
    expect(polygon.getAttribute('fill')).toBe('#0e4664')
    expect(polygon.getAttribute('stroke')).toBe('#3d8eab')
    expect(polygon.getAttribute('data-x')).toBe(String(coordinate.x))
    expect(polygon.getAttribute('data-y')).toBe(String(coordinate.y))
  })

  it('starts at zoom level 1 with the complete world frame', () => {
    const map = new MapGrid()
    const world = map.getWorldFrame()

    expect(map.getView()).toEqual({
      ...world,
      zoomLevel: 1
    })

    expect(map.element.getAttribute('viewBox')).toBe(
      `${world.x} ${world.y} ${world.width} ${world.height}`
    )
  })

  it('returns positive world dimensions and defensive copies', () => {
    const map = new MapGrid()
    const first = map.getWorldFrame()
    const second = map.getWorldFrame()

    expect(first.width).toBeGreaterThan(0)
    expect(first.height).toBeGreaterThan(0)
    expect(first).toEqual(second)
    expect(first).not.toBe(second)

    first.x = -999999

    expect(map.getWorldFrame().x).not.toBe(-999999)
  })

  it('returns unique coordinates', () => {
    const map = new MapGrid()
    const coordinates = map.getCoordinates()
    const keys = coordinates.map(({ x, y }) => `${x}-${y}`)

    expect(new Set(keys).size).toBe(coordinates.length)
  })

  it('returns defensive copies of coordinates', () => {
    const map = new MapGrid()
    const coordinates = map.getCoordinates()
    const original = { ...coordinates[0] }

    coordinates[0].x = -999999

    expect(map.getCoordinates()[0]).toEqual(original)
  })

  it('uses the same grid geometry as Midgard', () => {
    const map = new MapGrid()
    const grid = new HexGrid('x-dominated')
    const expected = grid.createGrid({
      hexDiameter: HEX_WORLD_WIDTH,
      skeletonWidth: 42,
      skeletonHeight: 13
    })

    expect(map.getCoordinates()).toEqual(
      expected.map(hexagon => ({
        x: hexagon.coordinate.x,
        y: hexagon.coordinate.y
      }))
    )
  })

  it('supports all five zoom levels', () => {
    const map = new MapGrid()
    setViewport(map)

    const widths: number[] = []

    for (const level of ZOOM_LEVELS) {
      map.setZoomLevel(level)

      expect(map.getView().zoomLevel).toBe(level)
      widths.push(map.getView().width)
    }

    expect(widths[0]).toBeGreaterThan(widths[1])
    expect(widths[1]).toBeGreaterThan(widths[2])
    expect(widths[2]).toBeGreaterThan(widths[3])
    expect(widths[3]).toBeGreaterThan(widths[4])
  })

  it('uses one world unit per pixel at zoom level 5', () => {
    const map = new MapGrid()
    setViewport(map, 800, 600)

    map.setZoomLevel(5)

    expect(map.getView().width).toBeCloseTo(800)
    expect(map.getView().height).toBeCloseTo(600)
  })

  it('fits the complete world at zoom level 1', () => {
    const map = new MapGrid()
    const world = map.getWorldFrame()
    setViewport(map)

    map.setZoomLevel(1)

    expect(map.getView().width).toBeGreaterThanOrEqual(
      world.width - 0.000001
    )
    expect(map.getView().height).toBeGreaterThanOrEqual(
      world.height - 0.000001
    )
  })

  it('centers the camera on a requested position', () => {
    const map = new MapGrid()
    const world = map.getWorldFrame()
    setViewport(map)

    map.setZoomLevel(5)
    map.centerOn(
      world.x + world.width / 2,
      world.y + world.height / 2
    )

    const view = map.getView()

    expect(view.x + view.width / 2).toBeCloseTo(
      world.x + world.width / 2
    )
    expect(view.y + view.height / 2).toBeCloseTo(
      world.y + world.height / 2
    )
  })

  it('clamps the camera to the world boundaries', () => {
    const map = new MapGrid()
    const world = map.getWorldFrame()
    setViewport(map)

    map.setZoomLevel(5)
    map.centerOn(-999999, -999999)

    expect(map.getView().x).toBeCloseTo(world.x)
    expect(map.getView().y).toBeCloseTo(world.y)
  })

  it('updates viewBox to match the current view', () => {
    const map = new MapGrid()
    setViewport(map)

    map.setZoomLevel(3)
    map.centerOn(500, 500)

    const view = map.getView()

    expect(map.element.getAttribute('viewBox')).toBe(
      `${view.x} ${view.y} ${view.width} ${view.height}`
    )
  })

  it('returns defensive copies of the current view', () => {
    const map = new MapGrid()
    const original = map.getView()
    const copy = map.getView()

    expect(copy).toEqual(original)
    expect(copy).not.toBe(original)

    copy.x = -999999

    expect(map.getView().x).toBe(original.x)
  })

  it('notifies registered view listeners', () => {
    const map = new MapGrid()
    const first = vi.fn()
    const second = vi.fn()

    map.onViewChange(first)
    map.onViewChange(second)
    map.setZoomLevel(2)

    expect(first).toHaveBeenCalledExactlyOnceWith(map.getView())
    expect(second).toHaveBeenCalledExactlyOnceWith(map.getView())
  })

  it('notifies listeners even if the visible view is unchanged', () => {
    const map = new MapGrid()
    const listener = vi.fn()

    map.onViewChange(listener)
    map.setZoomLevel(1)
    map.setZoomLevel(1)

    expect(listener).toHaveBeenCalledTimes(2)
  })

  it('notifies hexagon click listeners with coordinates', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)
    const first = vi.fn()
    const second = vi.fn()

    map.onHexClick(first)
    map.onHexClick(second)

    getPolygon(map, coordinate).dispatchEvent(new MouseEvent('click'))

    expect(first).toHaveBeenCalledExactlyOnceWith(coordinate)
    expect(second).toHaveBeenCalledExactlyOnceWith(coordinate)
  })

  it('updates the fill color of an existing hexagon', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)

    map.setHexFill(coordinate, '#ff0000')

    expect(
      getPolygon(map, coordinate).getAttribute('fill')
    ).toBe('#ff0000')
  })

  it('rejects fill changes for unknown coordinates', () => {
    const map = new MapGrid()

    expect(() =>
      map.setHexFill({ x: -999999, y: -999999 }, '#fff')
    ).toThrow(
      'No hexagon is rendered at coordinate (-999999, -999999).'
    )
  })

  it('positions and inserts hexagon graphics', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)
    const polygon = getPolygon(map, coordinate)
    const graphic = createGraphic()

    map.setHexGraphic(coordinate, graphic)

    expect(polygon.nextElementSibling).toBe(graphic)
    expect(graphic.getAttribute('data-hex-graphic')).toBe(
      `${coordinate.x}-${coordinate.y}`
    )
    expect(graphic.getAttribute('width')).toBe(
      String(HEX_BOUNDS.width)
    )
    expect(graphic.getAttribute('height')).toBe(
      String(HEX_BOUNDS.height)
    )
    expect(Number(graphic.getAttribute('x'))).toBeTypeOf('number')
    expect(Number(graphic.getAttribute('y'))).toBeTypeOf('number')
  })

  it('replaces previous graphics instead of duplicating them', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)
    const first = createGraphic()
    const second = createGraphic()

    map.setHexGraphic(coordinate, first)
    map.setHexGraphic(coordinate, second)

    expect(first.isConnected).toBe(false)
    expect(second.parentElement).toBe(map.element)
    expect(
      map.element.querySelectorAll('[data-hex-graphic]')
    ).toHaveLength(1)
  })

  it('preserves the hover state when replacing graphics', () => {
    const map = new MapGrid()
    const coordinate = firstCoordinate(map)
    const polygon = getPolygon(map, coordinate)
    const first = createGraphic()
    const second = createGraphic()

    map.setHexGraphic(coordinate, first)
    polygon.dispatchEvent(new Event('pointerenter'))

    expect(first.classList.contains('map-hex--hovered')).toBe(true)

    map.setHexGraphic(coordinate, second)

    expect(second.classList.contains('map-hex--hovered')).toBe(true)

    polygon.dispatchEvent(new Event('pointerleave'))

    expect(second.classList.contains('map-hex--hovered')).toBe(false)
  })

  it('rejects graphics for unknown coordinates', () => {
    const map = new MapGrid()

    expect(() =>
      map.setHexGraphic(
        { x: -999999, y: -999999 },
        createGraphic()
      )
    ).toThrow(
      'No hexagon is rendered at coordinate (-999999, -999999).'
    )
  })

  it('keeps separate map instances independent', () => {
    const first = new MapGrid()
    const second = new MapGrid()
    const coordinate = firstCoordinate(first)
    const listener = vi.fn()

    first.onHexClick(listener)
    first.setHexFill(coordinate, '#ff0000')

    expect(first.element).not.toBe(second.element)
    expect(
      getPolygon(second, coordinate).getAttribute('fill')
    ).toBe('#0e4664')

    getPolygon(second, coordinate).dispatchEvent(new MouseEvent('click'))

    expect(listener).not.toHaveBeenCalled()
  })

  it('does not expose private state as ordinary properties', () => {
    const map = new MapGrid()

    const privateNames = [
      'polygons',
      'graphics',
      'placements',
      'coordinates',
      'world',
      'viewListeners',
      'hexClickListeners',
      'centerX',
      'centerY',
      'zoomLevel',
      'view',
      'viewportWidth',
      'viewportHeight'
    ]

    for (const name of privateNames) {
      expect(Object.hasOwn(map, name)).toBe(false)
      expect(Reflect.get(map, name)).toBeUndefined()
    }
  })

  it('does not expose private methods as ordinary properties', () => {
    const map = new MapGrid()

    const privateMethods = [
      'applyView',
      'fittedViewSize',
      'fitScale',
      'clampCenter',
      'viewBoxOf'
    ]

    for (const name of privateMethods) {
      expect(Reflect.get(map, name)).toBeUndefined()
      expect(name in map).toBe(false)
    }
  })

  it('protects internal state against public property shadowing', () => {
    const map = new MapGrid()
    setViewport(map)

    Object.defineProperty(map, 'zoomLevel', {
      value: 999,
      writable: true,
      configurable: true
    })

    Object.defineProperty(map, 'centerX', {
      value: -999999,
      writable: true,
      configurable: true
    })

    Object.defineProperty(map, 'view', {
      value: {
        x: -999999,
        y: -999999,
        width: 1,
        height: 1,
        zoomLevel: 999
      },
      writable: true,
      configurable: true
    })

    map.setZoomLevel(3)

    const view = map.getView()

    expect(view.zoomLevel).toBe(3)
    expect(view.x).not.toBe(-999999)
    expect(view.y).not.toBe(-999999)
    expect(view.width).toBeGreaterThan(1)
    expect(view.height).toBeGreaterThan(1)

    expect(Reflect.get(map, 'zoomLevel')).toBe(999)
    expect(Reflect.get(map, 'centerX')).toBe(-999999)
  })

  it('exposes the SVG element through a read-only getter', () => {
    const map = new MapGrid()
    const originalElement = map.element

    const descriptor = Object.getOwnPropertyDescriptor(
      MapGrid.prototype,
      'element'
    )

    expect(descriptor?.get).toBeTypeOf('function')
    expect(descriptor?.set).toBeUndefined()

    expect(Object.hasOwn(map, 'element')).toBe(false)
    expect(map.element).toBe(originalElement)
    expect(map.element.namespaceURI).toBe(SVG_NAMESPACE)

    const replacement = createGraphic()

    expect(Reflect.set(map, 'element', replacement)).toBe(false)
    expect(map.element).toBe(originalElement)
  })
})