
import { beforeEach, describe, expect, it } from 'vitest'
import { CivWikiIcons } from '../src/application/wiki/civ-wiki-icons.ts'
import { iconsFor, iconTitle } from '../src/application/wiki/catalog.ts'

describe('CivWikiIcons', () => {
  let wikiIcons: CivWikiIcons

  beforeEach(() => {
    document.body.innerHTML = ''
    wikiIcons = new CivWikiIcons()
  })

  it('creates a grid element', () => {
    const grid = wikiIcons.createGrid([])

    expect(grid.tagName).toBe('DIV')
    expect(grid.className).toBe('civ-wiki__grid')
  })

  it('creates an empty grid for an empty list', () => {
    const grid = wikiIcons.createGrid([])

    expect(grid.children).toHaveLength(0)
  })

  it('creates one card for each icon', () => {
    const names = iconsFor('base-terrains')
    const grid = wikiIcons.createGrid(names)

    expect(grid.children).toHaveLength(names.length)
  })

  it('preserves the supplied icon order', () => {
    const names = iconsFor('base-terrains')
    const grid = wikiIcons.createGrid(names)

    const identifiers = Array.from(
      grid.querySelectorAll('.civ-wiki__card-id'),
    ).map(element => element.textContent)

    expect(identifiers).toEqual([...names])
  })

  it('creates the correct card structure', () => {
    const name = iconsFor('base-terrains')[0]
    expect(name).toBeDefined()
    if (!name) return

    const grid = wikiIcons.createGrid([name])
    const card = grid.firstElementChild

    expect(card?.tagName).toBe('ARTICLE')
    expect(card?.className).toBe('civ-wiki__card')
    expect(card?.querySelector('.civ-wiki__card-art')).not.toBeNull()
    expect(card?.querySelector('h3.civ-wiki__card-name')?.textContent)
      .toBe(iconTitle(name))
    expect(card?.querySelector('p.civ-wiki__card-id')?.textContent)
      .toBe(name)
  })

  it('creates an SVG icon inside each card', () => {
    const names = iconsFor('base-terrains')
    const grid = wikiIcons.createGrid(names)

    const icons = grid.querySelectorAll('svg.civ-wiki__icon')

    expect(icons).toHaveLength(names.length)
  })

  it('creates independent grids on each call', () => {
    const names = iconsFor('base-terrains')
    const first = wikiIcons.createGrid(names)
    const second = wikiIcons.createGrid(names)

    const firstIdentifiers = Array.from(
      first.querySelectorAll('.civ-wiki__card-id'),
    ).map(element => element.textContent)

    const secondIdentifiers = Array.from(
      second.querySelectorAll('.civ-wiki__card-id'),
    ).map(element => element.textContent)

    expect(first).not.toBe(second)
    expect(firstIdentifiers).toEqual([...names])
    expect(secondIdentifiers).toEqual(firstIdentifiers)

    expect(first.querySelectorAll('svg.civ-wiki__icon'))
      .toHaveLength(names.length)
    expect(second.querySelectorAll('svg.civ-wiki__icon'))
      .toHaveLength(names.length)

    expect(first.firstElementChild)
      .not.toBe(second.firstElementChild)
  })

  it('creates the terrain icon section', () => {
    const section = wikiIcons.createTerrainIcons()

    expect(section.tagName).toBe('SECTION')
    expect(section.className).toBe('civ-wiki__icon-section')
  })

  it('creates an accessible terrain icon heading', () => {
    const section = wikiIcons.createTerrainIcons()
    const heading = section.querySelector('h3.civ-wiki__subheading')

    expect(heading?.id).toBe('civ-wiki-terrain-icons')
    expect(heading?.textContent).toBe('Terrain toolbar icons')
    expect(section.getAttribute('aria-labelledby'))
      .toBe('civ-wiki-terrain-icons')
  })

  it('explains the difference between icons and terrain graphics', () => {
    const section = wikiIcons.createTerrainIcons()
    const note = section.querySelector('p.civ-wiki__note')

    expect(note?.textContent).toContain('24 × 24 toolbar icons')
    expect(note?.textContent).toContain('full-sized terrain graphics')
  })

  it('includes all base terrain icons in the section', () => {
    const section = wikiIcons.createTerrainIcons()
    const names = iconsFor('base-terrains')

    expect(section.querySelectorAll('.civ-wiki__card'))
      .toHaveLength(names.length)
  })

  it('creates independent terrain icon sections', () => {
    const first = wikiIcons.createTerrainIcons()
    const second = wikiIcons.createTerrainIcons()

    const firstIdentifiers = Array.from(
      first.querySelectorAll('.civ-wiki__card-id'),
    ).map(element => element.textContent)

    const secondIdentifiers = Array.from(
      second.querySelectorAll('.civ-wiki__card-id'),
    ).map(element => element.textContent)

    expect(first).not.toBe(second)
    expect(firstIdentifiers).toEqual(secondIdentifiers)
    expect(firstIdentifiers).toEqual([...iconsFor('base-terrains')])

    expect(first.querySelectorAll('svg.civ-wiki__icon'))
      .toHaveLength(firstIdentifiers.length)
    expect(second.querySelectorAll('svg.civ-wiki__icon'))
      .toHaveLength(secondIdentifiers.length)

    expect(first.firstElementChild)
      .not.toBe(second.firstElementChild)
  })

  it('does not expose its private building method at runtime', () => {
    const instance = wikiIcons as unknown as Record<string, unknown>

    expect(instance.createCard).toBeUndefined()
    expect(instance['#createCard']).toBeUndefined()
    expect(Object.keys(wikiIcons)).not.toContain('createCard')
  })

  it('does not expose its private building method through the prototype', () => {
    const prototype = Object.getPrototypeOf(wikiIcons)

    expect(Object.getOwnPropertyNames(prototype))
      .not.toContain('createCard')
    expect(Object.getOwnPropertyNames(prototype))
      .not.toContain('#createCard')
  })

  it('protects private card creation from public property shadowing', () => {
    const name = iconsFor('base-terrains')[0]
    expect(name).toBeDefined()
    if (!name) return

    const instance = wikiIcons as unknown as Record<string, unknown>
    const fakeCard = document.createElement('aside')

    instance.createCard = () => fakeCard

    const grid = wikiIcons.createGrid([name])
    const card = grid.firstElementChild

    expect(card?.tagName).toBe('ARTICLE')
    expect(card).not.toBe(fakeCard)
    expect(card?.querySelector('.civ-wiki__card-id')?.textContent)
      .toBe(name)
  })
})
