
import type { Id } from '../../convex/_generated/dataModel.ts'
import type { GalleryWorld } from '../application/gallery/world-gallery.ts'

export type FantasyIdentity = {
  authenticated: boolean
  role: 'visitor' | 'editor' | 'admin'
  fantasyName: string | null
  worldId: Id<'worlds'> | null
}

export type EditingSession = {
  worldId: Id<'worlds'>
  fantasyName: string
  role: 'editor' | 'admin'
  startedAt: number
  isMine: boolean
}

export class ApplicationState {
  #selectedWorldId: Id<'worlds'> | null = null
  #worlds: GalleryWorld[] = []

  #authenticationRequest = 0
  #assignedEditorRequest = 0

  #currentIdentity: FantasyIdentity | null = null
  #activeSession: EditingSession | null = null
  #sessionLoaded = false
  #editingActionPending = false
  #unsubscribeEditingSession: (() => void) | null = null

  public getSelectedWorldId(): Id<'worlds'> | null {
    return this.#selectedWorldId
  }

  public selectWorld(worldId: Id<'worlds'> | null): void {
    this.#selectedWorldId = worldId
  }

  public getWorlds(): GalleryWorld[] {
    return this.#worlds
  }

  public setWorlds(worlds: GalleryWorld[]): void {
    this.#worlds = worlds
  }

  public getAuthenticationRequest(): number {
    return this.#authenticationRequest
  }

  public nextAuthenticationRequest(): number {
    return ++this.#authenticationRequest
  }

  public getAssignedEditorRequest(): number {
    return this.#assignedEditorRequest
  }

  public nextAssignedEditorRequest(): number {
    return ++this.#assignedEditorRequest
  }

  public getCurrentIdentity(): FantasyIdentity | null {
    return this.#currentIdentity
  }

  public setCurrentIdentity(identity: FantasyIdentity | null): void {
    this.#currentIdentity = identity
  }

  public getActiveSession(): EditingSession | null {
    return this.#activeSession
  }

  public setActiveSession(session: EditingSession | null): void {
    this.#activeSession = session
  }

  public isSessionLoaded(): boolean {
    return this.#sessionLoaded
  }

  public setSessionLoaded(loaded: boolean): void {
    this.#sessionLoaded = loaded
  }

  public isEditingActionPending(): boolean {
    return this.#editingActionPending
  }

  public setEditingActionPending(pending: boolean): void {
    this.#editingActionPending = pending
  }

  public getEditingSessionUnsubscribe(): (() => void) | null {
    return this.#unsubscribeEditingSession
  }

  public setEditingSessionUnsubscribe(
    unsubscribe: (() => void) | null,
  ): void {
    this.#unsubscribeEditingSession = unsubscribe
  }
}
