
import { HEX_BOUNDS, HEX_POINTS } from '../definitions/hex.ts'
import { appendSvg, createSvg } from '../primitives/svg.ts'

let tundraSerial = 0

export function createTundraFlat(): SVGSVGElement {
  tundraSerial += 1

  const clipId = `tundra-clip-${tundraSerial}`
  const groundId = `tundra-ground-${tundraSerial}`

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
    ['0%', '#a8a38c'],
    ['48%', '#92907c'],
    ['100%', '#797c70'],
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

  const scale = HEX_BOUNDS.width / 260

  // Broad, softly shaded formations of exposed stone.
  const formations = [
    [0.20, 0.23, 0.27, 0.12, -12],
    [0.70, 0.20, 0.32, 0.15, 16],
    [0.41, 0.43, 0.34, 0.16, -18],
    [0.84, 0.55, 0.27, 0.13, 12],
    [0.23, 0.73, 0.32, 0.16, 20],
    [0.66, 0.83, 0.35, 0.15, -13],
  ]

  formations.forEach(([x, y, rx, ry, rotation], index) => {
    const cx = HEX_BOUNDS.width * x
    const cy = HEX_BOUNDS.height * y

    appendSvg(artwork, 'ellipse', {
      cx: String(cx),
      cy: String(cy),
      rx: String(HEX_BOUNDS.width * rx),
      ry: String(HEX_BOUNDS.height * ry),
      transform: `rotate(${rotation} ${cx} ${cy})`,
      fill: index % 2 === 0 ? '#c3b9a0' : '#686f68',
      opacity: index % 2 === 0 ? '0.22' : '0.16',
    })
  })

  // Long, irregular ridges give the stone a weathered appearance.
  const ridges = [
    [0.05, 0.22, 0.35, 0.15, 0.59, 0.21],
    [0.39, 0.16, 0.62, 0.12, 0.91, 0.20],
    [0.08, 0.47, 0.33, 0.35, 0.55, 0.43],
    [0.47, 0.39, 0.72, 0.30, 0.98, 0.37],
    [0.02, 0.70, 0.26, 0.57, 0.49, 0.66],
    [0.39, 0.77, 0.67, 0.66, 0.96, 0.75],
    [0.14, 0.92, 0.40, 0.83, 0.65, 0.89],
  ]

  for (const [x1, y1, cx, cy, x2, y2] of ridges) {
    const startX = HEX_BOUNDS.width * x1
    const startY = HEX_BOUNDS.height * y1
    const controlX = HEX_BOUNDS.width * cx
    const controlY = HEX_BOUNDS.height * cy
    const endX = HEX_BOUNDS.width * x2
    const endY = HEX_BOUNDS.height * y2

    const path = [
      `M ${startX} ${startY}`,
      `Q ${controlX} ${controlY}`,
      `${endX} ${endY}`,
    ].join(' ')

    appendSvg(artwork, 'path', {
      d: path,
      fill: 'none',
      stroke: '#555b55',
      'stroke-width': String(4.2 * scale),
      opacity: '0.17',
      'stroke-linecap': 'round',
    })

    appendSvg(artwork, 'path', {
      d: path,
      transform: `translate(0 ${-2.3 * scale})`,
      fill: 'none',
      stroke: '#d2c9b0',
      'stroke-width': String(2.1 * scale),
      opacity: '0.26',
      'stroke-linecap': 'round',
    })
  }

  // Branching cracks in the exposed rock.
  for (let i = 0; i < 46; i += 1) {
    const x = pseudoRandom(i * 37 + 11) * HEX_BOUNDS.width
    const y = pseudoRandom(i * 53 + 23) * HEX_BOUNDS.height
    const length = (6 + pseudoRandom(i * 19 + 5) * 19) * scale

    const angle = -0.45 + pseudoRandom(i * 31 + 17) * 0.9

    const midX = x + Math.cos(angle) * length * 0.48
    const midY = y + Math.sin(angle) * length * 0.48
    const endX = x + Math.cos(angle + 0.22) * length
    const endY = y + Math.sin(angle + 0.22) * length

    appendSvg(artwork, 'path', {
      d: [
        `M ${x} ${y}`,
        `L ${midX} ${midY}`,
        `L ${endX} ${endY}`,
      ].join(' '),
      fill: 'none',
      stroke: '#4c514b',
      'stroke-width': String((0.7 + (i % 3) * 0.22) * scale),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      opacity: '0.35',
    })

    if (i % 3 === 0) {
      appendSvg(artwork, 'path', {
        d: [
          `M ${midX} ${midY}`,
          `l ${length * 0.19} ${length * 0.26}`,
        ].join(' '),
        fill: 'none',
        stroke: '#555a52',
        'stroke-width': String(0.7 * scale),
        opacity: '0.29',
      })
    }
  }

  // Small angular fragments of broken rock.
  for (let i = 0; i < 105; i += 1) {
    const x = pseudoRandom(i * 13 + 7) * HEX_BOUNDS.width
    const y = pseudoRandom(i * 29 + 17) * HEX_BOUNDS.height
    const size = (0.8 + pseudoRandom(i * 41 + 3) * 2.6) * scale

    appendSvg(artwork, 'path', {
      d: [
        `M ${x - size} ${y}`,
        `L ${x + size * 0.3} ${y - size * 0.55}`,
        `L ${x + size} ${y + size * 0.25}`,
        `L ${x - size * 0.25} ${y + size * 0.5}`,
        'Z',
      ].join(' '),
      fill: i % 3 === 0 ? '#515850' : '#d4c9b1',
      opacity: i % 3 === 0 ? '0.27' : '0.33',
    })
  }

  // Tiny, scattered snow remnants: approximately 5% or less
  // of the visible surface, rather than large snowfields.
  const snowRemnants = [
    [0.22, 0.18, 4.5, 2.5],
    [0.68, 0.22, 5.5, 2.8],
    [0.45, 0.37, 3.5, 2.0],
    [0.81, 0.44, 4.8, 2.6],
    [0.19, 0.58, 5.0, 2.8],
    [0.57, 0.62, 3.8, 2.2],
    [0.36, 0.77, 5.2, 2.7],
    [0.72, 0.84, 4.0, 2.4],
  ]

  snowRemnants.forEach(([x, y, width, height], index) => {
    const cx = HEX_BOUNDS.width * x
    const cy = HEX_BOUNDS.height * y
    const rx = width * scale
    const ry = height * scale

    const points: string[] = []

    for (let j = 0; j < 9; j += 1) {
      const angle = (Math.PI * 2 * j) / 9
      const variation = 0.68 + pseudoRandom(index * 79 + j * 23) * 0.42

      points.push([
        cx + Math.cos(angle) * rx * variation,
        cy + Math.sin(angle) * ry * variation,
      ].join(','))
    }

    appendSvg(artwork, 'polygon', {
      points: points.join(' '),
      fill: '#e8efea',
      opacity: '0.88',
      stroke: '#bdceca',
      'stroke-width': String(0.45 * scale),
      'stroke-linejoin': 'round',
    })
  })

  return svg
}

function pseudoRandom(seed: number): number {
  const value = Math.sin(seed * 127.1 + 78.233) * 43758.5453
  return value - Math.floor(value)
}
