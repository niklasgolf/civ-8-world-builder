
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Header, type AppView } from '../src/application/editor/header.ts'

describe('Header', () => {
  let header: Header
  let onChange: ReturnType<typeof vi.fn<(view: AppView) => void>>

  const views: Array<{ view: AppView; label: string }> = [
    { view: 'map-gallery', label: 'Map Gallery' },
    { view: 'world-builder', label: 'World Builder' },
    { view: 'visitors-login', label: 'Visitors & Login' },
    { view: 'civ-wiki', label: 'CoW Wiki' },
    { view: 'code-wiki', label: 'Code Wiki' }
  ]

  const getButton = (view: AppView): HTMLButtonElement => {
    const index = views.findIndex(item => item.view === view)
    const button = header.element.querySelectorAll<HTMLButtonElement>(
      '.mode-button'
    )[index]

    if (!button) {
      throw new Error(`Missing navigation button: ${view}`)
    }

    return button
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    onChange = vi.fn<(view: AppView) => void>()
    header = new Header(onChange)
    document.body.append(header.element)
  })

  it('creates a header element', () => {
    expect(header.element.tagName).toBe('HEADER')
    expect(header.element.classList.contains('editor-header')).toBe(true)
  })

  it('displays the application title', () => {
    const name = header.element.querySelector('.editor-header__name')
    const mode = header.element.querySelector('.editor-header__mode')

    expect(name?.textContent).toBe('Civilization of Wonders')
    expect(mode?.textContent).toBe('World Builder')
  })

  it('creates all five navigation buttons in the correct order', () => {
    const buttons = header.element.querySelectorAll('.mode-button')

    expect(buttons).toHaveLength(5)

    views.forEach(({ label }, index) => {
      expect(buttons[index]?.textContent).toBe(label)
    })
  })

  it('creates an accessible navigation element', () => {
    const nav = header.element.querySelector('nav')

    expect(nav?.getAttribute('aria-label')).toBe('Application views')
  })

  it('initially selects Map Gallery', () => {
    const button = getButton('map-gallery')

    expect(button.classList.contains('is-selected')).toBe(true)
    expect(button.getAttribute('aria-pressed')).toBe('true')
  })

  it('initially leaves the other views unselected', () => {
    for (const { view } of views) {
      if (view === 'map-gallery') continue

      const button = getButton(view)

      expect(button.classList.contains('is-selected')).toBe(false)
      expect(button.getAttribute('aria-pressed')).toBe('false')
    }
  })

  it('changes the selected view through setView', () => {
    header.setView('civ-wiki')

    expect(getButton('civ-wiki').classList.contains('is-selected')).toBe(true)
    expect(getButton('civ-wiki').getAttribute('aria-pressed')).toBe('true')
    expect(getButton('map-gallery').getAttribute('aria-pressed')).toBe('false')
  })

  it('keeps exactly one navigation button selected', () => {
    for (const { view } of views) {
      header.setView(view)

      const selected = header.element.querySelectorAll(
        '.mode-button.is-selected'
      )

      expect(selected).toHaveLength(1)
      expect(getButton(view).getAttribute('aria-pressed')).toBe('true')
    }
  })

  it('does not invoke the callback when setView is called', () => {
    header.setView('visitors-login')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('invokes the callback with the correct view when clicked', () => {
    getButton('civ-wiki').click()

    expect(onChange).toHaveBeenCalledExactlyOnceWith('civ-wiki')
  })

  it('does not automatically change selection when clicked', () => {
    getButton('civ-wiki').click()

    expect(getButton('map-gallery').getAttribute('aria-pressed')).toBe('true')
    expect(getButton('civ-wiki').getAttribute('aria-pressed')).toBe('false')
  })

  it('initially disables World Builder', () => {
    const button = getButton('world-builder')

    expect(button.disabled).toBe(true)
    expect(button.title).toBe('Select a world in Map Gallery first')
  })

  it('enables World Builder when a world becomes available', () => {
    header.setWorldBuilderAvailable(true)

    const button = getButton('world-builder')

    expect(button.disabled).toBe(false)
    expect(button.title).toBe('')
  })

  it('disables World Builder again when unavailable', () => {
    header.setWorldBuilderAvailable(true)
    header.setWorldBuilderAvailable(false)

    const button = getButton('world-builder')

    expect(button.disabled).toBe(true)
    expect(button.title).toBe('Select a world in Map Gallery first')
  })

  it('does not invoke the callback when disabled World Builder is clicked', () => {
    getButton('world-builder').click()

    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not expose internal fields at runtime', () => {
    const properties = Object.getOwnPropertyNames(header)

    expect(properties).toContain('element')
    expect(properties).not.toContain('onChange')
    expect(properties).not.toContain('buttons')
    expect(properties).not.toContain('#onChange')
    expect(properties).not.toContain('#buttons')
  })

  it('does not expose private building methods through the prototype', () => {
    const methods = Object.getOwnPropertyNames(Header.prototype)

    expect(methods).toContain('setView')
    expect(methods).toContain('setWorldBuilderAvailable')

    expect(methods).not.toContain('createTitle')
    expect(methods).not.toContain('createModes')
    expect(methods).not.toContain('#createTitle')
    expect(methods).not.toContain('#createModes')
  })

  it('protects private state from public property shadowing', () => {
    const replacementCallback = vi.fn<(view: AppView) => void>()

    Object.assign(header, {
      onChange: replacementCallback,
      buttons: new Map<AppView, HTMLButtonElement>()
    })

    getButton('civ-wiki').click()

    expect(onChange).toHaveBeenCalledExactlyOnceWith('civ-wiki')
    expect(replacementCallback).not.toHaveBeenCalled()

    header.setView('visitors-login')

    expect(getButton('visitors-login').getAttribute('aria-pressed')).toBe('true')
    expect(getButton('map-gallery').getAttribute('aria-pressed')).toBe('false')

    header.setWorldBuilderAvailable(true)

    expect(getButton('world-builder').disabled).toBe(false)
  })
})
