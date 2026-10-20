
import { HexGrid } from 'midgard-hex-grid'
import {
  ZOOM_LEVELS,
  type MapFrame,
  type MapView,
  type MapViewport,
  type ZoomLevel,
} from '../map/map-grid.ts'
import {
  HEX_WORLD_WIDTH,
} from '../../library-svg-graphics/definitions/hex.ts'
import { createSvg } from '../../library-svg-graphics/primitives/svg.ts'
import { createMinimapCanvas } from '../../library-svg-graphics/map/minimap-canvas.ts'
import { createMinimapBackground } from '../../library-svg-graphics/map/minimap-background.ts'
import { createMinimapHexagonPolygon } from '../../library-svg-graphics/map/minimap-hexagon-polygon.ts'
import { createMinimapViewport } from '../../library-svg-graphics/map/minimap-viewport.ts'

const SKELETON_WIDTH = 42
const SKELETON_HEIGHT = 13

export class Minimap {
  readonly element: HTMLElement

  private readonly svg: SVGSVGElement
  private readonly viewport: SVGRectElement
  private readonly zoomButtons = new Map<ZoomLevel, HTMLButtonElement>()

  private zoomListener: ((level: ZoomLevel) => void) | undefined
  private centerListener: ((x: number, y: number) => void) | undefined

  constructor(world: MapFrame) {
    const section = document.createElement('section')
    section.className = 'minimap'
    section.setAttribute('aria-label', 'Minimap')

    section.style.setProperty(
      '--world-aspect',
      String(world.width / world.height),
    )

    const heading = document.createElement('div')
    heading.className = 'minimap__heading'

    const title = document.createElement('h2')
    title.className = 'minimap__title'
    title.textContent = 'Minimap'

    const north = document.createElement('span')
    north.className = 'minimap__north'
    north.textContent = 'N'

    heading.append(title, north)

    const zoom = document.createElement('div')
    zoom.className = 'minimap__zoom'

    const zoomLabel = document.createElement('div')
    zoomLabel.className = 'minimap__zoom-label'
    zoomLabel.textContent = 'Zoom'

    const levels = document.createElement('div')
    levels.className = 'minimap__zoom-levels'
    levels.setAttribute('role', 'group')
    levels.setAttribute('aria-label', 'Zoom level')

    for (const level of ZOOM_LEVELS) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'zoom-button'
      button.textContent = String(level)
      button.setAttribute('aria-label', `Zoom ${level}`)
      button.setAttribute('aria-pressed', level === 1 ? 'true' : 'false')

      if (level === 1) {
        button.classList.add('is-selected')
      }

      button.addEventListener('click', () => {
        this.zoomListener?.(level)
      })

      this.zoomButtons.set(level, button)
      levels.append(button)
    }

    zoom.append(zoomLabel, levels)

    const frame = document.createElement('div')
    frame.className = 'minimap__frame'

    this.svg = createMinimapCanvas(world)
    this.svg.classList.add('minimap__grid')

    this.svg.appendChild(createMinimapBackground(world))

    // Use the same Midgard geometry as the main world map.
    const grid = new HexGrid('x-dominated')

    const hexagons = grid.createGrid({
      hexDiameter: HEX_WORLD_WIDTH,
      skeletonWidth: SKELETON_WIDTH,
      skeletonHeight: SKELETON_HEIGHT,
    })

    const hexGroup = createSvg('g')
    hexGroup.classList.add('minimap__hexagons')
    this.svg.appendChild(hexGroup)

    for (const hexagon of hexagons) {
      hexGroup.appendChild(createMinimapHexagonPolygon(
        hexagon.points
          .map(point => `${point.x},${point.y}`)
          .join(' '),
        '#15536f',
        '#3d8eab',
      ))
    }

    // The viewport must be drawn above the hexagons.
    this.viewport = createMinimapViewport(world)
    this.viewport.classList.add('minimap__viewport')
    this.svg.appendChild(this.viewport)

    this.svg.addEventListener('click', (event) => {
      const point = clientToSvg(
        this.svg,
        event.clientX,
        event.clientY,
      )

      if (!point) return

      this.centerListener?.(point.x, point.y)
    })

    frame.append(this.svg)
    section.append(heading, zoom, frame)

    this.element = section
  }

  connect(map: MapViewport): void {
    this.zoomListener = (level) => {
      map.setZoomLevel(level)
    }

    this.centerListener = (x, y) => {
      map.centerOn(x, y)
    }

    map.onViewChange((view) => {
      this.showView(view)
    })

    this.showView(map.getView())
  }

  private showView(view: MapView): void {
    this.viewport.setAttribute('x', String(view.x))
    this.viewport.setAttribute('y', String(view.y))
    this.viewport.setAttribute('width', String(view.width))
    this.viewport.setAttribute('height', String(view.height))

    for (const [level, button] of this.zoomButtons) {
      const selected = level === view.zoomLevel

      button.classList.toggle('is-selected', selected)
      button.setAttribute(
        'aria-pressed',
        selected ? 'true' : 'false',
      )
    }
  }
}

function clientToSvg(
  svg: SVGSVGElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } | null {
  const matrix = svg.getScreenCTM()

  if (!matrix) return null

  const point = svg.createSVGPoint()
  point.x = clientX
  point.y = clientY

  const world = point.matrixTransform(matrix.inverse())

  return {
    x: world.x,
    y: world.y,
  }
}
