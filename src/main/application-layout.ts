
import type { Id } from '../../convex/_generated/dataModel.ts'
import { Header, type AppView } from '../application/editor/header.ts'
import { CivWiki } from '../application/wiki/civ-wiki.ts'
import { EditorLayout } from '../application/editor/editor-layout.ts'
import { WorldGallery } from '../application/gallery/world-gallery.ts'
import { VisitorsLayout } from '../application/visitors/visitors-layout.ts'
import { WorldMapController } from '../application/map/world-map-controller.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { ClerkAuthentication } from '../application/authentication/clerk-authentication.ts'

export class ApplicationLayout {
  readonly header: Header
  readonly gallery: WorldGallery
  readonly editorLayout: EditorLayout
  readonly visitors: VisitorsLayout
  readonly wiki: CivWiki
  readonly worldMapController: WorldMapController
  readonly worldBuilder: HTMLElement

  constructor(
    convex: ConvexConnection,
    authentication: ClerkAuthentication,
    onSelectWorld: (worldId: Id<'worlds'>) => void,
    onShowView: (view: AppView) => void,
  ) {
    const app = document.querySelector<HTMLDivElement>('#app')

    if (!app) {
      throw new Error('Application root element not found')
    }

    const editor = document.createElement('div')
    editor.className = 'editor'

    const content = document.createElement('main')
    content.className = 'editor-content'

    this.worldBuilder = document.createElement('section')
    this.worldBuilder.className = 'world-builder'
    this.worldBuilder.setAttribute('aria-label', 'World Builder')

    this.editorLayout = new EditorLayout()
    this.worldBuilder.append(this.editorLayout.element)

    this.worldMapController = new WorldMapController(
      convex.client,
      this.editorLayout.mapArea.mapGrid,
    )

    this.gallery = new WorldGallery((worldId) => {
      onSelectWorld(worldId)
    })

    this.visitors = new VisitorsLayout(authentication, convex.client)
    this.wiki = new CivWiki()

    this.header = new Header((view) => {
      onShowView(view)
    })

    content.append(
      this.gallery.element,
      this.worldBuilder,
      this.visitors.element,
      this.wiki.element,
    )

    editor.append(this.header.element, content)
    app.replaceChildren(editor)
  }
}
