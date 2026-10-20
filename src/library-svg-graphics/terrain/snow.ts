
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg, createSvg } from '../primitives/svg.ts'

let snowSerial = 0

export function createSnowFlat(): SVGSVGElement {
  snowSerial += 1

  const clipId = `snow-clip-${snowSerial}`
  const groundId = `snow-ground-${snowSerial}`

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
    id: groundId,
    x1: '0',
    y1: '0',
    x2: '0.35',
    y2: '1',
  })

  for (const [offset, color] of [
    ['0%', '#f6fbff'],
    ['45%', '#e7f2fa'],
    ['100%', '#d5e5f3'],
  ]) {
    appendSvg(gradient, 'stop', {
      offset,
      'stop-color': color,
    })
  }

  const artwork = appendSvg(svg, 'g', {
    'clip-path': `url(#${clipId})`,
  })

  appendSvg(artwork, 'rect', {
    x: '0',
    y: '0',
    width: String(HEX_BOUNDS.width),
    height: String(HEX_BOUNDS.height),
    fill: `url(#${groundId})`,
  })

  const w = HEX_BOUNDS.width
  const h = HEX_BOUNDS.height
  const scale = w / 260

  // Broad, overlapping drifts of wind-packed snow.
  const drifts = [
    [0.22, 0.20, 0.30, 0.11, -12],
    [0.74, 0.27, 0.34, 0.13, 15],
    [0.34, 0.44, 0.37, 0.14, -18],
    [0.82, 0.56, 0.30, 0.12, 12],
    [0.25, 0.70, 0.33, 0.14, 17],
    [0.68, 0.83, 0.36, 0.13, -15],
  ]

  drifts.forEach(([x, y, rx, ry, rotation], index) => {
    const cx = w * x
    const cy = h * y

    appendSvg(artwork, 'ellipse', {
      cx: String(cx),
      cy: String(cy),
      rx: String(w * rx),
      ry: String(h * ry),
      transform: `rotate(${rotation} ${cx} ${cy})`,
      fill: index % 2 === 0 ? '#ffffff' : '#b8d2e9',
      opacity: index % 2 === 0 ? '0.34' : '0.20',
    })
  })

  // Sweeping wind-carved contours with blue shadow edges.
  const contours = [
    [0.02, 0.22, 0.34, 0.12, 0.62, 0.20],
    [0.39, 0.15, 0.67, 0.10, 0.98, 0.19],
    [0.02, 0.46, 0.31, 0.34, 0.58, 0.43],
    [0.45, 0.38, 0.72, 0.30, 1.01, 0.39],
    [-0.02, 0.69, 0.27, 0.57, 0.53, 0.67],
    [0.37, 0.78, 0.68, 0.66, 1.01, 0.76],
    [0.12, 0.92, 0.40, 0.83, 0.70, 0.89],
  ]

  for (const [x1, y1, cx, cy, x2, y2] of contours) {
    const path = [
      `M ${w * x1} ${h * y1}`,
      `Q ${w * cx} ${h * cy}`,
      `${w * x2} ${h * y2}`,
    ].join(' ')

    appendSvg(artwork, 'path', {
      d: path,
      fill: 'none',
      stroke: '#a9c6df',
      'stroke-width': String(8 * scale),
      'stroke-linecap': 'round',
      opacity: '0.16',
    })

    appendSvg(artwork, 'path', {
      d: path,
      transform: `translate(0 ${-3.5 * scale})`,
      fill: 'none',
      stroke: '#ffffff',
      'stroke-width': String(3.5 * scale),
      'stroke-linecap': 'round',
      opacity: '0.55',
    })
  }

  // Shallow, branching fractures in older compacted snow.
  for (let i = 0; i < 34; i += 1) {
    const x = noise(i * 37 + 11) * w
    const y = noise(i * 53 + 23) * h
    const length = (5 + noise(i * 19 + 5) * 15) * scale

    const angle = -0.35 + noise(i * 31 + 17) * 0.7

    const midX = x + Math.cos(angle) * length * 0.52
    const midY = y + Math.sin(angle) * length * 0.52
    const endX = x + Math.cos(angle + 0.20) * length
    const endY = y + Math.sin(angle + 0.20) * length

    appendSvg(artwork, 'path', {
      d: [
        `M ${x} ${y}`,
        `L ${midX} ${midY}`,
        `L ${endX} ${endY}`,
      ].join(' '),
      fill: 'none',
      stroke: '#8fb3d0',
      'stroke-width': String(0.8 * scale),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      opacity: '0.28',
    })

    if (i % 4 === 0) {
      appendSvg(artwork, 'path', {
        d: [
          `M ${midX} ${midY}`,
          `l ${length * 0.18} ${length * 0.24}`,
        ].join(' '),
        fill: 'none',
        stroke: '#9bbbd4',
        'stroke-width': String(0.65 * scale),
        opacity: '0.24',
      })
    }
  }

  // Hundreds of tiny crystalline snow grains.
  // Their deterministic positions keep every tile consistent.
  for (let i = 0; i < 460; i += 1) {
    const x = noise(i * 41 + 19) * w
    const y = noise(i * 73 + 37) * h
    const radius = (0.35 + noise(i * 29 + 7) * 0.85) * scale

    appendSvg(artwork, 'ellipse', {
      cx: String(x),
      cy: String(y),
      rx: String(radius),
      ry: String(radius * 0.58),
      fill: i % 4 === 0 ? '#8eb6d7' : '#ffffff',
      opacity: i % 4 === 0 ? '0.26' : '0.65',
    })
  }

  // Sparse, angular ice crystals catching the light.
  for (let i = 0; i < 58; i += 1) {
    const x = noise(i * 23 + 71) * w
    const y = noise(i * 47 + 13) * h
    const size = (1.1 + noise(i * 17 + 3) * 2.1) * scale

    appendSvg(artwork, 'path', {
      d: [
        `M ${x} ${y - size}`,
        `L ${x + size * 0.75} ${y}`,
        `L ${x} ${y + size * 0.55}`,
        `L ${x - size * 0.75} ${y}`,
        'Z',
      ].join(' '),
      fill: i % 3 === 0 ? '#b2d0e6' : '#ffffff',
      opacity: '0.50',
    })
  }

  return svg
}

function noise(seed: number): number {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return value - Math.floor(value)
}
