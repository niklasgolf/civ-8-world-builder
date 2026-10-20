
import { createSnowFlat } from './snow.ts'
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let mountainsSerial = 0

export function createSnowMountains(): SVGSVGElement {
  mountainsSerial += 1

  const svg = createSnowFlat()
  const clipId = `snow-mountains-clip-${mountainsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Snow SVG is missing its definitions')
  }

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  appendSvg(clipPath, 'polygon', {
    points: HEX_POINTS.map(
      (point) => `${point.x},${point.y}`,
    ).join(' '),
  })

  const mountains = appendSvg(svg, 'g', {
    'clip-path': `url(#${clipId})`,
  })

  const scale = HEX_BOUNDS.width / 260
  const centerX = HEX_BOUNDS.width * 0.5
  const centerY = HEX_BOUNDS.height * 0.54

  const artwork = appendSvg(mountains, 'g', {
    transform: `translate(${centerX} ${centerY}) scale(${scale})`,
    'stroke-linejoin': 'round',
    'stroke-linecap': 'round',
  })

  // Soft blue shadow beneath the mountain range.
  appendSvg(artwork, 'ellipse', {
    cx: '0',
    cy: '51',
    rx: '94',
    ry: '17',
    fill: '#6389b2',
    opacity: '0.30',
  })

  // Rear mountain: preserve the established silhouette.
  appendSvg(artwork, 'path', {
    d: 'M -14 39 L 17 -38 L 29 -47 L 41 -35 L 83 39 Q 39 57 -14 39 Z',
    fill: '#b2c7d9',
    stroke: '#718ca8',
    'stroke-width': '2.5',
  })

  // Deep blue eastern face.
  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 41 -35 L 83 39 L 42 48 L 36 7 L 28 -16 Z',
    fill: '#607d9f',
  })

  // Snow covering the rear summit.
  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 41 -35 L 49 -21 L 38 -26 L 35 -16 L 27 -23 L 19 -13 L 17 -28 Z',
    fill: '#ffffff',
  })

  // Pale blue shadow within the rear snowcap.
  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 35 -39 L 32 -28 L 27 -23 L 19 -13 L 17 -28 Z',
    fill: '#d4e8f7',
  })

  // Snow flowing down the rear western slope.
  appendSvg(artwork, 'path', {
    d: 'M 17 -28 L 19 -13 L 10 5 L 0 30 L 17 23 L 27 -4 L 29 -27 Z',
    fill: '#e7f4fc',
    opacity: '0.88',
  })

  // Front mountain: same established geometry.
  appendSvg(artwork, 'path', {
    d: [
      'M -91 45',
      'L -70 15',
      'L -48 -17',
      'L -31 -51',
      'L -18 -62',
      'L -4 -55',
      'L 13 -29',
      'L 32 8',
      'L 52 46',
      'Q 3 65 -48 58',
      'Z',
    ].join(' '),
    fill: '#afc5d8',
    stroke: '#6f8da9',
    'stroke-width': '3',
  })

  // Bright western face with extensive snow coverage.
  appendSvg(artwork, 'path', {
    d: 'M -91 45 L -70 15 L -48 -17 L -31 -51 L -18 -62 L -25 -28 L -38 5 L -56 48 Z',
    fill: '#e2f1fb',
  })

  // Eastern face: stronger blue-grey shadows.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -4 -55 L 13 -29 L 32 8 L 52 46 L 10 58 L -2 24 L -12 -12 Z',
    fill: '#58789b',
  })

  // Intermediate face: icy blue with a hint of stone.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -12 -12 L -2 24 L -19 52 L -37 57 L -25 13 Z',
    fill: '#91abc5',
  })

  // Broad, irregular snowcap on the front peak.
  appendSvg(artwork, 'path', {
    d: [
      'M -48 -17',
      'L -31 -51',
      'L -18 -62',
      'L -4 -55',
      'L 9 -36',
      'L -1 -39',
      'L -8 -28',
      'L -17 -37',
      'L -26 -23',
      'L -34 -31',
      'L -42 -13',
      'Z',
    ].join(' '),
    fill: '#ffffff',
  })

  // Icy shadow across the snowcap.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -4 -55 L 9 -36 L -1 -39 L -8 -28 L -17 -37 L -23 -31 Z',
    fill: '#c2def2',
  })

  // Snow tongues descending between exposed rock ridges.
  appendSvg(artwork, 'path', {
    d: 'M -34 -31 L -26 -23 L -34 5 L -49 35 L -59 47 L -47 17 Z',
    fill: '#f4faff',
    opacity: '0.90',
  })

  appendSvg(artwork, 'path', {
    d: 'M -8 -28 L -1 -39 L 9 -19 L 20 9 L 27 32 L 12 18 Z',
    fill: '#d7eaf8',
    opacity: '0.85',
  })

  // Fine exposed rock fractures.
  appendSvg(artwork, 'path', {
    d: 'M -34 -12 L -49 23 L -57 43 M -9 -15 L 3 19 L 10 44 M 28 -10 L 43 28',
    fill: 'none',
    stroke: '#506d8b',
    'stroke-width': '2',
    opacity: '0.45',
  })

  // Snow-covered foothills blend the peaks into the flat tile.
  appendSvg(artwork, 'path', {
    d: 'M -91 45 Q -73 38 -61 48 Q -45 56 -29 52 Q -10 59 4 52 Q 25 45 52 46 L 42 57 Q -28 75 -91 45 Z',
    fill: '#d8eaf7',
    opacity: '0.94',
  })

  // Bright snow resting on the lower slopes.
  appendSvg(artwork, 'path', {
    d: 'M -84 47 Q -64 42 -48 52 Q -23 61 -3 54 Q 20 48 43 51',
    fill: 'none',
    stroke: '#ffffff',
    'stroke-width': '4',
    opacity: '0.75',
  })

  return svg
}
