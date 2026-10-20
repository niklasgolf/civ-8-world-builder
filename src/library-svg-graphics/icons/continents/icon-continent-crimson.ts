
import { createSvg } from '../../primitives/svg.ts'
import { continent } from '../shared.ts'

export function createContinentCrimsonIcon(): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  continent(icon, '#c4493a')

  return icon
}
