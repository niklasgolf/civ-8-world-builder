import { appendSvg, createSvg } from '../primitives/svg.ts'

export function createHeaderMark(): SVGSVGElement {
  const mark = createSvg('svg', {
    viewBox: '0 0 24 24',
    'aria-hidden': 'true',
  })

  appendSvg(mark, 'path', {
    d: 'M12 2.2 20.4 7.1 20.4 16.9 12 21.8 3.6 16.9 3.6 7.1Z',
    fill: '#1b6a86',
    stroke: '#e2c27a',
    'stroke-width': '1.4',
    'stroke-linejoin': 'round',
  })

  return mark
}
