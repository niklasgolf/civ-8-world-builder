
import { createTundraFlat } from './tundra.ts'
import { HEX_BOUNDS } from '../definitions/hex.ts'
import { appendSvg } from '../primitives/svg.ts'

let hillsSerial = 0

export function createTundraHills(): SVGSVGElement {
  hillsSerial += 1

  const svg = createTundraFlat()
  const clipId = `tundra-hills-clip-${hillsSerial}`
  const gradientId = `tundra-hills-gradient-${hillsSerial}`

  const defs = svg.querySelector('defs')

  if (!defs) {
    throw new Error('Tundra SVG is missing its definitions')
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
    'stop-color': '#aaa594',
  })

  appendSvg(gradient, 'stop', {
    offset: '45%',
    'stop-color': '#7f8074',
  })

  appendSvg(gradient, 'stop', {
    offset: '100%',
    'stop-color': '#505a54',
  })

  const clipPath = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  const originalClip = svg.querySelector('clipPath polygon')

  if (!originalClip) {
    throw new Error('Tundra SVG is missing its hexagon clipping polygon')
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

    // Soft shadow beneath the exposed rock.
    appendSvg(hills, 'ellipse', {
      cx: String(x + w * 0.5),
      cy: String(y + h * 0.94),
      rx: String(w * 0.51),
      ry: String(h * 0.16),
      fill: '#454e49',
      opacity: '0.2',
    })

    // Main rounded rocky hill.
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
      stroke: '#555d55',
      'stroke-width': String(1.1 * scale),
      'stroke-linejoin': 'round',
    })

    // Soft highlight on the sun-facing rocky slope.
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
      fill: '#b9b4a2',
      opacity: '0.38',
    })

    // Fine, irregular fractures across the rock face.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.34} ${y + h * 0.42}`,
        `L ${x + w * 0.43} ${y + h * 0.5}`,
        `L ${x + w * 0.4} ${y + h * 0.64}`,
        `M ${x + w * 0.62} ${y + h * 0.46}`,
        `L ${x + w * 0.68} ${y + h * 0.58}`,
        `L ${x + w * 0.64} ${y + h * 0.72}`,
      ].join(' '),
      fill: 'none',
      stroke: '#505b55',
      'stroke-width': String(0.85 * scale),
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      opacity: '0.42',
    })

    // A tiny remnant of snow near the upper crest.
    appendSvg(hills, 'path', {
      d: [
        `M ${x + w * 0.38} ${y + h * 0.19}`,
        `Q ${x + w * 0.47} ${y + h * 0.11}`,
        `${x + w * 0.54} ${y + h * 0.18}`,
        `L ${x + w * 0.49} ${y + h * 0.23}`,
        `L ${x + w * 0.45} ${y + h * 0.2}`,
        'Z',
      ].join(' '),
      fill: '#e4eae4',
      opacity: '0.65',
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
