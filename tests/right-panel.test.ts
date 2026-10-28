import { describe, expect, it, vi } from 'vitest'
import { RightPanel } from '../src/application/editor/right-panel.ts'
import type {
  MapFrame,
  MapView,
  MapViewport,
  ZoomLevel
} from '../src/application/map/map-grid.ts'

const WORLD: MapFrame = {
  x: 100,
  y: 200,
  width: 1000,
  height: 500
}

function createMapViewport(): MapViewport {
  let view: MapView = {
    ...WORLD,
    zoomLevel: 1
  }

  const listeners: Array<(view: MapView) => void> = []

  return {
    getWorldFrame: vi.fn(() => ({ ...WORLD })),

    getView: vi.fn(() => ({ ...view })),

    setZoomLevel: vi.fn((level: ZoomLevel) => {
      view = { ...view, zoomLevel: level }

      for (const listener of listeners) {
        listener({ ...view })
      }
    }),

    centerOn: vi.fn((x: number, y: number) => {
      view = {
        ...view,
        x: x - view.width / 2,
        y: y - view.height / 2
      }

      for (const listener of listeners) {
        listener({ ...view })
      }
    }),

    onViewChange: vi.fn((listener: (view: MapView) => void) => {
      listeners.push(listener)
    })
  }
}

function getActionButton(
  panel: RightPanel,
  label: string
): HTMLButtonElement {
  const button = Array.from(
    panel.element.querySelectorAll('button')
  ).find(button => button.textContent?.trim() === label)

  if (!button) {
    throw new Error(`Action button not found: ${label}`)
  }

  return button
}

describe('RightPanel — existing behavior', () => {
  it('creates the panel and scroll container', () => {
    const panel = new RightPanel(createMapViewport())

    expect(panel.element).toBeInstanceOf(HTMLDivElement)
    expect(panel.element.className).toBe('editor-layout__right-panel')

    expect(panel.scroll).toBeInstanceOf(HTMLDivElement)
    expect(panel.scroll.className).toBe('tool-panel__scroll')
    expect(panel.element.contains(panel.scroll)).toBe(true)
  })

  it('shows and updates the editor title', () => {
    const panel = new RightPanel(createMapViewport())
    const heading = panel.element.querySelector(
      '.editor-panel__heading-row h2'
    )

    expect(heading?.textContent).toBe('Unassigned')

    panel.setEditorTitle('Editor Alpha')
    expect(heading?.textContent).toBe('Editor Alpha')

    panel.setEditorTitle('Editor Beta')
    expect(heading?.textContent).toBe('Editor Beta')
  })

  it('shows and updates the editing status', () => {
    const panel = new RightPanel(createMapViewport())
    const status = panel.element.querySelector(
      '.editor-panel__status'
    )

    expect(status?.textContent).toBe('Viewing mode')

    panel.setEditingStatus('Editing mode')
    expect(status?.textContent).toBe('Editing mode')

    panel.setEditingStatus('Viewing mode')
    expect(status?.textContent).toBe('Viewing mode')
  })

  it('creates the three tool sections in the correct order', () => {
    const panel = new RightPanel(createMapViewport())

    const headings = Array.from(
      panel.scroll.querySelectorAll('h2, h3')
    ).map(heading => heading.textContent)

    expect(headings).toEqual([
      'Improvements',
      'Wonders',
      'Continents'
    ])
  })

  it('creates and connects the minimap', () => {
    const map = createMapViewport()
    const panel = new RightPanel(map)

    const minimap = panel.element.querySelector(
      'section.minimap'
    )

    expect(minimap).not.toBeNull()
    expect(minimap?.getAttribute('aria-label')).toBe('Minimap')

    expect(map.getWorldFrame).toHaveBeenCalledOnce()
    expect(map.getView).toHaveBeenCalledOnce()
    expect(map.onViewChange).toHaveBeenCalledOnce()
  })

  it('starts with editing controls hidden and Like disabled', () => {
    const panel = new RightPanel(createMapViewport())

    const like = getActionButton(panel, 'Like')
    const edit = getActionButton(panel, 'Edit')
    const takeover = getActionButton(panel, 'Take Over')

    expect(like.disabled).toBe(true)
    expect(like.title).toBe('Likes coming soon')

    expect(edit.hidden || getComputedStyle(edit).display === 'none'
      || edit.style.display === 'none'
      || edit.classList.contains('is-hidden')).toBe(true)

    expect(takeover.hidden || getComputedStyle(takeover).display === 'none'
      || takeover.style.display === 'none'
      || takeover.classList.contains('is-hidden')).toBe(true)
  })

  it('shows and hides the Edit and Take Over buttons', () => {
    const panel = new RightPanel(createMapViewport())

    const edit = getActionButton(panel, 'Edit')
    const takeover = getActionButton(panel, 'Take Over')

    panel.setEditButtonVisible(true)
    panel.setTakeoverButtonVisible(true)

    expect(edit.hidden).toBe(false)
    expect(takeover.hidden).toBe(false)

    panel.setEditButtonVisible(false)
    panel.setTakeoverButtonVisible(false)

    expect(
      edit.hidden ||
      edit.style.display === 'none' ||
      edit.classList.contains('is-hidden')
    ).toBe(true)

    expect(
      takeover.hidden ||
      takeover.style.display === 'none' ||
      takeover.classList.contains('is-hidden')
    ).toBe(true)
  })

  it('switches the Edit button between Edit and Stop Editing', () => {
    const panel = new RightPanel(createMapViewport())

    panel.setEditing(true)
    expect(getActionButton(panel, 'Stop Editing')).toBeInstanceOf(
      HTMLButtonElement
    )

    panel.setEditing(false)
    expect(getActionButton(panel, 'Edit')).toBeInstanceOf(
      HTMLButtonElement
    )
  })

  it('disables and enables both editing controls', () => {
    const panel = new RightPanel(createMapViewport())

    const edit = getActionButton(panel, 'Edit')
    const takeover = getActionButton(panel, 'Take Over')

    panel.setEditingButtonsDisabled(true)

    expect(edit.disabled).toBe(true)
    expect(takeover.disabled).toBe(true)

    panel.setEditingButtonsDisabled(false)

    expect(edit.disabled).toBe(false)
    expect(takeover.disabled).toBe(false)
  })

  it('invokes the registered Edit and Take Over callbacks', () => {
    const panel = new RightPanel(createMapViewport())
    const onEdit = vi.fn()
    const onTakeover = vi.fn()

    panel.onEdit(onEdit)
    panel.onTakeover(onTakeover)

    panel.setEditButtonVisible(true)
    panel.setTakeoverButtonVisible(true)

    getActionButton(panel, 'Edit').click()
    getActionButton(panel, 'Take Over').click()

    expect(onEdit).toHaveBeenCalledOnce()
    expect(onTakeover).toHaveBeenCalledOnce()
  })

  it('invokes the Edit callback when Stop Editing is clicked', () => {
    const panel = new RightPanel(createMapViewport())
    const onEdit = vi.fn()

    panel.onEdit(onEdit)
    panel.setEditButtonVisible(true)
    panel.setEditing(true)

    getActionButton(panel, 'Stop Editing').click()

    expect(onEdit).toHaveBeenCalledOnce()
  })
})

describe('RightPanel — encapsulation', () => {
  it('does not expose internal fields as own properties', () => {
    const panel = new RightPanel(createMapViewport())

    const privateNames = [
      'element',
      'scroll',
      'heading',
      'editingStatus',
      'likeButton',
      'editButton',
      'takeoverButton',
      'onEditAction',
      'onTakeoverAction'
    ]

    for (const name of privateNames) {
      expect(Object.hasOwn(panel, name)).toBe(false)
      expect(Reflect.get(panel, name)).toBe(
        name === 'element' ? panel.element :
          name === 'scroll' ? panel.scroll :
            undefined
      )
    }

    expect(Reflect.get(panel, '#heading')).toBeUndefined()
    expect(Reflect.get(panel, '#editButton')).toBeUndefined()
  })

  it('exposes element and scroll through read-only getters', () => {
    const panel = new RightPanel(createMapViewport())

    const elementDescriptor = Object.getOwnPropertyDescriptor(
      RightPanel.prototype,
      'element'
    )
    const scrollDescriptor = Object.getOwnPropertyDescriptor(
      RightPanel.prototype,
      'scroll'
    )

    expect(typeof elementDescriptor?.get).toBe('function')
    expect(elementDescriptor?.set).toBeUndefined()

    expect(typeof scrollDescriptor?.get).toBe('function')
    expect(scrollDescriptor?.set).toBeUndefined()

    const originalElement = panel.element
    const originalScroll = panel.scroll

    expect(Reflect.set(
      panel,
      'element',
      document.createElement('div')
    )).toBe(false)

    expect(Reflect.set(
      panel,
      'scroll',
      document.createElement('div')
    )).toBe(false)

    expect(panel.element).toBe(originalElement)
    expect(panel.scroll).toBe(originalScroll)
    expect(panel.element.contains(panel.scroll)).toBe(true)
  })

  it('does not expose internal buttons or callback references', () => {
    const panel = new RightPanel(createMapViewport())

    const privateNames = [
      'heading',
      'editingStatus',
      'likeButton',
      'editButton',
      'takeoverButton',
      'onEditAction',
      'onTakeoverAction'
    ]

    for (const name of privateNames) {
      expect(name in panel).toBe(false)
      expect(Reflect.get(panel, name)).toBeUndefined()
    }

    expect(typeof panel.onEdit).toBe('function')
    expect(typeof panel.onTakeover).toBe('function')
    expect(typeof panel.setEditing).toBe('function')
  })

  it('keeps internal callbacks independent of shadow properties', () => {
    const panel = new RightPanel(createMapViewport())

    const onEdit = vi.fn()
    const onTakeover = vi.fn()
    const fakeEdit = vi.fn()
    const fakeTakeover = vi.fn()

    panel.onEdit(onEdit)
    panel.onTakeover(onTakeover)

    Object.defineProperty(panel, 'onEditAction', {
      value: fakeEdit,
      configurable: true
    })

    Object.defineProperty(panel, 'onTakeoverAction', {
      value: fakeTakeover,
      configurable: true
    })

    panel.setEditButtonVisible(true)
    panel.setTakeoverButtonVisible(true)

    getActionButton(panel, 'Edit').click()
    getActionButton(panel, 'Take Over').click()

    expect(onEdit).toHaveBeenCalledOnce()
    expect(onTakeover).toHaveBeenCalledOnce()

    expect(fakeEdit).not.toHaveBeenCalled()
    expect(fakeTakeover).not.toHaveBeenCalled()
  })
})