
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg, createSvg } from '../primitives/svg.ts'

let desertSerial = 0

export function createDesertFlat(): SVGSVGElement {
  desertSerial += 1

  const clipId = `desert-clip-${desertSerial}`
  const gradientId = `desert-gradient-${desertSerial}`

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
    'stop-color': '#f8db88',
  })

  appendSvg(gradient, 'stop', {
    offset: '55%',
    'stop-color': '#f4d17a',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#edc36d',
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

  // Broad, softly illuminated variations in the sand.
  const patches = [
    [0.25, 0.23, 0.30, 0.12],
    [0.76, 0.36, 0.32, 0.14],
    [0.30, 0.65, 0.34, 0.15],
    [0.73, 0.80, 0.28, 0.12],
  ]

  for (const [x, y, rx, ry] of patches) {
    appendSvg(artwork, 'ellipse', {
      cx: String(HEX_BOUNDS.width * x),
      cy: String(HEX_BOUNDS.height * y),
      rx: String(HEX_BOUNDS.width * rx),
      ry: String(HEX_BOUNDS.height * ry),
      fill: '#ffe8a0',
      opacity: '0.18',
    })
  }

  // Long diagonal ribbons shaped by prevailing winds.
  const ribbons = [
    [-0.10, 0.37, 0.78],
    [-0.05, 0.59, 0.82],
    [0.08, 0.81, 0.76],
    [0.34, 0.26, 0.70],
    [0.52, 0.48, 0.73],
    [0.64, 0.73, 0.65],
  ]

  for (const [x, y, length] of ribbons) {
    addSandRibbon(artwork, x, y, length)
  }

  // Fine grains follow several diagonal wind paths.
  const grainBands = [
    [-0.08, 0.34, 0.90],
    [-0.05, 0.52, 0.95],
    [0.06, 0.72, 0.88],
    [0.26, 0.22, 0.82],
    [0.38, 0.43, 0.85],
    [0.50, 0.65, 0.75],
  ]

  for (let band = 0; band < grainBands.length; band += 1) {
    const [startX, startY, length] = grainBands[band]

    for (let i = 0; i < 72; i += 1) {
      const progress = i / 71
      const scatter = noise(band * 113 + i * 17)
      const lateral = noise(band * 67 + i * 31)

      const x = startX + length * progress
      const y = startY - length * progress * 0.47
        + (scatter - 0.5) * 0.075

      addSandGrain(
        artwork,
        x + (lateral - 0.5) * 0.025,
        y,
        band * 100 + i,
      )
    }
  }

  // A few sparse grains away from the main wind trails.
  for (let i = 0; i < 85; i += 1) {
    const x = noise(i * 41 + 19)
    const y = noise(i * 73 + 37)

    addSandGrain(artwork, x, y, i + 1000, 0.35)
  }

  return svg
}

function addSandRibbon(
  parent: SVGElement,
  x: number,
  y: number,
  length: number,
): void {
  const w = HEX_BOUNDS.width
  const h = HEX_BOUNDS.height

  const x1 = x * w
  const y1 = y * h
  const x2 = (x + length) * w
  const y2 = (y - length * 0.47) * h

  appendSvg(parent, 'path', {
    d: [
      `M ${x1} ${y1}`,
      `Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 12}`,
      `${x2} ${y2}`,
    ].join(' '),
    fill: 'none',
    stroke: '#e5b965',
    'stroke-width': '17',
    'stroke-linecap': 'round',
    opacity: '0.11',
  })

  appendSvg(parent, 'path', {
    d: [
      `M ${x1} ${y1 - 5}`,
      `Q ${(x1 + x2) / 2} ${(y1 + y2) / 2 + 4}`,
      `${x2} ${y2 - 5}`,
    ].join(' '),
    fill: 'none',
    stroke: '#ffe9a1',
    'stroke-width': '9',
    'stroke-linecap': 'round',
    opacity: '0.20',
  })
}

function addSandGrain(
  parent: SVGElement,
  x: number,
  y: number,
  seed: number,
  opacity = 0.55,
): void {
  const px = x * HEX_BOUNDS.width
  const py = y * HEX_BOUNDS.height

  const radius = 0.55 + noise(seed * 29) * 0.8

  appendSvg(parent, 'ellipse', {
    cx: String(px),
    cy: String(py),
    rx: String(radius),
    ry: String(radius * 0.7),
    fill: seed % 3 === 0 ? '#b98753' : '#ce9f5b',
    opacity: String(opacity * (0.45 + noise(seed * 13) * 0.55)),
  })
}

function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}
