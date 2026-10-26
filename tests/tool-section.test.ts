
import { describe, expect, it } from 'vitest'
import { ToolButton } from '../src/application/editor/tool-button.ts'
import { ToolSection } from '../src/application/editor/tool-section.ts'

describe('ToolSection', () => {
  it('creates a section with a heading and grid', () => {
    const section = new ToolSection('Terrain')

    expect(section.element.tagName).toBe('SECTION')
    expect(section.element.classList.contains('tool-section')).toBe(true)
    expect(
      section.element.querySelector('.tool-section__title')?.textContent
    ).toBe('Terrain')
    expect(section.element.querySelector('.tool-grid')).not.toBeNull()
  })

  it('adds an extra CSS class to the grid', () => {
    const section = new ToolSection('Terrain')

    section.addGridClass('terrain-grid')

    expect(
      section.element.querySelector('.tool-grid')?.classList.contains(
        'terrain-grid'
      )
    ).toBe(true)
  })

  it('adds buttons to the grid in order', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')
    const desert = new ToolButton('desert', 'Desert', 'grass', 'terrain')

    section.addButton(grass)
    section.addButton(desert)

    expect(
      Array.from(section.element.querySelectorAll('.tool-grid > button'))
    ).toEqual([grass.element, desert.element])
  })

  it('selects a grouped button when clicked', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')

    section.addButton(grass)
    grass.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(true)
    expect(grass.element.getAttribute('aria-pressed')).toBe('true')
  })

  it('deselects the previous button in the same group', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')
    const desert = new ToolButton('desert', 'Desert', 'grass', 'terrain')

    section.addButton(grass)
    section.addButton(desert)

    grass.element.click()
    desert.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(false)
    expect(desert.element.classList.contains('is-selected')).toBe(true)
  })

  it('keeps selections in different groups independent', () => {
    const section = new ToolSection('Tools')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')
    const brush = new ToolButton('brush', 'Brush', 'grass', 'brush')

    section.addButton(grass)
    section.addButton(brush)

    grass.element.click()
    brush.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(true)
    expect(brush.element.classList.contains('is-selected')).toBe(true)
  })

  it('does not change selections when an ungrouped button is clicked', () => {
    const section = new ToolSection('Tools')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')
    const action = new ToolButton('action', 'Action', 'grass')

    section.addButton(grass)
    section.addButton(action)

    grass.element.click()
    action.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(true)
    expect(action.element.classList.contains('is-selected')).toBe(false)
  })

  it('marks the section as unavailable', () => {
    const section = new ToolSection('Terrain')

    section.setUnavailable()

    expect(
      section.element.classList.contains('tool-section--unavailable')
    ).toBe(true)
  })

  it('disables all buttons when unavailable', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')
    const desert = new ToolButton('desert', 'Desert', 'grass', 'terrain')

    section.addButton(grass)
    section.addButton(desert)
    section.setUnavailable()

    expect(grass.element.disabled).toBe(true)
    expect(desert.element.disabled).toBe(true)
  })

  it('does not select disabled buttons when clicked', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')

    section.addButton(grass)
    section.setUnavailable()
    grass.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(false)
  })

  it('does not expose internal fields or methods', () => {
    const section = new ToolSection('Terrain')

    for (const name of ['grid', 'buttons', 'body', 'select']) {
      expect(name in section).toBe(false)
      expect(Object.hasOwn(section, name)).toBe(false)
      expect(Reflect.ownKeys(section)).not.toContain(`#${name}`)
    }

    expect(Reflect.ownKeys(section)).toEqual(['element'])
  })

  it('protects internal state from public property shadowing', () => {
    const section = new ToolSection('Terrain')
    const grass = new ToolButton('grass', 'Grass', 'grass', 'terrain')

    const fakeGrid = document.createElement('div')
    const fakeBody = document.createElement('div')
    const fakeButtons: ToolButton[] = []

    Object.defineProperties(section, {
      grid: {
        value: fakeGrid,
        configurable: true
      },
      body: {
        value: fakeBody,
        configurable: true
      },
      buttons: {
        value: fakeButtons,
        configurable: true
      },
      select: {
        value: () => {
          throw new Error('Public shadow method must not be called')
        },
        configurable: true
      }
    })

    section.addGridClass('terrain-grid')
    section.addButton(grass)

    expect(
      section.element.querySelector('.tool-grid')?.classList.contains(
        'terrain-grid'
      )
    ).toBe(true)

    expect(fakeGrid.classList.contains('terrain-grid')).toBe(false)
    expect(fakeGrid.children).toHaveLength(0)
    expect(fakeBody.children).toHaveLength(0)
    expect(fakeButtons).toHaveLength(0)

    expect(
      section.element.querySelector('.tool-grid > button')
    ).toBe(grass.element)

    grass.element.click()

    expect(grass.element.classList.contains('is-selected')).toBe(true)

    section.setUnavailable()

    expect(grass.element.disabled).toBe(true)
    expect(fakeButtons).toHaveLength(0)
  })

  it('does not expose private members through the prototype', () => {
    const section = new ToolSection('Terrain')

    for (const name of ['grid', 'buttons', 'body', 'select']) {
      expect(
        Object.getOwnPropertyDescriptor(
          ToolSection.prototype,
          name
        )
      ).toBeUndefined()

      expect(name in section).toBe(false)
    }

    expect(typeof section.addGridClass).toBe('function')
    expect(typeof section.addButton).toBe('function')
    expect(typeof section.setUnavailable).toBe('function')
  })
})
