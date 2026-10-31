import { codeWikiHash } from './code-wiki-target.ts'
import { renderMarkdown } from './code-wiki-markdown.ts'
import type { CodeWikiFile } from './documentation-types.ts'

export function renderCodeWikiFile(
  file: CodeWikiFile,
  onAnchor: (anchor: string) => void,
): HTMLElement {
  const page = document.createElement('article')
  page.className = 'code-wiki__document'

  const heading = document.createElement('h2')
  heading.className = 'civ-wiki__heading'
  heading.textContent = fileName(file.path)

  const path = document.createElement('p')
  path.className = 'code-wiki__path'
  path.textContent = file.path

  page.append(heading, path)

  const headingId = `code-wiki-file-${file.path.replace(/[^a-zA-Z0-9]+/g, '-')}`
  heading.id = headingId
  page.setAttribute('aria-labelledby', headingId)

  for (const block of file.blocks) {
    if (block.kind === 'prose') {
      const prose = document.createElement('div')
      prose.className = 'code-wiki__prose'
      renderMarkdown(block.text, prose)
      page.append(prose)
      continue
    }

    const section = document.createElement('section')
    section.className = 'code-wiki__function'
    section.dataset.anchor = block.anchor

    const functionHeading = document.createElement('h3')
    functionHeading.className = 'code-wiki__function-heading'
    functionHeading.id = `cw-${file.path.replace(/[^a-zA-Z0-9]+/g, '-')}-${block.anchor}`

    const permalink = document.createElement('a')
    permalink.className = 'code-wiki__permalink'
    permalink.href = codeWikiHash(file.path, block.anchor)
    permalink.textContent = '#'
    permalink.setAttribute('aria-label', `Link to ${block.name}`)
    permalink.addEventListener('click', (event) => {
      event.preventDefault()
      onAnchor(block.anchor)
    })

    const name = document.createElement('span')
    name.className = 'code-wiki__function-name'
    name.textContent = block.name

    const line = document.createElement('span')
    line.className = 'code-wiki__line'
    line.textContent = `Line ${block.line}`

    functionHeading.append(permalink, name, line)

    const body = document.createElement('div')
    body.className = 'code-wiki__prose'
    renderMarkdown(block.text, body)

    section.append(functionHeading, body)
    section.setAttribute('aria-labelledby', functionHeading.id)
    page.append(section)
  }

  if (file.notes.length > 0) {
    const notes = document.createElement('section')
    notes.className = 'code-wiki__notes'

    const notesHeading = document.createElement('h3')
    notesHeading.className = 'civ-wiki__subheading'
    notesHeading.textContent = 'Architectural notes'
    notes.append(notesHeading)

    for (const note of file.notes) {
      const body = document.createElement('div')
      body.className = 'code-wiki__prose'
      renderMarkdown(note, body)
      notes.append(body)
    }

    page.append(notes)
  }

  return page
}

function fileName(path: string): string {
  return path.split('/').at(-1) ?? path
}
