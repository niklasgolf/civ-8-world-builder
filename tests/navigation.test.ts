
import { describe, expect, it, vi } from 'vitest'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { Header } from '../src/application/editor/header.ts'
import type { WorldGallery } from '../src/application/gallery/world-gallery.ts'
import type { CodeWiki } from '../src/application/codewiki/code-wiki.ts'
import type { CivWiki } from '../src/application/wiki/civ-wiki.ts'
import type { VisitorsLayout } from '../src/application/visitors/visitors-layout.ts'
import { ApplicationState } from '../src/main/application-state.ts'
import { Navigation } from '../src/main/navigation.ts'

const world1 = 'world_1' as Id<'worlds'>

function createNavigation(selectedWorldId: Id<'worlds'> | null = null) {
  const galleryElement = document.createElement('div')
  const worldBuilderElement = document.createElement('div')
  const visitorsElement = document.createElement('div')
  const wikiElement = document.createElement('div')
  const codeWikiElement = document.createElement('div')

  const setView = vi.fn()

  const header = {
    setView,
  } as unknown as Header

  const gallery = {
    element: galleryElement,
  } as unknown as WorldGallery

  const visitors = {
    element: visitorsElement,
  } as unknown as VisitorsLayout

  const wiki = {
    element: wikiElement,
  } as unknown as CivWiki

  const codeWiki = {
    element: codeWikiElement,
  } as unknown as CodeWiki

  const state = new ApplicationState()
  state.selectWorld(selectedWorldId)

  const navigation = new Navigation(
    header,
    gallery,
    worldBuilderElement,
    visitors,
    wiki,
    codeWiki,
    state,
  )

  return {
    navigation,
    galleryElement,
    worldBuilderElement,
    visitorsElement,
    wikiElement,
    codeWikiElement,
    setView,
    state,
  }
}

function expectActiveView(
  elements: {
    galleryElement: HTMLElement
    worldBuilderElement: HTMLElement
    visitorsElement: HTMLElement
    wikiElement: HTMLElement
    codeWikiElement: HTMLElement
  },
  active: 'gallery' | 'builder' | 'visitors' | 'wiki' | 'code-wiki',
): void {
  expect(elements.galleryElement.classList.contains('is-active'))
    .toBe(active === 'gallery')

  expect(elements.worldBuilderElement.classList.contains('is-active'))
    .toBe(active === 'builder')

  expect(elements.visitorsElement.classList.contains('is-active'))
    .toBe(active === 'visitors')

  expect(elements.wikiElement.classList.contains('is-active'))
    .toBe(active === 'wiki')

  expect(elements.codeWikiElement.classList.contains('is-active'))
    .toBe(active === 'code-wiki')
}

describe('Navigation — existing behavior', () => {
  it('shows the map gallery', () => {
    const app = createNavigation()

    app.navigation.showView('map-gallery')

    expectActiveView(app, 'gallery')
    expect(app.setView).toHaveBeenCalledWith('map-gallery')
  })

  it('shows the World Builder when a world is selected', () => {
    const app = createNavigation(world1)

    app.navigation.showView('world-builder')

    expectActiveView(app, 'builder')
    expect(app.setView).toHaveBeenCalledWith('world-builder')
  })

  it('redirects World Builder to the gallery without a selected world', () => {
    const app = createNavigation()

    app.navigation.showView('world-builder')

    expectActiveView(app, 'gallery')
    expect(app.setView).toHaveBeenCalledWith('map-gallery')
  })

  it('shows the visitors login view', () => {
    const app = createNavigation()

    app.navigation.showView('visitors-login')

    expectActiveView(app, 'visitors')
    expect(app.setView).toHaveBeenCalledWith('visitors-login')
  })

  it('shows the Civilization Wiki', () => {
    const app = createNavigation()

    app.navigation.showView('civ-wiki')

    expectActiveView(app, 'wiki')
    expect(app.setView).toHaveBeenCalledWith('civ-wiki')
  })

  it('shows the Code Wiki', () => {
    const app = createNavigation()

    app.navigation.showView('code-wiki')

    expectActiveView(app, 'code-wiki')
    expect(app.setView).toHaveBeenCalledWith('code-wiki')
  })

  it('deactivates the previous view when navigating', () => {
    const app = createNavigation(world1)

    app.navigation.showView('map-gallery')
    app.navigation.showView('world-builder')
    app.navigation.showView('civ-wiki')

    expectActiveView(app, 'wiki')
    expect(app.setView).toHaveBeenLastCalledWith('civ-wiki')
    expect(app.setView).toHaveBeenCalledTimes(3)
  })

  it('allows World Builder after selecting a world', () => {
    const app = createNavigation()

    app.navigation.showView('world-builder')
    app.state.selectWorld(world1)
    app.navigation.showView('world-builder')

    expectActiveView(app, 'builder')
    expect(app.setView).toHaveBeenLastCalledWith('world-builder')
  })

  it('prevents World Builder after deselecting a world', () => {
    const app = createNavigation(world1)

    app.navigation.showView('world-builder')
    app.state.selectWorld(null)
    app.navigation.showView('world-builder')

    expectActiveView(app, 'gallery')
    expect(app.setView).toHaveBeenLastCalledWith('map-gallery')
  })
})

describe('Navigation — encapsulation', () => {
  it('does not expose its seven internal fields', () => {
    const { navigation } = createNavigation()
    const properties = Object.getOwnPropertyNames(navigation)

    for (const field of [
      'header',
      'gallery',
      'worldBuilder',
      'visitors',
      'wiki',
      'codeWiki',
      'state',
    ]) {
      expect(properties).not.toContain(field)
      expect(field in navigation).toBe(false)
    }
  })

  it('preserves showView as the public interface', () => {
    const { navigation } = createNavigation()

    expect(navigation.showView).toBeTypeOf('function')
  })
})
