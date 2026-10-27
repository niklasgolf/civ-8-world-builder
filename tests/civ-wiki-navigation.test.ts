import { beforeEach, describe, expect, it, vi } from 'vitest'
import { WIKI_GROUPS } from '../src/application/wiki/catalog.ts'
import {
  CivWikiNavigation,
  type WikiPageId,
} from '../src/application/wiki/civ-wiki-navigation.ts'

describe('CivWikiNavigation', () => {
  let navigation: CivWikiNavigation
  let onSelect: (page: WikiPageId) => void

  const getButtons = (): HTMLButtonElement[] =>
    Array.from(navigation.element.querySelectorAll('button'))

  beforeEach(() => {
    document.body.innerHTML = ''
    onSelect = vi.fn<(page: WikiPageId) => void>()
    navigation = new CivWikiNavigation(onSelect)
    document.body.append(navigation.element)
  })

  it('creates a navigation element', () => {
    expect(navigation.element.tagName).toBe('NAV')
  })

  it('creates accessible navigation', () => {
    expect(navigation.element.getAttribute('aria-label')).toBe('Encyclopedia')
  })

  it('creates a Home button', () => {
    expect(getButtons()[0].textContent).toBe('Home')
  })

  it('creates a button for every wiki category', () => {
    const count = WIKI_GROUPS.reduce(
      (total, group) => total + group.categories.length,
      0,
    )

    expect(getButtons()).toHaveLength(count + 1)
  })

  it('preserves the category order', () => {
    const expected = [
      'Home',
      ...WIKI_GROUPS.flatMap(group =>
        group.categories.map(category => category.label),
      ),
    ]

    expect(getButtons().map(button => button.textContent)).toEqual(expected)
  })

  it('creates one labeled section for every category group', () => {
    const labels = Array.from(
      navigation.element.querySelectorAll('.civ-wiki__nav-label'),
    ).map(label => label.textContent)

    expect(labels).toEqual(WIKI_GROUPS.map(group => group.label))
  })

  it('creates buttons with the correct type and CSS class', () => {
    for (const button of getButtons()) {
      expect(button.type).toBe('button')
      expect(button.classList.contains('civ-wiki__nav-button')).toBe(true)
    }
  })

  it('invokes the callback when Home is clicked', () => {
    getButtons()[0].click()

    expect(onSelect).toHaveBeenCalledExactlyOnceWith('home')
  })

  it('invokes the callback with the correct category ID', () => {
    const category = WIKI_GROUPS[0].categories[0]
    getButtons()[1].click()

    expect(onSelect).toHaveBeenCalledExactlyOnceWith(category.id)
  })

  it('selects the requested page', () => {
    navigation.setSelected('home')

    const home = getButtons()[0]

    expect(home.classList.contains('is-selected')).toBe(true)
    expect(home.getAttribute('aria-pressed')).toBe('true')
  })

  it('keeps exactly one button selected', () => {
    const category = WIKI_GROUPS[0].categories[0]

    navigation.setSelected('home')
    navigation.setSelected(category.id)

    const selected = getButtons().filter(button =>
      button.classList.contains('is-selected'),
    )

    expect(selected).toHaveLength(1)
    expect(selected[0].textContent).toBe(category.label)
  })

  it('does not invoke the callback when selection changes programmatically', () => {
    navigation.setSelected('home')

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('creates independent navigation elements', () => {
    const other = new CivWikiNavigation(vi.fn())

    expect(other.element).not.toBe(navigation.element)
    expect(other.element.querySelector('button')).not.toBe(
      navigation.element.querySelector('button'),
    )
  })

  it('does not expose internal fields at runtime', () => {
    expect('buttons' in navigation).toBe(false)
    expect('onSelect' in navigation).toBe(false)
  })

  it('does not expose private building methods at runtime', () => {
    expect('createButton' in navigation).toBe(false)
    expect('createCategoryButton' in navigation).toBe(false)
  })

  it('does not expose private methods through the prototype', () => {
    const prototype = Object.getPrototypeOf(navigation)

    expect(Object.getOwnPropertyNames(prototype)).not.toContain('createButton')
    expect(Object.getOwnPropertyNames(prototype)).not.toContain(
      'createCategoryButton',
    )
  })

  it('protects private state from public property shadowing', () => {
    const category = WIKI_GROUPS[0].categories[0]

    Object.assign(navigation, {
      buttons: new Map(),
      onSelect: vi.fn(),
    })

    navigation.setSelected(category.id)

    expect(
      getButtons().filter(button =>
        button.classList.contains('is-selected'),
      ),
    ).toHaveLength(1)

    getButtons()[1].click()

    expect(onSelect).toHaveBeenCalledExactlyOnceWith(category.id)
  })
})