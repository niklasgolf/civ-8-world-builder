
import { createSvg } from '../../primitives/svg.ts'
import { continent } from '../shared.ts'

export function createContinentPurpleIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
    fill: 'none',
  })

  continent(icon, '#7a5cad')

  return icon
}
