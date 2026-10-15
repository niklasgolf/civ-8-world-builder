
import './style.css'
import { Header, type AppView } from './application/editor/header.ts'
import { CivWiki } from './application/wiki/civ-wiki.ts'
import { EditorLayout } from './application/editor/editor-layout.ts'
import { WorldGallery, type GalleryWorld } from './application/gallery/world-gallery.ts'
import { ConvexConnection } from './application/database/convex-client.ts'
import { WorldMapController } from './application/map/world-map-controller.ts'
import { api } from '../convex/_generated/api.js'
import type { Id } from '../convex/_generated/dataModel.ts'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Application root element not found')
}

const convex = new ConvexConnection()

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

const visitorsLogin = document.createElement('section')
visitorsLogin.className = 'visitors-login'
visitorsLogin.setAttribute('aria-label', 'Visitors & Login')

const visitorsHeading = document.createElement('h1')
visitorsHeading.textContent = 'Visitors & Login'

const visitorsDescription = document.createElement('p')
visitorsDescription.textContent = 'Coming soon.'

visitorsLogin.append(visitorsHeading, visitorsDescription)

const wiki = new CivWiki()

const header = new Header((view) => {
  showView(view)
})

content.append(
  gallery.element,
  worldBuilder,
  visitorsLogin,
  wiki.element,
)

editor.append(header.element, content)
app.replaceChildren(editor)

let selectedWorldId: Id<'worlds'> | null = null
let worlds: GalleryWorld[] = []

showView('map-gallery')

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
    `Editor ${selectedWorld.number}`,
  )

  header.setWorldBuilderAvailable(true)
  worldMapController.selectWorld(worldId)

  showView('world-builder')
}

function showView(view: AppView): void {
  if (view === 'world-builder' && selectedWorldId === null) {
    view = 'map-gallery'
  }

  gallery.element.hidden = view !== 'map-gallery'
  worldBuilder.hidden = view !== 'world-builder'
  visitorsLogin.hidden = view !== 'visitors-login'
  wiki.element.hidden = view !== 'civ-wiki'

  header.setView(view)
}
