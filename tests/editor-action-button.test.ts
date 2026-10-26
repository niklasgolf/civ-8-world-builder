
import { describe, expect, it, vi } from 'vitest'
import { EditorActionButton } from '../src/application/editor/editor-action-button.ts'

describe('EditorActionButton', () => {
  it('creates a button with the expected CSS classes', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    expect(button.element).toBeInstanceOf(HTMLButtonElement)
    expect(button.element.type).toBe('button')
    expect(button.element.classList.contains('tool-button')).toBe(true)
    expect(button.element.classList.contains('editor-action-button')).toBe(true)
  })

  it('displays the initial label', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    const label = button.element.querySelector(
      '.editor-action-button__label'
    )

    expect(label?.textContent).toBe('Edit')
  })

  it('creates an SVG icon inside its icon container', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    const icon = button.element.querySelector(
      '.editor-action-button__icon svg'
    )

    expect(icon).not.toBeNull()
    expect(icon?.classList.contains('tool-icon')).toBe(true)
  })

  it('invokes the callback when clicked', () => {
    const onClick = vi.fn()
    const button = new EditorActionButton('Edit', 'edit', onClick)

    button.element.click()

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('updates the label without creating another label', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    button.setLabel('Stop Editing')

    const labels = button.element.querySelectorAll(
      '.editor-action-button__label'
    )

    expect(labels).toHaveLength(1)
    expect(labels[0]?.textContent).toBe('Stop Editing')
  })

  it('replaces the SVG icon without duplicating it', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    const originalIcon = button.element.querySelector(
      '.editor-action-button__icon svg'
    )

    button.setIcon('edit')

    const icons = button.element.querySelectorAll(
      '.editor-action-button__icon svg'
    )

    expect(icons).toHaveLength(1)
    expect(icons[0]).not.toBe(originalIcon)
  })

  it('disables and enables the button', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    button.setDisabled(true)
    expect(button.element.disabled).toBe(true)

    button.setDisabled(false)
    expect(button.element.disabled).toBe(false)
  })

  it('does not invoke the callback when disabled', () => {
    const onClick = vi.fn()
    const button = new EditorActionButton('Edit', 'edit', onClick)

    button.setDisabled(true)
    button.element.click()

    expect(onClick).not.toHaveBeenCalled()
  })

  it('hides and shows the button', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    button.setVisible(false)
    expect(button.element.hidden).toBe(true)

    button.setVisible(true)
    expect(button.element.hidden).toBe(false)
  })

  it('preserves the label when the icon changes', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    button.setIcon('edit')

    expect(
      button.element.querySelector(
        '.editor-action-button__label'
      )?.textContent
    ).toBe('Edit')
  })

  it('does not expose its internal DOM references', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    expect(Object.hasOwn(button, 'iconContainer')).toBe(false)
    expect(Object.hasOwn(button, 'labelElement')).toBe(false)

    expect(Reflect.ownKeys(button)).not.toContain('#iconContainer')
    expect(Reflect.ownKeys(button)).not.toContain('#labelElement')
  })

  it('keeps its internal state separate from public properties', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    const fakeLabel = document.createElement('span')
    const fakeIconContainer = document.createElement('span')

    Object.defineProperty(button, 'labelElement', {
      value: fakeLabel,
      configurable: true
    })

    Object.defineProperty(button, 'iconContainer', {
      value: fakeIconContainer,
      configurable: true
    })

    button.setLabel('Updated')
    button.setIcon('edit')

    expect(fakeLabel.textContent).toBe('')
    expect(fakeIconContainer.children).toHaveLength(0)

    expect(
      button.element.querySelector(
        '.editor-action-button__label'
      )?.textContent
    ).toBe('Updated')

    expect(
      button.element.querySelectorAll(
        '.editor-action-button__icon svg'
      )
    ).toHaveLength(1)
  })

  it('does not expose private DOM references through the prototype', () => {
    const button = new EditorActionButton('Edit', 'edit', vi.fn())

    expect('iconContainer' in button).toBe(false)
    expect('labelElement' in button).toBe(false)

    expect(
      Object.getOwnPropertyDescriptor(
        EditorActionButton.prototype,
        'iconContainer'
      )
    ).toBeUndefined()

    expect(
      Object.getOwnPropertyDescriptor(
        EditorActionButton.prototype,
        'labelElement'
      )
    ).toBeUndefined()
  })
})
