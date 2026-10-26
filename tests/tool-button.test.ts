
import { describe, expect, it } from 'vitest'
import { ToolButton } from '../src/application/editor/tool-button.ts'

describe('ToolButton', () => {
  it('creates a button element', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    expect(button.element).toBeInstanceOf(HTMLButtonElement)
    expect(button.element.type).toBe('button')
    expect(button.element.classList.contains('tool-button')).toBe(true)
  })

  it('stores its public identity', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    expect(button.id).toBe('grass')
    expect(button.group).toBe('terrain')
  })

  it('supports buttons without a group', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    expect(button.group).toBeUndefined()
    expect(button.element.hasAttribute('aria-pressed')).toBe(false)
  })

  it('sets the title and accessible label', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    expect(button.element.title).toBe('Grass')
    expect(button.element.getAttribute('aria-label')).toBe('Grass')
  })

  it('creates an SVG icon', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    const svg = button.element.querySelector('svg')

    expect(svg).not.toBeNull()
    expect(svg?.classList.contains('tool-icon')).toBe(true)
  })

  it('initializes grouped buttons as not pressed', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    expect(button.element.getAttribute('aria-pressed')).toBe('false')
    expect(button.element.classList.contains('is-selected')).toBe(false)
  })

  it('selects a grouped button', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    button.setSelected(true)

    expect(button.element.classList.contains('is-selected')).toBe(true)
    expect(button.element.getAttribute('aria-pressed')).toBe('true')
  })

  it('deselects a grouped button', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    button.setSelected(true)
    button.setSelected(false)

    expect(button.element.classList.contains('is-selected')).toBe(false)
    expect(button.element.getAttribute('aria-pressed')).toBe('false')
  })

  it('selects ungrouped buttons without adding aria-pressed', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    button.setSelected(true)

    expect(button.element.classList.contains('is-selected')).toBe(true)
    expect(button.element.hasAttribute('aria-pressed')).toBe(false)
  })

  it('does not create duplicate SVG icons when selection changes', () => {
    const button = new ToolButton('grass', 'Grass', 'grass')

    button.setSelected(true)
    button.setSelected(false)
    button.setSelected(true)

    expect(button.element.querySelectorAll('svg')).toHaveLength(1)
  })

  it('hides its internal fields at runtime', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    expect(Object.hasOwn(button, 'id')).toBe(false)
    expect(Object.hasOwn(button, 'group')).toBe(false)

    expect(Reflect.ownKeys(button)).not.toContain('#id')
    expect(Reflect.ownKeys(button)).not.toContain('#group')
  })

  it('exposes identity through read-only getters', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    const idDescriptor = Object.getOwnPropertyDescriptor(
      ToolButton.prototype,
      'id'
    )

    const groupDescriptor = Object.getOwnPropertyDescriptor(
      ToolButton.prototype,
      'group'
    )

    expect(typeof idDescriptor?.get).toBe('function')
    expect(idDescriptor?.set).toBeUndefined()

    expect(typeof groupDescriptor?.get).toBe('function')
    expect(groupDescriptor?.set).toBeUndefined()

    expect(button.id).toBe('grass')
    expect(button.group).toBe('terrain')
  })

  it('protects private values from public property shadowing', () => {
    const button = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )

    Object.defineProperty(button, 'id', {
      value: 'desert',
      configurable: true
    })

    Object.defineProperty(button, 'group', {
      value: 'other',
      configurable: true
    })

    expect(button.id).toBe('desert')
    expect(button.group).toBe('other')

    Reflect.deleteProperty(button, 'id')
    Reflect.deleteProperty(button, 'group')

    expect(button.id).toBe('grass')
    expect(button.group).toBe('terrain')
  })
})
