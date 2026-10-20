
import { createGrassFlat } from './grass.ts'
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let mountainsSerial = 0

export function createGrassMountains(): SVGSVGElement {
  mountainsSerial += 1

  const svg = createGrassFlat()
  const clipId = `grass-mountains-clip-${mountainsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Grass SVG is missing its definitions')
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

  // Soft ground shadow.
  appendSvg(artwork, 'ellipse', {
    cx: '0',
    cy: '51',
    rx: '94',
    ry: '17',
    fill: '#354b2c',
    opacity: '0.28',
  })

  // Rear mountain: smaller and slightly to the right.
  appendSvg(artwork, 'path', {
    d: 'M -14 39 L 17 -38 L 29 -47 L 41 -35 L 83 39 Q 39 57 -14 39 Z',
    fill: '#777087',
    stroke: '#47465b',
    'stroke-width': '2.5',
  })

  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 41 -35 L 83 39 L 42 48 L 36 7 L 28 -16 Z',
    fill: '#48475f',
  })

  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 41 -35 L 49 -21 L 38 -26 L 35 -16 L 27 -23 L 19 -13 L 17 -28 Z',
    fill: '#f0eee8',
  })

  appendSvg(artwork, 'path', {
    d: 'M 29 -47 L 35 -39 L 32 -28 L 27 -23 L 19 -13 L 17 -28 Z',
    fill: '#d5e0e5',
  })

  // Front mountain: broader, with an irregular rocky silhouette.
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
    fill: '#a38b88',
    stroke: '#4b4659',
    'stroke-width': '3',
  })

  // Sunlit western slope.
  appendSvg(artwork, 'path', {
    d: 'M -91 45 L -70 15 L -48 -17 L -31 -51 L -18 -62 L -25 -28 L -38 5 L -56 48 Z',
    fill: '#c6a69a',
  })

  // Dark eastern slope.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -4 -55 L 13 -29 L 32 8 L 52 46 L 10 58 L -2 24 L -12 -12 Z',
    fill: '#55546c',
  })

  // Intermediate rock face.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -12 -12 L -2 24 L -19 52 L -37 57 L -25 13 Z',
    fill: '#917c87',
  })

  // Snow cap with an uneven lower edge.
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
    fill: '#f3f1e9',
  })

  // Cool blue shadow in the snow.
  appendSvg(artwork, 'path', {
    d: 'M -18 -62 L -4 -55 L 9 -36 L -1 -39 L -8 -28 L -17 -37 L -23 -31 Z',
    fill: '#cbd9e2',
  })

  // Fine rock ridges.
  appendSvg(artwork, 'path', {
    d: 'M -34 -12 L -49 23 L -57 43 M -9 -15 L 3 19 L 10 44 M 28 -10 L 43 28',
    fill: 'none',
    stroke: '#423f55',
    'stroke-width': '2.2',
    opacity: '0.55',
  })

  // Small green foothills at the base.
  appendSvg(artwork, 'path', {
    d: 'M -91 45 Q -73 38 -61 48 Q -45 56 -29 52 Q -10 59 4 52 Q 25 45 52 46 L 42 57 Q -28 75 -91 45 Z',
    fill: '#55753d',
    opacity: '0.72',
  })

  return svg
}
