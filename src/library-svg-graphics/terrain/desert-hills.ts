
import { createDesertFlat } from './desert.ts'
import { HEX_BOUNDS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let hillsSerial = 0

export function createDesertHills(): SVGSVGElement {
  hillsSerial += 1

  const svg = createDesertFlat()
  const clipId = `desert-hills-clip-${hillsSerial}`
  const gradientId = `desert-hills-gradient-${hillsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Desert SVG is missing its definitions')
  }

  const gradient = appendSvg(defs, 'linearGradient', {
    id: gradientId,
    x1: '0',
    y1: '0',
    x2: '0.8',
    y2: '1',
  })

  appendSvg(gradient, 'stop', {
    offset: '0%',
    'stop-color': '#ffe29a',
  })

  appendSvg(gradient, 'stop', {
    offset: '42%',
    'stop-color': '#f2c46f',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#b97847',
  })

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  const originalClip = svg.querySelector('clipPath polygon')

  if (!originalClip) {
    throw new Error('Desert SVG is missing its hexagon clipping polygon')
  }

  clipPath.append(originalClip.cloneNode(true))

  const dunes = appendSvg(svg, 'g', {
    'clip-path': `url(#${clipId})`,
  })

  const centerX = HEX_BOUNDS.width * 0.5
  const centerY = HEX_BOUNDS.height * 0.49
  const scale = HEX_BOUNDS.width / 260

  function addDune(
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
  ): void {
    const x = centerX + offsetX * scale
    const y = centerY + offsetY * scale
    const w = width * scale
    const h = height * scale

    // A soft shadow anchors the dune in the sand.
    appendSvg(dunes, 'ellipse', {
      cx: String(x + w * 0.53),
      cy: String(y + h * 0.96),
      rx: String(w * 0.54),
      ry: String(h * 0.15),
      fill: '#a96a40',
      opacity: '0.16',
    })

    // Rounded dune body with a gentle wind-shaped crest.
    appendSvg(dunes, 'path', {
      d: [
        `M ${x} ${y + h}`,
        `C ${x + w * 0.18} ${y + h * 0.81}`,
        `${x + w * 0.31} ${y + h * 0.23}`,
        `${x + w * 0.48} ${y + h * 0.17}`,
        `C ${x + w * 0.63} ${y + h * 0.18}`,
        `${x + w * 0.78} ${y + h * 0.76}`,
        `${x + w} ${y + h}`,
        'Z',
      ].join(' '),
      fill: `url(#${gradientId})`,
      stroke: '#c58a53',
      'stroke-width': String(0.8 * scale),
      'stroke-linejoin': 'round',
    })

    // Sunlit face of the dune.
    appendSvg(dunes, 'path', {
      d: [
        `M ${x + w * 0.13} ${y + h * 0.84}`,
        `C ${x + w * 0.26} ${y + h * 0.47}`,
        `${x + w * 0.37} ${y + h * 0.19}`,
        `${x + w * 0.48} ${y + h * 0.17}`,
        `C ${x + w * 0.42} ${y + h * 0.45}`,
        `${x + w * 0.31} ${y + h * 0.70}`,
        `${x + w * 0.13} ${y + h * 0.84}`,
        'Z',
      ].join(' '),
      fill: '#ffe5a0',
      opacity: '0.72',
    })

    // Warm shadow on the sheltered side.
    appendSvg(dunes, 'path', {
      d: [
        `M ${x + w * 0.48} ${y + h * 0.17}`,
        `C ${x + w * 0.64} ${y + h * 0.23}`,
        `${x + w * 0.79} ${y + h * 0.79}`,
        `${x + w} ${y + h}`,
        `L ${x + w * 0.63} ${y + h}`,
        `C ${x + w * 0.63} ${y + h * 0.70}`,
        `${x + w * 0.55} ${y + h * 0.37}`,
        `${x + w * 0.48} ${y + h * 0.17}`,
        'Z',
      ].join(' '),
      fill: '#bb784b',
      opacity: '0.35',
    })

    // A fine highlight along the crest.
    appendSvg(dunes, 'path', {
      d: [
        `M ${x + w * 0.29} ${y + h * 0.34}`,
        `Q ${x + w * 0.40} ${y + h * 0.14}`,
        `${x + w * 0.51} ${y + h * 0.19}`,
      ].join(' '),
      fill: 'none',
      stroke: '#fff0b7',
      'stroke-width': String(1.5 * scale),
      'stroke-linecap': 'round',
      opacity: '0.75',
    })
  }

  // Three dunes in the upper cluster.
  addDune(-70, -35, 62, 37)
  addDune(-29, -49, 81, 49)
  addDune(23, -30, 54, 33)

  // Two smaller dunes in the foreground.
  addDune(-48, 7, 57, 30)
  addDune(10, 10, 64, 34)

  return svg
}
