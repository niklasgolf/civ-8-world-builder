
import { describe, expect, it, vi } from 'vitest'
import { TerrainButton } from '../src/application/editor/terrain-button.ts'
import { ToolButton } from '../src/application/editor/tool-button.ts'

function createTerrainGraphic(): SVGSVGElement {
  return document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )
}

describe('TerrainButton', () => {
  it('inherits from ToolButton', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    expect(button).toBeInstanceOf(ToolButton)
    expect(button).toBeInstanceOf(TerrainButton)
  })

  it('preserves its public identity', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    expect(button.id).toBe('grass')
    expect(button.group).toBe('terrain')
  })

  it('creates a standard tool button element', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    expect(button.element).toBeInstanceOf(HTMLButtonElement)
    expect(button.element.classList.contains('tool-button')).toBe(true)
    expect(button.element.type).toBe('button')
  })

  it('uses the supplied SVG graphic', () => {
    const graphic = createTerrainGraphic()
    const factory = vi.fn(() => graphic)

    const button = new TerrainButton('grass', 'Grass', factory)

    expect(factory).toHaveBeenCalledOnce()
    expect(button.element.querySelector('svg')).toBe(graphic)
  })

  it('adds the tool-icon class to the supplied SVG', () => {
    const graphic = createTerrainGraphic()

    new TerrainButton('grass', 'Grass', () => graphic)

    expect(graphic.classList.contains('tool-icon')).toBe(true)
  })

  it('replaces the inherited SVG instead of duplicating it', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    expect(button.element.querySelectorAll('svg')).toHaveLength(1)
  })

  it('preserves the accessible label', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    expect(button.element.title).toBe('Grass')
    expect(button.element.getAttribute('aria-label')).toBe('Grass')
  })

  it('supports inherited selection behavior', () => {
    const button = new TerrainButton(
      'grass',
      'Grass',
      createTerrainGraphic
    )

    button.setSelected(true)

    expect(button.element.classList.contains('is-selected')).toBe(true)
    expect(button.element.getAttribute('aria-pressed')).toBe('true')

    button.setSelected(false)

    expect(button.element.classList.contains('is-selected')).toBe(false)
    expect(button.element.getAttribute('aria-pressed')).toBe('false')
  })
})
