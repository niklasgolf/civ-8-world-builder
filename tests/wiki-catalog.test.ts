import { describe, expect, it } from 'vitest'
import {
  iconsFor,
  iconTitle,
  WIKI_GROUPS
} from '../src/application/wiki/catalog.ts'

describe('Wiki categories', () => {
  it('contains the two expected wiki groups', () => {
    expect(WIKI_GROUPS.map((group) => group.label)).toEqual([
      'Encyclopedia',
      'Editor Reference'
    ])
  })

  it('contains all eight categories', () => {
    const categories = WIKI_GROUPS.flatMap(
      (group) => group.categories.map((category) => category.id)
    )

    expect(categories).toEqual([
      'base-terrains',
      'terrain-features',
      'rivers-water',
      'resources',
      'improvements',
      'wonders',
      'continents',
      'builder-buttons'
    ])
  })

  it('contains no duplicate category IDs', () => {
    const categories = WIKI_GROUPS.flatMap(
      (group) => group.categories.map((category) => category.id)
    )

    expect(new Set(categories).size).toBe(categories.length)
  })
})

describe('Wiki icon catalog', () => {
  it('contains the expected base terrains', () => {
    expect(iconsFor('base-terrains')).toEqual([
      'grass',
      'plains',
      'desert',
      'tundra',
      'snow',
      'coast',
      'ocean'
    ])
  })

  it('contains the expected builder buttons', () => {
    expect(iconsFor('builder-buttons')).toEqual([
      'brush-small',
      'brush-medium',
      'brush-large',
      'undo',
      'redo'
    ])
  })

  it('contains the expected number of icons in each category', () => {
    const expectedCounts = {
      'base-terrains': 7,
      'terrain-features': 8,
      'rivers-water': 3,
      resources: 8,
      improvements: 8,
      wonders: 6,
      continents: 6,
      'builder-buttons': 5
    } as const

    for (const category of WIKI_GROUPS.flatMap(
      (group) => group.categories
    )) {
      expect(iconsFor(category.id)).toHaveLength(
        expectedCounts[category.id]
      )
    }
  })

  it('does not assign an icon to multiple categories', () => {
    const allIcons = WIKI_GROUPS.flatMap(
      (group) => group.categories.flatMap(
        (category) => iconsFor(category.id)
      )
    )

    expect(new Set(allIcons).size).toBe(allIcons.length)
  })

  it('contains 51 unique icons', () => {
    const allIcons = WIKI_GROUPS.flatMap(
      (group) => group.categories.flatMap(
        (category) => iconsFor(category.id)
      )
    )

    expect(allIcons).toHaveLength(51)
    expect(new Set(allIcons).size).toBe(51)
  })
})

describe('Wiki icon titles', () => {
  it('capitalizes a single-word icon name', () => {
    expect(iconTitle('grass')).toBe('Grass')
  })

  it('formats a hyphenated icon name', () => {
    expect(iconTitle('river-source')).toBe('River Source')
  })

  it('formats builder button names', () => {
    expect(iconTitle('brush-medium')).toBe('Brush Medium')
  })

  it('formats continent names', () => {
    expect(iconTitle('continent-crimson')).toBe('Continent Crimson')
  })
})