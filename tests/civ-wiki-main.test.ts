import { beforeEach, describe, expect, it } from 'vitest'
import { WIKI_GROUPS } from '../src/application/wiki/catalog.ts'
import { CivWikiMain } from '../src/application/wiki/civ-wiki-main.ts'

describe('CivWikiMain', () => {
  let wiki: CivWikiMain

  const getPanels = (): HTMLElement[] =>
    Array.from(wiki.element.querySelectorAll('.civ-wiki__panel'))

  const getButtons = (): HTMLButtonElement[] =>
    Array.from(wiki.element.querySelectorAll('.civ-wiki__nav-button'))

  beforeEach(() => {
    document.body.innerHTML = ''
    wiki = new CivWikiMain()
    document.body.append(wiki.element)
  })

  it('creates a wiki section', () => {
    expect(wiki.element.tagName).toBe('SECTION')
    expect(wiki.element.classList.contains('civ-wiki')).toBe(true)
  })

  it('creates an accessible wiki section', () => {
    expect(wiki.element.getAttribute('aria-label')).toBe(
      'Civilization of Wonders Wiki',
    )
  })

  it('displays the wiki title', () => {
    expect(wiki.element.querySelector('h1')?.textContent).toBe(
      'Civilization of Wonders Wiki',
    )
  })

  it('displays the wiki subtitle', () => {
    expect(wiki.element.querySelector('.civ-wiki__subtitle')?.textContent).toBe(
      'Terrain encyclopedia and SVG graphics gallery',
    )
  })

  it('creates the wiki navigation', () => {
    expect(wiki.element.querySelector('nav')).not.toBeNull()
  })

  it('creates a panel for Home and every category', () => {
    const categoryCount = WIKI_GROUPS.reduce(
      (total, group) => total + group.categories.length,
      0,
    )

    expect(getPanels()).toHaveLength(categoryCount + 1)
  })

  it('initially displays only the Home panel', () => {
    const visible = getPanels().filter(panel => !panel.hidden)

    expect(visible).toHaveLength(1)
    expect(visible[0]).toBe(getPanels()[0])
  })

  it('initially selects the Home navigation button', () => {
    expect(getButtons()[0].classList.contains('is-selected')).toBe(true)
  })

  it('displays the selected category panel when clicked', () => {
    getButtons()[1].click()

    const visible = getPanels().filter(panel => !panel.hidden)

    expect(visible).toHaveLength(1)
    expect(visible[0]).toBe(getPanels()[1])
  })

  it('hides the Home panel when a category is selected', () => {
    getButtons()[1].click()

    expect(getPanels()[0].hidden).toBe(true)
  })

  it('returns to Home when its button is clicked', () => {
    getButtons()[1].click()
    getButtons()[0].click()

    expect(getPanels()[0].hidden).toBe(false)
    expect(getPanels().filter(panel => !panel.hidden)).toHaveLength(1)
  })

  it('keeps navigation selection synchronized with the visible panel', () => {
    getButtons()[1].click()

    expect(getButtons()[1].getAttribute('aria-pressed')).toBe('true')
    expect(getButtons()[0].getAttribute('aria-pressed')).toBe('false')
  })

  it('creates the terrain content in the base terrain panel', () => {
    const categoryIndex = WIKI_GROUPS
      .flatMap(group => group.categories)
      .findIndex(category => category.id === 'base-terrains')

    expect(categoryIndex).toBeGreaterThanOrEqual(0)

    const panel = getPanels()[categoryIndex + 1]

    expect(panel.querySelector('table')).not.toBeNull()
  })

  it('creates independent wiki elements', () => {
    const other = new CivWikiMain()

    expect(other.element).not.toBe(wiki.element)
    expect(other.element.querySelector('nav')).not.toBe(
      wiki.element.querySelector('nav'),
    )
  })

  it('does not expose internal component fields at runtime', () => {
    for (const field of ['navigation', 'panels', 'home', 'icons', 'terrain']) {
      expect(field in wiki).toBe(false)
    }
  })

  it('does not expose private building methods at runtime', () => {
    for (const method of [
      'createIntro',
      'createContent',
      'createTerrainPanel',
      'createCategoryPanel',
      'showPage',
    ]) {
      expect(method in wiki).toBe(false)
    }
  })

  it('does not expose private methods through the prototype', () => {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(wiki),
    )

    expect(methods).not.toContain('showPage')
    expect(methods).not.toContain('createContent')
    expect(methods).not.toContain('createCategoryPanel')
  })

  it('protects private state from public property shadowing', () => {
    Object.assign(wiki, {
      navigation: null,
      panels: new Map(),
      showPage: () => { },
    })

    getButtons()[1].click()

    expect(getPanels()[1].hidden).toBe(false)
    expect(getPanels()[0].hidden).toBe(true)
  })
})