import './style.css'
import { Header, type AppView } from './application/editor/header.ts'
import { CivWiki } from './application/wiki/civ-wiki.ts'
import { EditorLayout } from './application/editor/editor-layout.ts'
import { ConvexConnection } from './application/database/convex-client.ts'

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

const wiki = new CivWiki()

const header = new Header((view) => {
  showView(view)
})

content.append(worldBuilder, wiki.element)
editor.append(header.element, content)
app.replaceChildren(editor)

showView('world-builder')

function showView(view: AppView): void {
  worldBuilder.hidden = view !== 'world-builder'
  wiki.element.hidden = view !== 'civ-wiki'
  header.setView(view)
}

void convex