
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
    this.#state.unsubscribeEditingSession?.()
    this.#state.unsubscribeEditingSession = null

    this.#state.activeSession = null
    this.#state.sessionLoaded = false
    this.#controls.update()

    this.#state.unsubscribeEditingSession = this.#convex.client.onUpdate(
      api.editingSessions.getActiveSession,
      { worldId },
      (session) => {
        if (this.#state.selectedWorldId !== worldId) {
          return
        }

        this.#state.activeSession = session
        this.#state.sessionLoaded = true
        this.#controls.update()
      },
      (error) => {
        if (this.#state.selectedWorldId !== worldId) {
          return
        }

        console.error('Editing session subscription failed:', error)

        this.#state.activeSession = null
        this.#state.sessionLoaded = false
        this.#controls.update()
      },
    )
  }

  public async handleEditAction(): Promise<void> {
    const worldId = this.#state.selectedWorldId

    if (
      !worldId ||
      !this.#state.sessionLoaded ||
      !this.#controls.canEditSelectedWorld() ||
      this.#state.editingActionPending
    ) {
      return
    }

    const stopping = this.#controls.isCurrentEditor()

    if (!stopping && this.#state.activeSession !== null) {
      return
    }

    this.#state.editingActionPending = true
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
      this.#state.editingActionPending = false
      this.#controls.update()
    }
  }

  public async handleTakeoverAction(): Promise<void> {
    const worldId = this.#state.selectedWorldId

    if (
      !worldId ||
      !this.#state.sessionLoaded ||
      this.#state.currentIdentity?.role !== 'admin' ||
      this.#state.activeSession === null ||
      this.#controls.isCurrentEditor() ||
      this.#state.editingActionPending
    ) {
      return
    }

    this.#state.editingActionPending = true
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
      this.#state.editingActionPending = false
      this.#controls.update()
    }
  }
}
