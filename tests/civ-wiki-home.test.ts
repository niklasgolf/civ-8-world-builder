
import { beforeEach, describe, expect, it } from 'vitest'
import { CivWikiHome } from '../src/application/wiki/civ-wiki-home.ts'

describe('CivWikiHome', () => {
  let home: CivWikiHome
  let section: HTMLElement

  beforeEach(() => {
    home = new CivWikiHome()
    section = home.createElement()
  })

  it('creates a section element', () => {
    expect(section.tagName).toBe('SECTION')
    expect(section.className).toBe('civ-wiki__section')
  })

  it('creates an accessible section heading', () => {
    const heading = section.querySelector('h2')

    expect(heading?.id).toBe('civ-wiki-home')
    expect(section.getAttribute('aria-labelledby')).toBe('civ-wiki-home')
  })

  it('displays the welcome title', () => {
    expect(section.querySelector('h2')?.textContent)
      .toBe('Welcome to Civilization of Wonders')
  })

  it('displays the introduction', () => {
    expect(section.querySelector('p')?.textContent)
      .toContain('Civilization of Wonders Wiki')
  })

  it('creates all three subsection headings', () => {
    const headings = Array.from(section.querySelectorAll('h3'))
      .map(heading => heading.textContent)

    expect(headings).toEqual([
      'Explore the world',
      'The encyclopedia',
      'Terrain graphics',
    ])
  })

  it('creates four paragraphs', () => {
    expect(section.querySelectorAll('p')).toHaveLength(4)
  })

  it('describes the world terrain', () => {
    expect(section.textContent).toContain('grasslands')
    expect(section.textContent).toContain('mountain peaks')
  })

  it('explains wiki navigation', () => {
    expect(section.textContent).toContain('navigation menu')
  })

  it('introduces the terrain graphics', () => {
    expect(section.textContent).toContain('Base Terrains')
    expect(section.textContent).toContain('SVG terrain graphics')
  })

  it('creates independent elements on each call', () => {
    const anotherSection = home.createElement()

    expect(anotherSection).not.toBe(section)
    expect(anotherSection.outerHTML).toBe(section.outerHTML)
  })
})
