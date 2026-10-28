import { describe, expect, it } from 'vitest'
import { LeftPanel } from '../src/application/editor/left-panel.ts'

const TERRAINS = [
  { id: 'grass', label: 'Grass' },
  { id: 'plains', label: 'Plains' },
  { id: 'desert', label: 'Desert' },
  { id: 'tundra', label: 'Tundra' },
  { id: 'snow', label: 'Snow' },
  { id: 'grass-hills', label: 'Grass Hills' },
  { id: 'plains-hills', label: 'Plains Hills' },
  { id: 'desert-hills', label: 'Desert Hills' },
  { id: 'tundra-hills', label: 'Tundra Hills' },
  { id: 'snow-hills', label: 'Snow Hills' },
  { id: 'grass-mountains', label: 'Grass Mountains' },
  { id: 'plains-mountains', label: 'Plains Mountains' },
  { id: 'desert-mountains', label: 'Desert Mountains' },
  { id: 'tundra-mountains', label: 'Tundra Mountains' },
  { id: 'snow-mountains', label: 'Snow Mountains' },
  { id: 'coast', label: 'Coast' },
  { id: 'ocean', label: 'Ocean' }
]

function getTerrainButton(
  panel: LeftPanel,
  label: string
): HTMLButtonElement {
  const button = Array.from(
    panel.scroll.querySelectorAll('button')
  ).find(button => button.getAttribute('aria-label') === label)

  if (!button) {
    throw new Error(`Terrain button not found: ${label}`)
  }

  return button
}

describe('LeftPanel — existing behavior', () => {
  it('creates the panel and scroll container', () => {
    const panel = new LeftPanel()

    expect(panel.element).toBeInstanceOf(HTMLDivElement)
    expect(panel.element.className).toBe('editor-layout__left-panel')
    expect(panel.scroll).toBeInstanceOf(HTMLDivElement)
    expect(panel.scroll.className).toBe('tool-panel__scroll')
    expect(panel.element.contains(panel.scroll)).toBe(true)
  })

  it('shows and updates the world title', () => {
    const panel = new LeftPanel()
    const heading = panel.element.querySelector('h2')

    expect(heading?.textContent).toBe('Unedited Map')

    panel.setWorldTitle('World Alpha')
    expect(heading?.textContent).toBe('World Alpha')

    panel.setWorldTitle('World Beta')
    expect(heading?.textContent).toBe('World Beta')
  })

  it('selects grass by default', () => {
    const panel = new LeftPanel()

    expect(panel.getSelectedTerrain()).toBe('grass')

    const grass = getTerrainButton(panel, 'Grass')

    expect(grass.classList.contains('is-selected')).toBe(true)
    expect(grass.getAttribute('aria-pressed')).toBe('true')
  })

  it('creates all five tool sections in the correct order', () => {
    const panel = new LeftPanel()

    const headings = Array.from(
      panel.scroll.querySelectorAll('h2, h3')
    ).map(heading => heading.textContent)

    expect(headings).toEqual([
      'Brush',
      'Terrain',
      'Features',
      'Resources',
      'Rivers'
    ])
  })

  it('creates exactly 17 terrain buttons', () => {
    const panel = new LeftPanel()

    const terrainButtons = Array.from(
      panel.scroll.querySelectorAll('button')
    ).filter(button =>
      TERRAINS.some(terrain =>
        terrain.label === button.getAttribute('aria-label')
      )
    )

    expect(terrainButtons).toHaveLength(17)

    for (const terrain of TERRAINS) {
      const button = getTerrainButton(panel, terrain.label)

      expect(button.title).toBe(terrain.label)
      expect(button.querySelector('svg')).not.toBeNull()
    }
  })

  it('selects all 17 terrain alternatives when clicked', () => {
    const panel = new LeftPanel()

    for (const terrain of TERRAINS) {
      const button = getTerrainButton(panel, terrain.label)

      button.click()

      expect(panel.getSelectedTerrain()).toBe(terrain.id)
    }
  })

  it('preserves the public panel API', () => {
    const panel = new LeftPanel()

    expect(typeof panel.getSelectedTerrain).toBe('function')
    expect(typeof panel.setWorldTitle).toBe('function')
  })
})

describe('LeftPanel — encapsulation', () => {
  it('does not expose internal fields as own properties', () => {
    const panel = new LeftPanel()
    const ownProperties = Object.getOwnPropertyNames(panel)

    expect(ownProperties).not.toContain('element')
    expect(ownProperties).not.toContain('scroll')
    expect(ownProperties).not.toContain('heading')
    expect(ownProperties).not.toContain('selectedTerrain')
  })

  it('exposes element and scroll through read-only getters', () => {
    const panel = new LeftPanel()

    const elementDescriptor = Object.getOwnPropertyDescriptor(
      LeftPanel.prototype,
      'element'
    )
    const scrollDescriptor = Object.getOwnPropertyDescriptor(
      LeftPanel.prototype,
      'scroll'
    )

    expect(typeof elementDescriptor?.get).toBe('function')
    expect(elementDescriptor?.set).toBeUndefined()

    expect(typeof scrollDescriptor?.get).toBe('function')
    expect(scrollDescriptor?.set).toBeUndefined()

    expect(panel.element).toBe(panel.element)
    expect(panel.scroll).toBe(panel.scroll)
    expect(panel.element.contains(panel.scroll)).toBe(true)
  })

  it('does not expose heading or selectedTerrain as public properties', () => {
    const panel = new LeftPanel()

    expect('heading' in panel).toBe(false)
    expect('selectedTerrain' in panel).toBe(false)

    expect(panel.getSelectedTerrain()).toBe('grass')
    expect(panel.element.querySelector('h2')?.textContent).toBe(
      'Unedited Map'
    )
  })

  it('keeps internal terrain state independent of similarly named properties', () => {
    const panel = new LeftPanel()

    const externalView = panel as unknown as Record<string, unknown>
    externalView.selectedTerrain = 'desert'

    expect(panel.getSelectedTerrain()).toBe('grass')

    getTerrainButton(panel, 'Ocean').click()

    expect(panel.getSelectedTerrain()).toBe('ocean')
    expect(externalView.selectedTerrain).toBe('desert')
  })
})