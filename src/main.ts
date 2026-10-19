
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
    visitors.loginPage.setFantasyIdentity(null)
  }
}

async function refreshFantasyIdentity(): Promise<void> {
  const request = ++authenticationRequest
  const userId = authentication.getUserId()

  if (!userId) {
    visitors.loginPage.setFantasyIdentity(null)
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

    visitors.loginPage.setFantasyIdentity(user)

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
    visitors.loginPage.setFantasyIdentity(null)
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
