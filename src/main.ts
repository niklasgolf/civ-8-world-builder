
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
import { api } from '../convex/_generated/api.js'
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

// Terrain selections and their database values

type Terrain = 'ocean' | 'coast' | 'grass' | 'plains' | 'desert' | 'tundra' | 'snow'
type Relief = 'flat' | 'hills' | 'mountain'

type TerrainSelection = {
  terrain: Terrain
  relief: Relief
}

const TERRAIN_SELECTIONS: Record<string, TerrainSelection> = {
  grass: { terrain: 'grass', relief: 'flat' },
  plains: { terrain: 'plains', relief: 'flat' },
  desert: { terrain: 'desert', relief: 'flat' },
  tundra: { terrain: 'tundra', relief: 'flat' },
  snow: { terrain: 'snow', relief: 'flat' },

  'grass-hills': { terrain: 'grass', relief: 'hills' },
  'plains-hills': { terrain: 'plains', relief: 'hills' },
  'desert-hills': { terrain: 'desert', relief: 'hills' },
  'tundra-hills': { terrain: 'tundra', relief: 'hills' },
  'snow-hills': { terrain: 'snow', relief: 'hills' },

  'grass-mountains': { terrain: 'grass', relief: 'mountain' },
  'plains-mountains': { terrain: 'plains', relief: 'mountain' },
  'desert-mountains': { terrain: 'desert', relief: 'mountain' },
  'tundra-mountains': { terrain: 'tundra', relief: 'mountain' },
  'snow-mountains': { terrain: 'snow', relief: 'mountain' },

  coast: { terrain: 'coast', relief: 'flat' },
  ocean: { terrain: 'ocean', relief: 'flat' },
}

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

// Paint a hexagon using the selected terrain

layout.editorLayout.mapArea.mapGrid.onHexClick((coordinate) => {
  if (!editingControls.isCurrentEditor()) {
    return
  }

  const worldId = state.selectedWorldId

  if (!worldId) {
    return
  }

  const selectedTerrain = layout.editorLayout.leftPanel.getSelectedTerrain()
  const selection = TERRAIN_SELECTIONS[selectedTerrain]

  if (!selection) {
    console.error('Unknown terrain selection:', selectedTerrain)
    return
  }

  void convex.client.mutation(api.hexes.setTerrain, {
    worldId,
    x: coordinate.x,
    y: coordinate.y,
    terrain: selection.terrain,
    relief: selection.relief,
  }).catch((error: unknown) => {
    console.error('Failed to paint hexagon:', error)
  })
})

// Start the application

editingControls.update()
navigation.showView('map-gallery')

void identity.initialize()

void worldSelection.initializeGallery().catch((error: unknown) => {
  console.error('Failed to initialize Map Gallery:', error)
})
