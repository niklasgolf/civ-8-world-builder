
import './styles/style-main.css'
import './styles/style-map-gallery.css'
import './styles/style-world-builder-main.css'
import './styles/style-world-builder-tool-panels.css'
import './styles/style-world-builder-terrain-palette.css'
import './styles/style-world-builder-editor-actions.css'
import './styles/style-world-builder-minimap.css'
import './styles/style-visitors-and-login.css'
import './styles/style-civ-wiki.css'

import { Header, type AppView } from './application/editor/header.ts'
import { CivWiki } from './application/wiki/civ-wiki.ts'
import { EditorLayout } from './application/editor/editor-layout.ts'
import { WorldGallery, type GalleryWorld } from './application/gallery/world-gallery.ts'
import { VisitorsLayout } from './application/visitors/visitors-layout.ts'
import { ConvexConnection } from './application/database/convex-client.ts'
import { WorldMapController } from './application/map/world-map-controller.ts'
import { ClerkAuthentication } from './application/authentication/clerk-authentication.ts'
import { api } from '../convex/_generated/api.js'
import type { Id } from '../convex/_generated/dataModel.ts'

type FantasyIdentity = {
  authenticated: boolean
  role: 'visitor' | 'editor' | 'admin'
  fantasyName: string | null
  worldId: Id<'worlds'> | null
}

type EditingSession = {
  worldId: Id<'worlds'>
  fantasyName: string
  role: 'editor' | 'admin'
  startedAt: number
  isMine: boolean
}

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Application root element not found')
}

const convex = new ConvexConnection()
const authentication = new ClerkAuthentication()

const editor = document.createElement('div')
editor.className = 'editor'

const content = document.createElement('main')
content.className = 'editor-content'

const worldBuilder = document.createElement('section')
worldBuilder.className = 'world-builder'
worldBuilder.setAttribute('aria-label', 'World Builder')

const editorLayout = new EditorLayout()
worldBuilder.append(editorLayout.element)

const worldMapController = new WorldMapController(
  convex.client,
  editorLayout.mapArea.mapGrid,
)

const gallery = new WorldGallery((worldId) => {
  selectWorld(worldId)
})

const visitors = new VisitorsLayout(authentication)
const wiki = new CivWiki()

const header = new Header((view) => {
  showView(view)
})

content.append(
  gallery.element,
  worldBuilder,
  visitors.element,
  wiki.element,
)

editor.append(header.element, content)
app.replaceChildren(editor)

let selectedWorldId: Id<'worlds'> | null = null
let worlds: GalleryWorld[] = []

let authenticationRequest = 0
let assignedEditorRequest = 0

let currentIdentity: FantasyIdentity | null = null
let activeSession: EditingSession | null = null
let sessionLoaded = false
let editingActionPending = false
let unsubscribeEditingSession: (() => void) | null = null

editorLayout.rightPanel.onEdit(() => {
  void handleEditAction()
})

editorLayout.rightPanel.onTakeover(() => {
  void handleTakeoverAction()
})

updateEditingControls()

showView('map-gallery')

void initializeAuthentication()

async function initializeAuthentication(): Promise<void> {
  try {
    await authentication.initialize()

    visitors.loginPage.initialize(() => {
      void refreshFantasyIdentity()
    })

    await convex.connectAuthentication(authentication)

    await refreshFantasyIdentity()
  } catch (error: unknown) {
    console.error('Authentication initialization failed:', error)
    currentIdentity = null
    visitors.loginPage.setFantasyIdentity(null)
    updateEditingControls()
  }
}

async function refreshFantasyIdentity(): Promise<void> {
  const request = ++authenticationRequest
  const userId = authentication.getUserId()

  currentIdentity = null
  visitors.loginPage.setFantasyIdentity(null)
  updateEditingControls()

  if (!userId) {
    return
  }

  try {
    const user = await convex.client.query(
      api.authentication.currentUser,
      {},
    )

    if (
      request !== authenticationRequest ||
      authentication.getUserId() !== userId
    ) {
      return
    }

    currentIdentity = user
    visitors.loginPage.setFantasyIdentity(user)
    updateEditingControls()

    if (user?.role === 'admin') {
      console.log(
        `Administrator verified: ${user.fantasyName}`,
      )
    } else if (user?.role === 'editor') {
      console.log(
        `Editor verified: ${user.fantasyName}`,
      )
    } else {
      console.log('Visitor verified')
    }
  } catch (error: unknown) {
    if (request !== authenticationRequest) {
      return
    }

    console.error('Fantasy identity verification failed:', error)
    currentIdentity = null
    visitors.loginPage.setFantasyIdentity(null)
    updateEditingControls()
  }
}

async function initializeGallery(): Promise<void> {
  worlds = await convex.client.query(api.worlds.list, {})
  gallery.setWorlds(worlds)
}

void initializeGallery().catch((error: unknown) => {
  console.error('Failed to initialize Map Gallery:', error)
})

function selectWorld(worldId: Id<'worlds'>): void {
  const selectedWorld = worlds.find((world) => world._id === worldId)

  if (!selectedWorld) {
    console.error('Selected world not found:', worldId)
    return
  }

  selectedWorldId = worldId

  editorLayout.setWorldInformation(
    'Unedited Map',
    'Loading...',
  )

  header.setWorldBuilderAvailable(true)
  worldMapController.selectWorld(worldId)

  subscribeToEditingSession(worldId)
  showView('world-builder')

  void refreshAssignedEditor(worldId)
}

async function refreshAssignedEditor(
  worldId: Id<'worlds'>,
): Promise<void> {
  const request = ++assignedEditorRequest

  try {
    const assignedEditor = await convex.client.query(
      api.worlds.getAssignedEditor,
      { worldId },
    )

    if (
      request !== assignedEditorRequest ||
      selectedWorldId !== worldId
    ) {
      return
    }

    editorLayout.rightPanel.setEditorTitle(
      assignedEditor?.fantasyName ?? 'Unassigned',
    )
  } catch (error: unknown) {
    if (
      request !== assignedEditorRequest ||
      selectedWorldId !== worldId
    ) {
      return
    }

    console.error('Failed to load assigned editor:', error)

    editorLayout.rightPanel.setEditorTitle(
      'Unassigned',
    )
  }
}

function subscribeToEditingSession(
  worldId: Id<'worlds'>,
): void {
  unsubscribeEditingSession?.()
  unsubscribeEditingSession = null

  activeSession = null
  sessionLoaded = false
  updateEditingControls()

  unsubscribeEditingSession = convex.client.onUpdate(
    api.editingSessions.getActiveSession,
    { worldId },
    (session) => {
      if (selectedWorldId !== worldId) {
        return
      }

      activeSession = session
      sessionLoaded = true
      updateEditingControls()
    },
    (error) => {
      if (selectedWorldId !== worldId) {
        return
      }

      console.error('Editing session subscription failed:', error)

      activeSession = null
      sessionLoaded = false
      updateEditingControls()
    },
  )
}

function isCurrentEditor(): boolean {
  return activeSession?.isMine === true
}

function canEditSelectedWorld(): boolean {
  if (
    !selectedWorldId ||
    !currentIdentity ||
    currentIdentity.role === 'visitor'
  ) {
    return false
  }

  return (
    currentIdentity.role === 'admin' ||
    currentIdentity.worldId === selectedWorldId
  )
}

function updateEditingControls(): void {
  const panel = editorLayout.rightPanel
  const isAdmin = currentIdentity?.role === 'admin'
  const ownsSession = isCurrentEditor()
  const canEdit = canEditSelectedWorld()

  if (!sessionLoaded) {
    panel.setEditingStatus('Loading status...')
  } else if (activeSession) {
    panel.setEditingStatus(
      `Editing: ${activeSession.fantasyName}`,
    )
  } else {
    panel.setEditingStatus('Viewing mode')
  }

  panel.setEditing(ownsSession)

  const showEdit = (
    canEdit &&
    (activeSession === null || ownsSession)
  )

  const showTakeover = (
    isAdmin &&
    activeSession !== null &&
    !ownsSession
  )

  panel.setEditButtonVisible(
    sessionLoaded && showEdit,
  )

  panel.setTakeoverButtonVisible(
    sessionLoaded && showTakeover,
  )

  panel.setEditingButtonsDisabled(editingActionPending)
}

async function handleEditAction(): Promise<void> {
  const worldId = selectedWorldId

  if (
    !worldId ||
    !sessionLoaded ||
    !canEditSelectedWorld() ||
    editingActionPending
  ) {
    return
  }

  const stopping = isCurrentEditor()

  if (!stopping && activeSession !== null) {
    return
  }

  editingActionPending = true
  updateEditingControls()

  try {
    if (stopping) {
      await convex.client.mutation(
        api.editingSessions.stopEditing,
        { worldId },
      )
    } else {
      await convex.client.mutation(
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
    editingActionPending = false
    updateEditingControls()
  }
}

async function handleTakeoverAction(): Promise<void> {
  const worldId = selectedWorldId

  if (
    !worldId ||
    !sessionLoaded ||
    currentIdentity?.role !== 'admin' ||
    activeSession === null ||
    isCurrentEditor() ||
    editingActionPending
  ) {
    return
  }

  editingActionPending = true
  updateEditingControls()

  try {
    await convex.client.mutation(
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
    editingActionPending = false
    updateEditingControls()
  }
}

function showView(view: AppView): void {
  if (view === 'world-builder' && selectedWorldId === null) {
    view = 'map-gallery'
  }

  gallery.element.classList.toggle(
    'is-active',
    view === 'map-gallery',
  )

  worldBuilder.classList.toggle(
    'is-active',
    view === 'world-builder',
  )

  visitors.element.classList.toggle(
    'is-active',
    view === 'visitors-login',
  )

  wiki.element.classList.toggle(
    'is-active',
    view === 'civ-wiki',
  )

  header.setView(view)
}
