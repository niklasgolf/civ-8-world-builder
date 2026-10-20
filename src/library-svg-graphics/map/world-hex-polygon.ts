
import { createSvg } from '../primitives/svg.ts'

export type WorldHexPoint = {
  x: number
  y: number
}

export type WorldHexPolygonOptions = {
  x: number
  y: number
  points: readonly WorldHexPoint[]
  fill: string
  stroke: string
}

export function createWorldHexPolygon(
  options: WorldHexPolygonOptions,
): SVGPolygonElement {
  const { x, y, points, fill, stroke } = options

  return createSvg('polygon', {
    id: `hex-${x}-${y}`,
    'data-x': String(x),
    'data-y': String(y),
    points: points
      .map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`)
      .join(' '),
    fill,
    stroke,
    'stroke-width': '1',
    'stroke-linejoin': 'round',
    'vector-effect': 'non-scaling-stroke',
  })
}
