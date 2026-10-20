
import { createSvg } from '../primitives/svg.ts'

export type MapCanvasBounds = {
  x: number
  y: number
  width: number
  height: number
}

export function createMapCanvas(
  bounds: MapCanvasBounds,
): SVGSVGElement {
  return createSvg('svg', {
    class: 'map-area__grid',
    viewBox: `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`,
    preserveAspectRatio: 'xMidYMid meet',
    role: 'img',
    'aria-label': 'Hexagonal world map',
  })
}
