
import { api } from '../../convex/_generated/api.js'
import type { Id } from '../../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { EditorLayout } from '../application/editor/editor-layout.ts'
import type { WorldGallery } from '../application/gallery/world-gallery.ts'
import type { WorldMapController } from '../application/map/world-map-controller.ts'
import type { Header } from '../application/editor/header.ts'
import type { ApplicationState } from './application-state.ts'
import type { AssignedEditor } from './assigned-editor.ts'
import type { EditingSessionController } from './editing-session.ts'
import type { Navigation } from './navigation.ts'

export class WorldSelection {
  readonly #convex: ConvexConnection
  readonly #gallery: WorldGallery
  readonly #editorLayout: EditorLayout
  readonly #worldMapController: WorldMapController
  readonly #header: Header
  readonly #state: ApplicationState
  readonly #assignedEditor: AssignedEditor
  readonly #editingSession: EditingSessionController
  readonly #navigation: Navigation

  constructor(
    convex: ConvexConnection,
    gallery: WorldGallery,
    editorLayout: EditorLayout,
    worldMapController: WorldMapController,
    header: Header,
    state: ApplicationState,
    assignedEditor: AssignedEditor,
    editingSession: EditingSessionController,
    navigation: Navigation,
  ) {
    this.#convex = convex
    this.#gallery = gallery
    this.#editorLayout = editorLayout
    this.#worldMapController = worldMapController
    this.#header = header
    this.#state = state
    this.#assignedEditor = assignedEditor
    this.#editingSession = editingSession
    this.#navigation = navigation
  }

  public async initializeGallery(): Promise<void> {
    this.#state.setWorlds(await this.#convex.client.query(
      api.worlds.list,
      {},
    ))

    this.#gallery.setWorlds(this.#state.getWorlds())
  }

  public selectWorld(worldId: Id<'worlds'>): void {
    const selectedWorld = this.#state.getWorlds().find(
      (world) => world._id === worldId,
    )

    if (!selectedWorld) {
      console.error('Selected world not found:', worldId)
      return
    }

    this.#state.selectWorld(worldId)

    this.#editorLayout.setWorldInformation(
      'Unedited Map',
      'Loading...',
    )

    this.#header.setWorldBuilderAvailable(true)
    this.#worldMapController.selectWorld(worldId)

    this.#editingSession.subscribe(worldId)
    this.#navigation.showView('world-builder')

    void this.#assignedEditor.refresh(worldId)
  }
}
