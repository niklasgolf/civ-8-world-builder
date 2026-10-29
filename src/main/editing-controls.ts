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
    return this.#state.getActiveSession()?.isMine === true
  }

  public canEditSelectedWorld(): boolean {
    const selectedWorldId = this.#state.getSelectedWorldId()
    const identity = this.#state.getCurrentIdentity()

    if (
      !selectedWorldId ||
      !identity ||
      identity.role === 'visitor'
    ) {
      return false
    }

    return (
      identity.role === 'admin' ||
      identity.worldId === selectedWorldId
    )
  }

  public update(): void {
    const panel = this.#editorLayout.rightPanel
    const identity = this.#state.getCurrentIdentity()
    const session = this.#state.getActiveSession()
    const sessionLoaded = this.#state.isSessionLoaded()

    const isAdmin = identity?.role === 'admin'
    const ownsSession = this.isCurrentEditor()
    const canEdit = this.canEditSelectedWorld()

    if (!sessionLoaded) {
      panel.setEditingStatus('Loading status...')
    } else if (session) {
      panel.setEditingStatus(
        `Editing: ${session.fantasyName}`,
      )
    } else {
      panel.setEditingStatus('Viewing mode')
    }

    panel.setEditing(ownsSession)

    const showEdit = (
      canEdit &&
      (session === null || ownsSession)
    )

    const showTakeover = (
      isAdmin &&
      session !== null &&
      !ownsSession
    )

    panel.setEditButtonVisible(
      sessionLoaded && showEdit,
    )

    panel.setTakeoverButtonVisible(
      sessionLoaded && showTakeover,
    )

    panel.setEditingButtonsDisabled(
      this.#state.isEditingActionPending(),
    )
  }
}