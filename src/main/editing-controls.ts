
import type { EditorLayout } from '../application/editor/editor-layout.ts'
import type { ApplicationState } from './application-state.ts'

export class EditingControls {
  readonly #editorLayout: EditorLayout
  readonly #state: ApplicationState

  constructor(
    editorLayout: EditorLayout,
    state: ApplicationState,
  ) {
    this.#editorLayout = editorLayout
    this.#state = state
  }

  public isCurrentEditor(): boolean {
    return this.#state.activeSession?.isMine === true
  }

  public canEditSelectedWorld(): boolean {
    if (
      !this.#state.selectedWorldId ||
      !this.#state.currentIdentity ||
      this.#state.currentIdentity.role === 'visitor'
    ) {
      return false
    }

    return (
      this.#state.currentIdentity.role === 'admin' ||
      this.#state.currentIdentity.worldId === this.#state.selectedWorldId
    )
  }

  public update(): void {
    const panel = this.#editorLayout.rightPanel
    const isAdmin = this.#state.currentIdentity?.role === 'admin'
    const ownsSession = this.isCurrentEditor()
    const canEdit = this.canEditSelectedWorld()

    if (!this.#state.sessionLoaded) {
      panel.setEditingStatus('Loading status...')
    } else if (this.#state.activeSession) {
      panel.setEditingStatus(
        `Editing: ${this.#state.activeSession.fantasyName}`,
      )
    } else {
      panel.setEditingStatus('Viewing mode')
    }

    panel.setEditing(ownsSession)

    const showEdit = (
      canEdit &&
      (this.#state.activeSession === null || ownsSession)
    )

    const showTakeover = (
      isAdmin &&
      this.#state.activeSession !== null &&
      !ownsSession
    )

    panel.setEditButtonVisible(
      this.#state.sessionLoaded && showEdit,
    )

    panel.setTakeoverButtonVisible(
      this.#state.sessionLoaded && showTakeover,
    )

    panel.setEditingButtonsDisabled(
      this.#state.editingActionPending,
    )
  }
}
