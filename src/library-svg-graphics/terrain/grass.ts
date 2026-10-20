
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg, createSvg } from '../primitives/svg.ts'

let grassSerial = 0

export function createGrassFlat(): SVGSVGElement {
  grassSerial += 1

  const clipId = `grass-clip-${grassSerial}`
  const gradientId = `grass-gradient-${grassSerial}`

  const svg = createSvg('svg', {
    viewBox: `0 0 ${HEX_BOUNDS.width} ${HEX_BOUNDS.height}`,
    preserveAspectRatio: 'none',
    'aria-hidden': 'true',
  })

  const defs = appendSvg(svg, 'defs')

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  appendSvg(clipPath, 'polygon', {
    points: HEX_POINTS.map(
      (point) => `${point.x},${point.y}`,
    ).join(' '),
  })

  const gradient = appendSvg(defs, 'linearGradient', {
    id: gradientId,
    x1: '0',
    y1: '0',
    x2: '0',
    y2: '1',
  })

  appendSvg(gradient, 'stop', {
    offset: '0%',
    'stop-color': '#82964a',
  })

  appendSvg(gradient, 'stop', {
    offset: '55%',
    'stop-color': '#788d42',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#687f39',
  })

  const artwork = appendSvg(svg, 'g', {
    'clip-path': `url(#${clipId})`,
  })

  appendSvg(artwork, 'rect', {
    x: '0',
    y: '0',
    width: String(HEX_BOUNDS.width),
    height: String(HEX_BOUNDS.height),
    fill: `url(#${gradientId})`,
  })

  const patches = [
    [0.24, 0.25, 0.22, 0.12],
    [0.75, 0.34, 0.26, 0.15],
    [0.38, 0.72, 0.29, 0.17],
    [0.82, 0.79, 0.19, 0.11],
  ]

  for (const [x, y, rx, ry] of patches) {
    appendSvg(artwork, 'ellipse', {
      cx: String(HEX_BOUNDS.width * x),
      cy: String(HEX_BOUNDS.height * y),
      rx: String(HEX_BOUNDS.width * rx),
      ry: String(HEX_BOUNDS.height * ry),
      fill: '#a1a95b',
      opacity: '0.11',
    })
  }

  const tufts = [
    [0.25, 0.26, 0.9],
    [0.59, 0.22, 0.7],
    [0.76, 0.38, 1.0],
    [0.19, 0.49, 0.8],
    [0.45, 0.53, 0.9],
    [0.72, 0.64, 0.75],
    [0.32, 0.76, 1.0],
    [0.56, 0.84, 0.7],
  ]

  for (const [x, y, scale] of tufts) {
    addGrassTuft(artwork, x, y, scale)
  }

  return svg
}

function addGrassTuft(
  parent: SVGElement,
  x: number,
  y: number,
  scale: number,
): void {
  const px = HEX_BOUNDS.width * x
  const py = HEX_BOUNDS.height * y

  appendSvg(parent, 'path', {
    d: [
      `M ${px - 9 * scale} ${py}`,
      `Q ${px - 8 * scale} ${py - 6 * scale} ${px - 12 * scale} ${py - 8 * scale}`,
      `M ${px - 4 * scale} ${py}`,
      `Q ${px - 5 * scale} ${py - 10 * scale} ${px - 2 * scale} ${py - 13 * scale}`,
      `M ${px} ${py}`,
      `Q ${px + 2 * scale} ${py - 9 * scale} ${px + 7 * scale} ${py - 10 * scale}`,
      `M ${px + 5 * scale} ${py}`,
      `Q ${px + 9 * scale} ${py - 5 * scale} ${px + 12 * scale} ${py - 4 * scale}`,
    ].join(' '),
    fill: 'none',
    stroke: '#405e2d',
    'stroke-width': String(1.8 * scale),
    'stroke-linecap': 'round',
    opacity: '0.35',
  })
}
