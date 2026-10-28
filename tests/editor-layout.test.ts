import { describe, expect, it } from 'vitest'
import { EditorLayout } from '../src/application/editor/editor-layout.ts'
import { LeftPanel } from '../src/application/editor/left-panel.ts'
import { MapArea } from '../src/application/editor/map-area.ts'
import { RightPanel } from '../src/application/editor/right-panel.ts'

describe('EditorLayout — existing behavior', () => {
  it('creates the root layout element', () => {
    const layout = new EditorLayout()

    expect(layout.element).toBeInstanceOf(HTMLDivElement)
    expect(layout.element.className).toBe('editor-layout')
  })

  it('creates all three component instances', () => {
    const layout = new EditorLayout()

    expect(layout.leftPanel).toBeInstanceOf(LeftPanel)
    expect(layout.mapArea).toBeInstanceOf(MapArea)
    expect(layout.rightPanel).toBeInstanceOf(RightPanel)
  })

  it('mounts the components in the correct order', () => {
    const layout = new EditorLayout()

    expect(Array.from(layout.element.children)).toEqual([
      layout.leftPanel.element,
      layout.mapArea.element,
      layout.rightPanel.element
    ])
  })

  it('mounts each component exactly once', () => {
    const layout = new EditorLayout()

    expect(layout.element.children).toHaveLength(3)

    expect(
      layout.element.querySelectorAll('.editor-layout__left-panel')
    ).toHaveLength(1)

    expect(
      layout.element.querySelectorAll('.editor-layout__right-panel')
    ).toHaveLength(1)
  })

  it('connects the right panel minimap to the map', () => {
    const layout = new EditorLayout()

    const minimap = layout.rightPanel.element.querySelector(
      'section.minimap'
    )

    expect(minimap).not.toBeNull()
    expect(minimap?.getAttribute('aria-label')).toBe('Minimap')
  })

  it('exposes the same component instances after construction', () => {
    const layout = new EditorLayout()

    const element = layout.element
    const leftPanel = layout.leftPanel
    const mapArea = layout.mapArea
    const rightPanel = layout.rightPanel

    expect(layout.element).toBe(element)
    expect(layout.leftPanel).toBe(leftPanel)
    expect(layout.mapArea).toBe(mapArea)
    expect(layout.rightPanel).toBe(rightPanel)
  })

  it('updates the world and editor titles', () => {
    const layout = new EditorLayout()

    layout.setWorldInformation('World Alpha', 'Editor Alpha')

    expect(
      layout.leftPanel.element.querySelector('h2')?.textContent
    ).toBe('World Alpha')

    expect(
      layout.rightPanel.element.querySelector(
        '.editor-panel__heading-row h2'
      )?.textContent
    ).toBe('Editor Alpha')
  })

  it('supports repeated world information updates', () => {
    const layout = new EditorLayout()

    layout.setWorldInformation('World Alpha', 'Editor Alpha')
    layout.setWorldInformation('World Beta', 'Editor Beta')

    expect(
      layout.leftPanel.element.querySelector('h2')?.textContent
    ).toBe('World Beta')

    expect(
      layout.rightPanel.element.querySelector(
        '.editor-panel__heading-row h2'
      )?.textContent
    ).toBe('Editor Beta')
  })

  it('keeps the same components when world information changes', () => {
    const layout = new EditorLayout()

    const leftPanel = layout.leftPanel
    const mapArea = layout.mapArea
    const rightPanel = layout.rightPanel

    layout.setWorldInformation('World Alpha', 'Editor Alpha')

    expect(layout.leftPanel).toBe(leftPanel)
    expect(layout.mapArea).toBe(mapArea)
    expect(layout.rightPanel).toBe(rightPanel)

    expect(layout.element.children).toHaveLength(3)
  })
})