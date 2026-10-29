
import { api } from '../../convex/_generated/api.js'
import type { Id } from '../../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { EditorLayout } from '../application/editor/editor-layout.ts'
import type { ApplicationState } from './application-state.ts'

export class AssignedEditor {
  readonly #convex: ConvexConnection
  readonly #editorLayout: EditorLayout
  readonly #state: ApplicationState

  constructor(
    convex: ConvexConnection,
    editorLayout: EditorLayout,
    state: ApplicationState,
  ) {
    this.#convex = convex
    this.#editorLayout = editorLayout
    this.#state = state
  }

  public async refresh(worldId: Id<'worlds'>): Promise<void> {
    const request = ++this.#state.assignedEditorRequest

    try {
      const assignedEditor = await this.#convex.client.query(
        api.worlds.getAssignedEditor,
        { worldId },
      )

      if (
        request !== this.#state.assignedEditorRequest ||
        this.#state.selectedWorldId !== worldId
      ) {
        return
      }

      this.#editorLayout.rightPanel.setEditorTitle(
        assignedEditor?.fantasyName ?? 'Unassigned',
      )
    } catch (error: unknown) {
      if (
        request !== this.#state.assignedEditorRequest ||
        this.#state.selectedWorldId !== worldId
      ) {
        return
      }

      console.error('Failed to load assigned editor:', error)

      this.#editorLayout.rightPanel.setEditorTitle(
        'Unassigned',
      )
    }
  }
}
