
import { appendSvg, createSvg } from '../primitives/svg.ts'

export type EditorActionIconName =
  | 'edit'
  | 'stop-editing'
  | 'take-over'
  | 'like'

function stroke(parent: SVGElement, d: string, width = '1.6'): void {
  appendSvg(parent, 'path', {
    d,
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': width,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  })
}

function drawEdit(parent: SVGSVGElement): void {
  stroke(parent, 'M5 19l4.2-.9L19 8.3 15.7 5 5.9 14.8 5 19Z')
  stroke(parent, 'M13.8 6.9l3.3 3.3')
  stroke(parent, 'M5.9 14.8l3.3 3.3')
}

function drawStopEditing(parent: SVGSVGElement): void {
  appendSvg(parent, 'rect', {
    x: '5',
    y: '5',
    width: '14',
    height: '14',
    rx: '1.5',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
  })

  appendSvg(parent, 'rect', {
    x: '9',
    y: '9',
    width: '6',
    height: '6',
    rx: '0.5',
    fill: 'currentColor',
  })
}

function drawTakeOver(parent: SVGSVGElement): void {
  stroke(parent, 'M12 3l8 3v5.5c0 5-3.3 8-8 9.5-4.7-1.5-8-4.5-8-9.5V6l8-3Z')
  stroke(parent, 'M8.5 12l2.4 2.4 4.8-5')
}

function drawLike(parent: SVGSVGElement): void {
  stroke(
    parent,
    'M7 10l4.5-6c.6-.8 1.8-.4 1.8.6V9h5.1c1.2 0 2.1 1.1 1.8 2.3l-1.6 7c-.2.9-1 1.5-1.9 1.5H7V10Z',
  )

  appendSvg(parent, 'rect', {
    x: '3',
    y: '10',
    width: '4',
    height: '10',
    rx: '1',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.6',
  })
}

const drawers = {
  edit: drawEdit,
  'stop-editing': drawStopEditing,
  'take-over': drawTakeOver,
  like: drawLike,
}

export function createEditorActionIcon(
  name: EditorActionIconName,
): SVGSVGElement {
  const icon = createSvg('svg', {
    viewBox: '0 0 24 24',
    class: 'tool-icon',
    'aria-hidden': 'true',
    fill: 'none',
  })

  drawers[name](icon)

  return icon
}
