
import { createEditIcon } from './editor-actions/icon-edit.ts'
import { createStopEditingIcon } from './editor-actions/icon-stop-editing.ts'
import { createTakeOverIcon } from './editor-actions/icon-take-over.ts'
import { createLikeIcon } from './editor-actions/icon-like.ts'

export type EditorActionIconName =
  | 'edit'
  | 'stop-editing'
  | 'take-over'
  | 'like'

const drawers = {
  edit: createEditIcon,
  'stop-editing': createStopEditingIcon,
  'take-over': createTakeOverIcon,
  like: createLikeIcon,
}

export function createEditorActionIcon(
  name: EditorActionIconName,
): SVGSVGElement {
  return drawers[name]()
}
