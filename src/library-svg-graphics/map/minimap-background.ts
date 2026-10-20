
import { createSvg } from '../primitives/svg.ts'

export type MinimapBackgroundBounds = {
  x: number
  y: number
  width: number
  height: number
}

export function createMinimapBackground(
  bounds: MinimapBackgroundBounds,
): SVGRectElement {
  return createSvg('rect', {
    x: String(bounds.x),
    y: String(bounds.y),
    width: String(bounds.width),
    height: String(bounds.height),
    fill: '#0e4664',
  })
}
