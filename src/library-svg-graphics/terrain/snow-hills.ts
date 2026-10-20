
import { createSnowFlat } from './snow.ts'
import { HEX_BOUNDS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let hillsSerial = 0

export function createSnowHills(): SVGSVGElement {
  hillsSerial += 1

  const svg = createSnowFlat()
  const clipId = `snow-hills-clip-${hillsSerial}`
  const gradientId = `snow-hills-gradient-${hillsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Snow SVG is missing its definitions')
  }

  const gradient = appendSvg(defs, 'linearGradient', {
    id: gradientId,
    x1: '0',
    y1: '0',
    x2: '0.85',
    y2: '1',
  })

  appendSvg(gradient, 'stop', {
    offset: '0%',
    'stop-color': '#ffffff',
  })

  appendSvg(gradient, 'stop', {
    offset: '38%',
    'stop-color': '#d9eafa',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#8fb5d8',
  })

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  const originalClip = svg.querySelector('clipPath polygon')

  if (!originalClip) {
    throw new Error('Snow SVG is missing its hexagon clipping polygon')
  }

  clipPath.append(originalClip.cloneNode(true))

  const hills = appendSvg(svg, 'g', {
    'clip-path': `url(#${clipId})`,
  })

  const centerX = HEX_BOUNDS.width * 0.5
  const centerY = HEX_BOUNDS.height * 0.49
  const scale = HEX_BOUNDS.width / 260

  function addHill(
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
  ): void {
    const x = centerX + offsetX * scale
    const y = centerY + offsetY * scale
    const w = width * scale
    const h = height * scale

    // A cool blue shadow anchors the hill to the snowfield.
    appendSvg(hills, 'ellipse', {
      cx: String(x + w * 0.52),
      cy: String(y + h * 0.96),
      rx: String(w * 0.54),
      ry: String(h * 0.17),
      fill: '#6997c0',
      opacity: '0.25',
    })

    // Rounded snow-covered hill.
    appendSvg(hills, 'path', {
      d: [
        `M ${x} ${y + h}`,
        `C ${x + w * 0.14} ${y + h * 0.72}`,
        `${x + w * 0.31} ${y + h * 0.18}`,
        `${x + w * 0.48} ${y + h * 0.13}`,
        `C ${x + w * 0.66} ${y + h * 0.12}`,
        `${x + w * 0.85} ${y + h * 0.75}`,
        `${x + w} ${y + h}`,
        'Z',
      ].join(' '),
      fill: `url(#${gradientId})`,
      stroke: '#86accd',
      'stroke-width': String(0.85 * scale),
      'stroke-linejoin': 'round',
    })

    // Soft white highlight on the sunlit slope.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.12} ${y + h * 0.82}`,
        `C ${x + w * 0.25} ${y + h * 0.44}`,
        `${x + w * 0.37} ${y + h * 0.16}`,
        `${x + w * 0.48} ${y + h * 0.13}`,
        `C ${x + w * 0.43} ${y + h * 0.43}`,
        `${x + w * 0.30} ${y + h * 0.69}`,
        `${x + w * 0.12} ${y + h * 0.82}`,
        'Z',
      ].join(' '),
      fill: '#ffffff',
      opacity: '0.83',
    })

    // Cooler shadow on the sheltered right slope.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.48} ${y + h * 0.13}`,
        `C ${x + w * 0.66} ${y + h * 0.15}`,
        `${x + w * 0.85} ${y + h * 0.75}`,
        `${x + w} ${y + h}`,
        `L ${x + w * 0.64} ${y + h}`,
        `C ${x + w * 0.61} ${y + h * 0.63}`,
        `${x + w * 0.54} ${y + h * 0.32}`,
        `${x + w * 0.48} ${y + h * 0.13}`,
        'Z',
      ].join(' '),
      fill: '#719ec9',
      opacity: '0.28',
    })

    // Delicate wind-carved lines in the snow.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.18} ${y + h * 0.72}`,
        `Q ${x + w * 0.30} ${y + h * 0.65}`,
        `${x + w * 0.38} ${y + h * 0.69}`,
        `M ${x + w * 0.58} ${y + h * 0.57}`,
        `Q ${x + w * 0.70} ${y + h * 0.63}`,
        `${x + w * 0.78} ${y + h * 0.74}`,
      ].join(' '),
      fill: 'none',
      stroke: '#f5fbff',
      'stroke-width': String(1.1 * scale),
      'stroke-linecap': 'round',
      opacity: '0.66',
    })

    // A crisp line of light across the crest.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.32} ${y + h * 0.28}`,
        `Q ${x + w * 0.41} ${y + h * 0.12}`,
        `${x + w * 0.50} ${y + h * 0.15}`,
      ].join(' '),
      fill: 'none',
      stroke: '#ffffff',
      'stroke-width': String(1.35 * scale),
      'stroke-linecap': 'round',
      opacity: '0.9',
    })
  }

  // Three hills in the upper cluster.
  addHill(-70, -35, 62, 37)
  addHill(-29, -49, 81, 49)
  addHill(23, -30, 54, 33)

  // Two smaller hills in the foreground.
  addHill(-48, 7, 57, 30)
  addHill(10, 10, 64, 34)

  return svg
}
