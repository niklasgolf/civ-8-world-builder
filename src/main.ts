
import './styles/style-main.css'
import './styles/style-map-gallery.css'
import './styles/style-world-builder-main.css'
import './styles/style-world-builder-tool-panels.css'
import './styles/style-world-builder-terrain-palette.css'
import './styles/style-world-builder-editor-actions.css'
import './styles/style-world-builder-minimap.css'
import './styles/style-visitors-and-login.css'
import './styles/style-civ-wiki.css'

import type { Id } from '../convex/_generated/dataModel.ts'
import type { AppView } from './application/editor/header.ts'
import { ConvexConnection } from './application/database/convex-client.ts'
import { ClerkAuthentication } from './application/authentication/clerk-authentication.ts'

import { ApplicationState } from './main/application-state.ts'
import { ApplicationLayout } from './main/application-layout.ts'
import { Navigation } from './main/navigation.ts'
import { AssignedEditor } from './main/assigned-editor.ts'
import { Authentication } from './main/authentication.ts'
import { EditingControls } from './main/editing-controls.ts'
import { EditingSessionController } from './main/editing-session.ts'
import { WorldSelection } from './main/world-selection.ts'

// Shared services and application state

const convex = new ConvexConnection()
const authentication = new ClerkAuthentication()
const state = new ApplicationState()

// Application layout

let navigation: Navigation
let worldSelection: WorldSelection

const layout = new ApplicationLayout(
  convex,
  authentication,
  (worldId: Id<'worlds'>) => {
    worldSelection.selectWorld(worldId)
  },
  (view: AppView) => {
    navigation.showView(view)
  },
)

// Navigation and world management

navigation = new Navigation(
  layout.header,
  layout.gallery,
  layout.worldBuilder,
  layout.visitors,
  layout.wiki,
  state,
)

const assignedEditor = new AssignedEditor(
  convex,
  layout.editorLayout,
  state,
)

// Editing permissions and sessions

const editingControls = new EditingControls(
  layout.editorLayout,
  state,
)

const editingSession = new EditingSessionController(
  convex,
  state,
  editingControls,
)

worldSelection = new WorldSelection(
  convex,
  layout.gallery,
  layout.editorLayout,
  layout.worldMapController,
  layout.header,
  state,
  assignedEditor,
  editingSession,
  navigation,
)

// Authentication

const identity = new Authentication(
  authentication,
  convex,
  layout.visitors,
  state,
  () => editingControls.update(),
)

// Editor button actions

layout.editorLayout.rightPanel.onEdit(() => {
  void editingSession.handleEditAction()
})

layout.editorLayout.rightPanel.onTakeover(() => {
  void editingSession.handleTakeoverAction()
})

// Start the application

editingControls.update()
navigation.showView('map-gallery')

void identity.initialize()

void worldSelection.initializeGallery().catch((error: unknown) => {
  console.error('Failed to initialize Map Gallery:', error)
})
