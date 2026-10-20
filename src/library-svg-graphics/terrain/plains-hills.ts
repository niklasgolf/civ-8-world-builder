
import { createPlainsFlat } from './plains.ts'
import { HEX_BOUNDS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let hillsSerial = 0

export function createPlainsHills(): SVGSVGElement {
  hillsSerial += 1

  const svg = createPlainsFlat()
  const clipId = `plains-hills-clip-${hillsSerial}`
  const gradientId = `plains-hills-gradient-${hillsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Plains SVG is missing its definitions')
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
    'stop-color': '#d8cf70',
  })

  appendSvg(gradient, 'stop', {
    offset: '45%',
    'stop-color': '#b1a947',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#777c32',
  })

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  const originalClip = svg.querySelector('clipPath polygon')

  if (!originalClip) {
    throw new Error('Plains SVG is missing its hexagon clipping polygon')
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

    appendSvg(hills, 'ellipse', {
      cx: String(x + w * 0.5),
      cy: String(y + h * 0.94),
      rx: String(w * 0.51),
      ry: String(h * 0.16),
      fill: '#77772d',
      opacity: '0.18',
    })

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
      stroke: '#89853b',
      'stroke-width': String(1.1 * scale),
      'stroke-linejoin': 'round',
    })

    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.16} ${y + h * 0.77}`,
        `C ${x + w * 0.27} ${y + h * 0.4}`,
        `${x + w * 0.37} ${y + h * 0.16}`,
        `${x + w * 0.48} ${y + h * 0.13}`,
        `C ${x + w * 0.4} ${y + h * 0.48}`,
        `${x + w * 0.32} ${y + h * 0.7}`,
        `${x + w * 0.16} ${y + h * 0.77}`,
        'Z',
      ].join(' '),
      fill: '#e1d67d',
      opacity: '0.48',
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
