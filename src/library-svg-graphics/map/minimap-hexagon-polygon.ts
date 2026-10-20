
import { createSvg } from '../primitives/svg.ts'

export function createMinimapHexagonPolygon(
  points: string,
  fill: string,
  stroke: string,
): SVGPolygonElement {
  return createSvg('polygon', {
    points,
    fill,
    stroke,
    'stroke-width': '1.5',
  })
}
