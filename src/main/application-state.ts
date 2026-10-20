
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
  selectedWorldId: Id<'worlds'> | null = null
  worlds: GalleryWorld[] = []

  authenticationRequest = 0
  assignedEditorRequest = 0

  currentIdentity: FantasyIdentity | null = null
  activeSession: EditingSession | null = null
  sessionLoaded = false
  editingActionPending = false
  unsubscribeEditingSession: (() => void) | null = null
}
