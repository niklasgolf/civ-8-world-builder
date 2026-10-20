
import { createSvg } from '../primitives/svg.ts'

export type MinimapViewportBounds = {
  x: number
  y: number
  width: number
  height: number
}

export function createMinimapViewport(
  bounds: MinimapViewportBounds,
): SVGRectElement {
  return createSvg('rect', {
    class: 'minimap__viewport',
    x: String(bounds.x),
    y: String(bounds.y),
    width: String(bounds.width),
    height: String(bounds.height),
    fill: 'rgba(226, 194, 122, 0.12)',
    stroke: '#e2c27a',
    'stroke-width': '2',
    'vector-effect': 'non-scaling-stroke',
  })
}
