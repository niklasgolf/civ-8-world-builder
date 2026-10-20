
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg, createSvg } from '../primitives/svg.ts'

let plainsSerial = 0

export function createPlainsFlat(): SVGSVGElement {
  plainsSerial += 1

  const clipId = `plains-clip-${plainsSerial}`
  const gradientId = `plains-gradient-${plainsSerial}`

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
    'stop-color': '#b9b748',
  })

  appendSvg(gradient, 'stop', {
    offset: '52%',
    'stop-color': '#b2b03e',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#a4a337',
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

  // Broad, very subtle variations in the dry ground.
  const patches = [
    [0.26, 0.23, 0.26, 0.11],
    [0.75, 0.37, 0.28, 0.13],
    [0.35, 0.68, 0.30, 0.15],
    [0.78, 0.81, 0.22, 0.12],
  ]

  for (const [x, y, rx, ry] of patches) {
    appendSvg(artwork, 'ellipse', {
      cx: String(HEX_BOUNDS.width * x),
      cy: String(HEX_BOUNDS.height * y),
      rx: String(HEX_BOUNDS.width * rx),
      ry: String(HEX_BOUNDS.height * ry),
      fill: '#d4ca61',
      opacity: '0.12',
    })
  }

  // Short, scattered dry-grass markings.
  const tufts = [
    [0.35, 0.13], [0.53, 0.17], [0.68, 0.23],
    [0.22, 0.29], [0.43, 0.32], [0.77, 0.36],
    [0.16, 0.45], [0.35, 0.47], [0.57, 0.43],
    [0.83, 0.49], [0.25, 0.58], [0.48, 0.61],
    [0.72, 0.59], [0.18, 0.69], [0.38, 0.73],
    [0.63, 0.72], [0.79, 0.68], [0.31, 0.83],
    [0.51, 0.87], [0.66, 0.82],
  ]

  for (const [x, y] of tufts) {
    addDryGrass(artwork, x, y)
  }

  // Thin, irregular horizontal traces of dry vegetation.
  const traces = [
    [0.27, 0.22, 0.13],
    [0.57, 0.29, 0.10],
    [0.34, 0.40, 0.12],
    [0.66, 0.53, 0.14],
    [0.25, 0.64, 0.10],
    [0.49, 0.78, 0.13],
  ]

  for (const [x, y, width] of traces) {
    addGroundTrace(artwork, x, y, width)
  }

  return svg
}

function addDryGrass(
  parent: SVGElement,
  x: number,
  y: number,
): void {
  const px = HEX_BOUNDS.width * x
  const py = HEX_BOUNDS.height * y

  appendSvg(parent, 'path', {
    d: [
      `M ${px - 5} ${py}`,
      `Q ${px - 7} ${py - 4} ${px - 8} ${py - 3}`,
      `M ${px} ${py}`,
      `Q ${px - 1} ${py - 6} ${px + 1} ${py - 7}`,
      `M ${px + 4} ${py}`,
      `Q ${px + 6} ${py - 4} ${px + 8} ${py - 3}`,
    ].join(' '),
    fill: 'none',
    stroke: '#777b30',
    'stroke-width': '1.5',
    'stroke-linecap': 'round',
    opacity: '0.34',
  })
}

function addGroundTrace(
  parent: SVGElement,
  x: number,
  y: number,
  width: number,
): void {
  const px = HEX_BOUNDS.width * x
  const py = HEX_BOUNDS.height * y
  const w = HEX_BOUNDS.width * width

  appendSvg(parent, 'path', {
    d: [
      `M ${px} ${py}`,
      `Q ${px + w * 0.25} ${py - 3}`,
      `${px + w * 0.5} ${py}`,
      `Q ${px + w * 0.75} ${py + 2}`,
      `${px + w} ${py - 1}`,
    ].join(' '),
    fill: 'none',
    stroke: '#777b30',
    'stroke-width': '1.7',
    'stroke-linecap': 'round',
    opacity: '0.20',
  })
}
