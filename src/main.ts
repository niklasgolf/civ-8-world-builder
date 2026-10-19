
import './style-main.css'
import './style-map-gallery.css'
import './style-world-builder.css'
import './style-visitors-and-login.css'
import './style-civ-wiki.css'

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

const visitors = new VisitorsLayout()
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

showView('map-gallery')

void authentication.initialize()
  .then(() => {
    convex.connectAuthentication(authentication)
    console.log('Clerk authentication connected to Convex')
  })
  .catch((error: unknown) => {
    console.error('Failed to initialize Clerk authentication:', error)
  })

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
