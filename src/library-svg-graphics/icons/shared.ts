
import { appendSvg } from '../primitives/svg.ts'

export const POINTY_HEX =
  'M12 2.2 20.4 7.1 20.4 16.9 12 21.8 3.6 16.9 3.6 7.1Z'

let clipSerial = 0

export function nextClipId(): string {
  clipSerial += 1
  return `icon-clip-${clipSerial}`
}

export function hex(parent: SVGElement, fill: string): void {
  appendSvg(parent, 'path', {
    d: POINTY_HEX,
    fill,
    stroke: 'rgba(7, 17, 28, 0.55)',
    'stroke-width': '0.7',
    'stroke-linejoin': 'round',
  })
}

export function stroke(
  parent: SVGElement,
  d: string,
  color = 'currentColor',
  width = '1.6',
): void {
  appendSvg(parent, 'path', {
    d,
    fill: 'none',
    stroke: color,
    'stroke-width': width,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })
}

export function tree(
  parent: SVGElement,
  cx: number,
  top: number,
  width: number,
  height: number,
  color: string,
): void {
  const base = top + height

  appendSvg(parent, 'path', {
    d: `M${cx} ${top} L${cx + width / 2} ${base} H${cx - width / 2}Z`,
    fill: color,
  })

  appendSvg(parent, 'rect', {
    x: String(cx - 0.8),
    y: String(base),
    width: '1.6',
    height: '2.2',
    fill: '#6a4630',
  })
}

export function brush(
  parent: SVGSVGElement,
  radius: number,
): void {
  appendSvg(parent, 'circle', {
    cx: '10',
    cy: '14.5',
    r: String(radius),
    fill: 'currentColor',
  })

  stroke(parent, 'M13.2 11.2 19 5.2', 'currentColor', '1.8')
  stroke(parent, 'M16.8 4.2 20 7.4', 'currentColor', '1.8')
}

export function drawUndo(parent: SVGElement): void {
  stroke(parent, 'M9 7.5 4.5 12 9 16.5')
  stroke(parent, 'M6 12h8.2')
  stroke(parent, 'M14.2 12a4.2 4.2 0 1 0-1.2-8.2')
}

export function continent(
  parent: SVGSVGElement,
  color: string,
): void {
  hex(parent, color)

  appendSvg(parent, 'circle', {
    cx: '12',
    cy: '12',
    r: '2.1',
    fill: 'rgba(255,255,255,0.35)',
  })
}
