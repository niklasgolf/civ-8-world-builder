
import { api } from '../../convex/_generated/api.js'
import type { Id } from '../../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { ApplicationState } from './application-state.ts'
import type { EditingControls } from './editing-controls.ts'

export class EditingSessionController {
  readonly #convex: ConvexConnection
  readonly #state: ApplicationState
  readonly #controls: EditingControls

  constructor(
    convex: ConvexConnection,
    state: ApplicationState,
    controls: EditingControls,
  ) {
    this.#convex = convex
    this.#state = state
    this.#controls = controls
  }

  public subscribe(worldId: Id<'worlds'>): void {
    this.#state.getEditingSessionUnsubscribe()?.()
    this.#state.setEditingSessionUnsubscribe(null)

    this.#state.setActiveSession(null)
    this.#state.setSessionLoaded(false)
    this.#controls.update()

    this.#state.setEditingSessionUnsubscribe(
      this.#convex.client.onUpdate(
        api.editingSessions.getActiveSession,
        { worldId },
        (session) => {
          if (this.#state.getSelectedWorldId() !== worldId) {
            return
          }

          this.#state.setActiveSession(session)
          this.#state.setSessionLoaded(true)
          this.#controls.update()
        },
        (error) => {
          if (this.#state.getSelectedWorldId() !== worldId) {
            return
          }

          console.error('Editing session subscription failed:', error)

          this.#state.setActiveSession(null)
          this.#state.setSessionLoaded(false)
          this.#controls.update()
        },
      ),
    )
  }

  public async handleEditAction(): Promise<void> {
    const worldId = this.#state.getSelectedWorldId()

    if (
      !worldId ||
      !this.#state.isSessionLoaded() ||
      !this.#controls.canEditSelectedWorld() ||
      this.#state.isEditingActionPending()
    ) {
      return
    }

    const stopping = this.#controls.isCurrentEditor()

    if (!stopping && this.#state.getActiveSession() !== null) {
      return
    }

    this.#state.setEditingActionPending(true)
    this.#controls.update()

    try {
      if (stopping) {
        await this.#convex.client.mutation(
          api.editingSessions.stopEditing,
          { worldId },
        )
      } else {
        await this.#convex.client.mutation(
          api.editingSessions.startEditing,
          { worldId },
        )
      }
    } catch (error: unknown) {
      console.error('Editing action failed:', error)

      window.alert(
        error instanceof Error
          ? error.message
          : 'Unable to change the editing session',
      )
    } finally {
      this.#state.setEditingActionPending(false)
      this.#controls.update()
    }
  }

  public async handleTakeoverAction(): Promise<void> {
    const worldId = this.#state.getSelectedWorldId()

    if (
      !worldId ||
      !this.#state.isSessionLoaded() ||
      this.#state.getCurrentIdentity()?.role !== 'admin' ||
      this.#state.getActiveSession() === null ||
      this.#controls.isCurrentEditor() ||
      this.#state.isEditingActionPending()
    ) {
      return
    }

    this.#state.setEditingActionPending(true)
    this.#controls.update()

    try {
      await this.#convex.client.mutation(
        api.editingSessions.startEditing,
        {
          worldId,
          takeover: true,
        },
      )
    } catch (error: unknown) {
      console.error('Editing takeover failed:', error)

      window.alert(
        error instanceof Error
          ? error.message
          : 'Unable to take over the editing session',
      )
    } finally {
      this.#state.setEditingActionPending(false)
      this.#controls.update()
    }
  }
}
