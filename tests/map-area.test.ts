import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MapArea } from '../src/application/editor/map-area.ts'
import { MapGrid } from '../src/application/map/map-grid.ts'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

describe('MapArea — existing behavior', () => {
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

  it('creates a div as its root element', () => {
    const mapArea = new MapArea()

    expect(mapArea.element).toBeInstanceOf(HTMLDivElement)
    expect(mapArea.element.tagName.toLowerCase()).toBe('div')
  })

  it('uses the expected CSS class', () => {
    const mapArea = new MapArea()

    expect(mapArea.element.className).toBe(
      'editor-layout__map-area'
    )
  })

  it('creates a MapGrid instance', () => {
    const mapArea = new MapArea()

    expect(mapArea.mapGrid).toBeInstanceOf(MapGrid)
  })

  it('mounts the MapGrid SVG inside the root element', () => {
    const mapArea = new MapArea()

    expect(mapArea.element.children).toHaveLength(1)
    expect(mapArea.element.firstElementChild).toBe(
      mapArea.mapGrid.element
    )
  })

  it('preserves the expected SVG structure', () => {
    const mapArea = new MapArea()
    const svg = mapArea.element.querySelector('svg')

    expect(svg).toBe(mapArea.mapGrid.element)
    expect(svg?.namespaceURI).toBe(SVG_NAMESPACE)
    expect(svg?.classList.contains('map-area__grid')).toBe(true)
  })

  it('creates a populated hexagonal world map', () => {
    const mapArea = new MapArea()
    const coordinates = mapArea.mapGrid.getCoordinates()

    expect(coordinates.length).toBeGreaterThan(0)

    expect(
      mapArea.element.querySelectorAll('polygon')
    ).toHaveLength(coordinates.length)
  })

  it('exposes the same MapGrid instance on repeated access', () => {
    const mapArea = new MapArea()

    const first = mapArea.mapGrid
    const second = mapArea.mapGrid

    expect(first).toBe(second)
  })

  it('exposes the same root element on repeated access', () => {
    const mapArea = new MapArea()

    const first = mapArea.element
    const second = mapArea.element

    expect(first).toBe(second)
  })

  it('creates independent DOM elements for separate instances', () => {
    const first = new MapArea()
    const second = new MapArea()

    expect(first.element).not.toBe(second.element)
    expect(first.mapGrid.element).not.toBe(second.mapGrid.element)
  })

  it('creates independent MapGrid instances', () => {
    const first = new MapArea()
    const second = new MapArea()

    expect(first.mapGrid).not.toBe(second.mapGrid)
    expect(first.mapGrid.getView().zoomLevel).toBe(1)
    expect(second.mapGrid.getView().zoomLevel).toBe(1)
  })

  it('keeps zoom state independent between instances', () => {
    const first = new MapArea()
    const second = new MapArea()

    first.mapGrid.setZoomLevel(3)

    expect(first.mapGrid.getView().zoomLevel).toBe(3)
    expect(second.mapGrid.getView().zoomLevel).toBe(1)
  })

  it('allows the public MapGrid reference to control the map', () => {
    const mapArea = new MapArea()

    mapArea.mapGrid.setZoomLevel(5)

    expect(mapArea.mapGrid.getView().zoomLevel).toBe(5)
    expect(mapArea.mapGrid.element).toBe(
      mapArea.element.firstElementChild
    )
  })

  it('does not expose private fields as ordinary properties', () => {
    const mapArea = new MapArea()

    for (const name of ['element', 'mapGrid']) {
      expect(Object.hasOwn(mapArea, name)).toBe(false)
    }

    expect(Reflect.get(mapArea, '#element')).toBeUndefined()
    expect(Reflect.get(mapArea, '#mapGrid')).toBeUndefined()
  })

  it('exposes public references through read-only getters', () => {
    const mapArea = new MapArea()

    for (const name of ['element', 'mapGrid']) {
      const descriptor = Object.getOwnPropertyDescriptor(
        MapArea.prototype,
        name
      )

      expect(descriptor?.get).toBeTypeOf('function')
      expect(descriptor?.set).toBeUndefined()
    }

    const originalElement = mapArea.element
    const originalMapGrid = mapArea.mapGrid

    expect(Reflect.set(mapArea, 'element', document.createElement('div')))
      .toBe(false)

    expect(Reflect.set(mapArea, 'mapGrid', new MapGrid()))
      .toBe(false)

    expect(mapArea.element).toBe(originalElement)
    expect(mapArea.mapGrid).toBe(originalMapGrid)
  })

  it('protects private references against similarly named properties', () => {
    const mapArea = new MapArea()
    const originalElement = mapArea.element
    const originalMapGrid = mapArea.mapGrid

    Object.defineProperty(mapArea, '#element', {
      value: document.createElement('div'),
      configurable: true
    })

    Object.defineProperty(mapArea, '#mapGrid', {
      value: new MapGrid(),
      configurable: true
    })

    expect(mapArea.element).toBe(originalElement)
    expect(mapArea.mapGrid).toBe(originalMapGrid)
    expect(mapArea.element.firstElementChild).toBe(
      originalMapGrid.element
    )
  })
})