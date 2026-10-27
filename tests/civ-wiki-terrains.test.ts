
import { beforeEach, describe, expect, it } from 'vitest'
import { CivWikiTerrain } from '../src/application/wiki/civ-wiki-terrains.ts'

describe('CivWikiTerrain', () => {
  let wikiTerrain: CivWikiTerrain

  beforeEach(() => {
    document.body.innerHTML = ''
    wikiTerrain = new CivWikiTerrain()
  })

  it('creates a section element', () => {
    const section = wikiTerrain.createElement()

    expect(section.tagName).toBe('SECTION')
    expect(section.className).toBe('civ-wiki__section')
  })

  it('creates an accessible section heading', () => {
    const section = wikiTerrain.createElement()
    const heading = section.querySelector('h2')

    expect(heading?.id).toBe('civ-wiki-base-terrains')
    expect(heading?.textContent).toBe('Base terrains')
    expect(section.getAttribute('aria-labelledby'))
      .toBe('civ-wiki-base-terrains')
  })

  it('creates a table with three columns', () => {
    const section = wikiTerrain.createElement()
    const headings = Array.from(
      section.querySelectorAll('thead th'),
    ).map(cell => cell.textContent)

    expect(headings).toEqual([
      'Terrain',
      'Graphic',
      'Description',
    ])
  })

  it('creates all 17 terrain rows', () => {
    const section = wikiTerrain.createElement()

    expect(section.querySelectorAll('tbody tr')).toHaveLength(17)
  })

  it('preserves the expected terrain order', () => {
    const section = wikiTerrain.createElement()
    const names = Array.from(
      section.querySelectorAll('tbody th'),
    ).map(cell => cell.textContent)

    expect(names).toEqual([
      'Ocean',
      'Coast',
      'Grass — Flat',
      'Grass — Hills',
      'Grass — Mountains',
      'Plains — Flat',
      'Plains — Hills',
      'Plains — Mountains',
      'Desert — Flat',
      'Desert — Hills',
      'Desert — Mountains',
      'Tundra — Flat',
      'Tundra — Hills',
      'Tundra — Mountains',
      'Snow — Flat',
      'Snow — Hills',
      'Snow — Mountains',
    ])
  })

  it('uses row headers for terrain names', () => {
    const section = wikiTerrain.createElement()
    const names = section.querySelectorAll('tbody th')

    expect(names).toHaveLength(17)

    for (const name of names) {
      expect(name.getAttribute('scope')).toBe('row')
      expect(name.className).toBe('civ-wiki__name')
    }
  })

  it('creates one SVG graphic per terrain', () => {
    const section = wikiTerrain.createElement()
    const graphics = section.querySelectorAll(
      'tbody svg.civ-wiki__graphic',
    )

    expect(graphics).toHaveLength(17)
  })

  it('includes a description for every terrain', () => {
    const section = wikiTerrain.createElement()
    const rows = section.querySelectorAll('tbody tr')

    for (const row of rows) {
      const description = row.querySelectorAll('td')[1]

      expect(description?.textContent?.trim().length)
        .toBeGreaterThan(0)
    }
  })

  it('creates the correct structure for every terrain row', () => {
    const section = wikiTerrain.createElement()
    const rows = section.querySelectorAll('tbody tr')

    for (const row of rows) {
      expect(row.children).toHaveLength(3)
      expect(row.children[0]?.tagName).toBe('TH')
      expect(row.children[1]?.tagName).toBe('TD')
      expect(row.children[2]?.tagName).toBe('TD')
    }
  })

  it('sets the SVG aspect ratio from its viewBox', () => {
    const section = wikiTerrain.createElement()
    const graphics = section.querySelectorAll<SVGSVGElement>(
      'svg.civ-wiki__graphic',
    )

    for (const graphic of graphics) {
      const viewBox = graphic.getAttribute('viewBox')

      expect(viewBox).not.toBeNull()

      const parts = viewBox!.split(/[\s,]+/).map(Number)
      const width = parts[2]
      const height = parts[3]

      expect(width).toBeGreaterThan(0)
      expect(height).toBeGreaterThan(0)
      expect(graphic.style.aspectRatio)
        .toBe(`${width} / ${height}`)
    }
  })

  it('creates independent sections on each call', () => {
    const first = wikiTerrain.createElement()
    const second = wikiTerrain.createElement()

    expect(first).not.toBe(second)
    expect(first.querySelectorAll('tbody tr')).toHaveLength(17)
    expect(second.querySelectorAll('tbody tr')).toHaveLength(17)
    expect(first.querySelector('svg'))
      .not.toBe(second.querySelector('svg'))
  })

  it('does not expose private building methods at runtime', () => {
    const instance = wikiTerrain as unknown as Record<string, unknown>

    expect(instance.createTerrainRow).toBeUndefined()
    expect(instance.createGraphic).toBeUndefined()
    expect(instance['#createTerrainRow']).toBeUndefined()
    expect(instance['#createGraphic']).toBeUndefined()
  })

  it('does not expose private methods through the prototype', () => {
    const prototype = Object.getPrototypeOf(wikiTerrain)
    const methods = Object.getOwnPropertyNames(prototype)

    expect(methods).not.toContain('createTerrainRow')
    expect(methods).not.toContain('createGraphic')
    expect(methods).not.toContain('#createTerrainRow')
    expect(methods).not.toContain('#createGraphic')
  })

  it('protects private building methods from public property shadowing', () => {
    const instance = wikiTerrain as unknown as Record<string, unknown>

    instance.createTerrainRow = () => {
      throw new Error('Public createTerrainRow was called')
    }

    instance.createGraphic = () => {
      throw new Error('Public createGraphic was called')
    }

    const section = wikiTerrain.createElement()

    expect(section.querySelectorAll('tbody tr')).toHaveLength(17)
    expect(section.querySelectorAll('svg.civ-wiki__graphic'))
      .toHaveLength(17)
  })
})
