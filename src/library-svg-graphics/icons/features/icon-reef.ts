
import { appendSvg, createSvg } from '../../primitives/svg.ts'
import { stroke } from '../shared.ts'

export function createReefIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  stroke(
    icon,
    'M12 19 V8',
    '#e07a68',
    '1.8',
  )

  stroke(
    icon,
    'M12 12c-3-1-4-3-4-5',
    '#e07a68',
    '1.6',
  )

  stroke(
    icon,
    'M12 10c3-1 5-2 6-4',
    '#f0b090',
    '1.6',
  )

  stroke(
    icon,
    'M12 15c-3 .2-5 2-6 4',
    '#f0b090',
    '1.6',
  )

  stroke(
    icon,
    'M12 14c3 .4 4 2 5 4',
    '#e07a68',
    '1.6',
  )

  appendSvg(icon, 'circle', {
    cx: '8',
    cy: '7',
    r: '1.1',
    fill: '#f0b090',
  })

  appendSvg(icon, 'circle', {
    cx: '18',
    cy: '6',
    r: '1.1',
    fill: '#e07a68',
  })

  return icon
}
