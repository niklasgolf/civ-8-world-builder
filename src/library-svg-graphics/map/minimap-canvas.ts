
import { createSvg } from '../primitives/svg.ts'

export type MinimapCanvasBounds = {
  x: number
  y: number
  width: number
  height: number
}

export function createMinimapCanvas(
  bounds: MinimapCanvasBounds,
): SVGSVGElement {
  return createSvg('svg', {
    class: 'minimap__grid',
    viewBox: `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`,
    preserveAspectRatio: 'xMidYMid meet',
    'aria-label': 'World minimap',
  })
}
