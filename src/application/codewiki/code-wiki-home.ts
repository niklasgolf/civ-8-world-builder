import { renderMarkdown } from './code-wiki-markdown.ts'
import { codeWikiStats, getCodeWikiDocument } from './documentation.ts'

export class CodeWikiHome {
  createElement(): HTMLElement {
    const documentData = getCodeWikiDocument()
    const stats = codeWikiStats(documentData)

    const section = document.createElement('section')
    section.className = 'civ-wiki__section code-wiki__home'

    const heading = document.createElement('h2')
    heading.className = 'civ-wiki__heading'
    heading.id = 'code-wiki-home'
    heading.textContent = 'Welcome to Code Wiki'
    section.setAttribute('aria-labelledby', heading.id)

    const introduction = document.createElement('p')
    introduction.textContent =
      'The Code Wiki documents the Civilization of Wonders source code. ' +
      'Choose a file in the directory tree to read its functions and methods. ' +
      'Each page keeps the original explanation, source path, and line number.'

    const summary = document.createElement('div')
    summary.className = 'code-wiki__stats'

    summary.append(
      statCard('Source files', stats.files),
      statCard('Functions and methods', stats.functions),
      statCard('Directories', stats.directories),
    )

    section.append(heading, introduction, summary)

    for (const note of documentData.homeNotes) {
      const noteSection = document.createElement('section')
      noteSection.className = 'code-wiki__home-note'
      const noteHeading = document.createElement('h3')
      noteHeading.className = 'civ-wiki__subheading'
      noteHeading.textContent = 'Handbook scope'
      const body = document.createElement('div')
      body.className = 'code-wiki__prose'
      renderMarkdown(note.text, body)
      noteSection.append(noteHeading, body)
      section.append(noteSection)
    }

    if (documentData.partGuides.length > 0) {
      const areas = document.createElement('section')
      areas.className = 'code-wiki__areas'
      const areasHeading = document.createElement('h3')
      areasHeading.className = 'civ-wiki__subheading'
      areasHeading.textContent = 'Areas described in the handbook'
      areas.append(areasHeading)

      for (const guide of documentData.partGuides) {
        const body = document.createElement('div')
        body.className = 'code-wiki__prose code-wiki__area'
        renderMarkdown(guide, body)
        areas.append(body)
      }

      section.append(areas)
    }

    if (documentData.concepts.length > 0) {
      const concepts = document.createElement('section')
      concepts.className = 'code-wiki__concepts'
      const conceptsHeading = document.createElement('h3')
      conceptsHeading.className = 'civ-wiki__subheading'
      conceptsHeading.textContent = 'Concepts recorded in the handbook'
      concepts.append(conceptsHeading)

      for (const concept of documentData.concepts) {
        const conceptSection = document.createElement('section')
        conceptSection.className = 'code-wiki__concept'
        const conceptHeading = document.createElement('h4')
        conceptHeading.className = 'code-wiki__markdown-heading'
        conceptHeading.textContent = concept.title
        const body = document.createElement('div')
        body.className = 'code-wiki__prose'
        renderMarkdown(concept.text, body)
        conceptSection.append(conceptHeading, body)
        concepts.append(conceptSection)
      }

      section.append(concepts)
    }

    return section
  }
}

function statCard(label: string, value: number): HTMLElement {
  const card = document.createElement('div')
  card.className = 'code-wiki__stat'

  const number = document.createElement('p')
  number.className = 'code-wiki__stat-value'
  number.textContent = String(value)

  const caption = document.createElement('p')
  caption.className = 'code-wiki__stat-label'
  caption.textContent = label

  card.append(number, caption)
  return card
}
