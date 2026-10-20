
import { createSvg } from '../../primitives/svg.ts'
import { continent } from '../shared.ts'

export function createContinentGoldIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  continent(icon, '#d4a017')

  return icon
}
