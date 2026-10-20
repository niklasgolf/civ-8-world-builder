
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import {
  POINTY_HEX,
  hex,
  nextClipId,
  stroke,
} from '../shared.ts'

export function createCoastIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  const clipId = nextClipId()

  const defs = appendSvg(icon, 'defs')

  const clip = appendSvg(defs, 'clipPath', {
    id: clipId,
  })

  appendSvg(clip, 'path', {
    d: POINTY_HEX,
  })

  hex(icon, '#e2d0a8')

  appendSvg(icon, 'path', {
    d: 'M0 0H24V12.2C18.5 10.4 15 14.2 10 12.6 7 11.6 4 12.2 0 14.2Z',
    fill: '#3e97be',
    'clip-path': `url(#${clipId})`,
  })

  stroke(
    icon,
    'M4 12.4c2.2-1.2 3.6-.4 5.4.6 2 1.1 3.4.2 5.6-1',
    '#d7efe8',
    '1',
  )

  return icon
}
