
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ConvexClient } from 'convex/browser'
import type { ClerkAuthentication } from '../src/application/authentication/clerk-authentication.ts'

const mocks = vi.hoisted(() => ({
  initializeLogin: vi.fn(),
  loadLocations: vi.fn(),
  createStatistics: vi.fn(),
  createWorldMap: vi.fn(),
  createSverigeMap: vi.fn(),
  createKalmarMap: vi.fn(),
}))

vi.mock('../src/application/authentication/login-page.ts', () => ({
  LoginPage: class {
    readonly element = document.createElement('div')

    initialize(): void {
      mocks.initializeLogin()
    }
  },
}))

vi.mock('../src/application/visitors/visitor-locations.ts', () => ({
  loadVisitorLocations: mocks.loadLocations,
}))

vi.mock('../src/application/visitors/visitor-statistics.ts', () => ({
  createVisitorStatistics: mocks.createStatistics,
}))

vi.mock('../src/library-svg-graphics/visitor-map-world/world-map.ts', () => ({
  createVisitorWorldMap: mocks.createWorldMap,
}))

vi.mock('../src/library-svg-graphics/visitor-map-sverige/sverige-map.ts', () => ({
  createVisitorSverigeMap: mocks.createSverigeMap,
}))

vi.mock('../src/library-svg-graphics/visitor-map-kalmar/kalmar-map.ts', () => ({
  createVisitorKalmarMap: mocks.createKalmarMap,
}))

import { VisitorsLayout } from '../src/application/visitors/visitors-layout.ts'

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

function createSvg(): SVGSVGElement {
  return document.createElementNS(SVG_NAMESPACE, 'svg')
}

function createLayout(): VisitorsLayout {
  const authentication = {} as ClerkAuthentication
  const client = {} as ConvexClient

  return new VisitorsLayout(authentication, client)
}

beforeEach(() => {
  vi.clearAllMocks()

  mocks.createStatistics.mockImplementation(() => {
    return document.createElement('div')
  })

  mocks.createWorldMap.mockImplementation(createSvg)
  mocks.createSverigeMap.mockImplementation(createSvg)
  mocks.createKalmarMap.mockImplementation(createSvg)
})

describe('VisitorsLayout — existing behavior', () => {
  it('creates an accessible root section', () => {
    const layout = createLayout()

    expect(layout.element).toBeInstanceOf(HTMLElement)
    expect(layout.element.tagName).toBe('SECTION')
    expect(layout.element.className).toBe('visitors-layout')
    expect(layout.element.getAttribute('aria-label')).toBe(
      'Visitors & Login',
    )
  })

  it('creates the three panels in the correct order', () => {
    const layout = createLayout()
    const children = Array.from(layout.element.children)

    expect(children).toHaveLength(3)
    expect(children[0].className).toBe('visitors-layout__left-panel')
    expect(children[1].className).toBe('visitors-layout__map-area')
    expect(children[2].className).toBe('visitors-layout__right-panel')
  })

  it('creates the visitor statistics section', () => {
    const layout = createLayout()
    const panel = layout.element.querySelector(
      '.visitors-layout__left-panel',
    )

    expect(panel?.querySelector('h1')?.textContent).toBe(
      'Visitor Statistics',
    )
    expect(mocks.createStatistics).toHaveBeenCalledOnce()
  })

  it('creates the world map and both inset maps', () => {
    const layout = createLayout()
    const mapArea = layout.element.querySelector(
      '.visitors-layout__map-area',
    )

    expect(mapArea?.querySelector('h1')?.textContent).toBe(
      'Visitor World Map',
    )

    expect(
      mapArea?.querySelectorAll('.visitors-layout__world-map'),
    ).toHaveLength(1)

    expect(
      mapArea?.querySelectorAll('.visitors-layout__sverige-map'),
    ).toHaveLength(1)

    expect(
      mapArea?.querySelectorAll('.visitors-layout__kalmar-map'),
    ).toHaveLength(1)
  })

  it('passes all three maps to the visitor location loader', () => {
    const client = {} as ConvexClient
    const authentication = {} as ClerkAuthentication

    new VisitorsLayout(authentication, client)

    expect(mocks.loadLocations).toHaveBeenCalledOnce()

    const [receivedClient, maps] = mocks.loadLocations.mock.calls[0]

    expect(receivedClient).toBe(client)
    expect(maps.world).toBeInstanceOf(SVGSVGElement)
    expect(maps.sverige).toBeInstanceOf(SVGSVGElement)
    expect(maps.kalmar).toBeInstanceOf(SVGSVGElement)
  })

  it('creates the login panel', () => {
    const layout = createLayout()
    const panel = layout.element.querySelector(
      '.visitors-layout__right-panel',
    )

    expect(panel?.querySelector('h1')?.textContent).toBe(
      'Login & Account',
    )
    expect(panel?.contains(layout.loginPage.element)).toBe(true)
  })

  it('initializes authentication through the public method', () => {
    const layout = createLayout()

    layout.initializeAuthentication()

    expect(mocks.initializeLogin).toHaveBeenCalledOnce()
  })

  it('includes the map attribution and privacy notice', () => {
    const layout = createLayout()

    const credit = layout.element.querySelector(
      '.visitors-layout__map-credit',
    )
    const privacy = layout.element.querySelector(
      '.visitors-layout__privacy',
    )

    expect(credit?.textContent).toContain('Natural Earth')
    expect(credit?.textContent).toContain('CC BY-SA 4.0')
    expect(privacy?.textContent).toContain('Anonymous visits')
    expect(privacy?.textContent).toContain('No IP addresses')
  })
})

describe('VisitorsLayout — encapsulation', () => {
  it('does not expose the three internal DOM fields', () => {
    const layout = createLayout()
    const properties = Object.getOwnPropertyNames(layout)

    expect(properties).not.toContain('statisticsArea')
    expect(properties).not.toContain('mapArea')
    expect(properties).not.toContain('loginArea')
  })

  it('does not expose private builder methods', () => {
    const layout = createLayout()

    const privateMethods = [
      'createStatistics',
      'createPanelNotes',
      'createWorldMap',
      'createMapCredit',
      'createPrivacyNotice',
      'createLoginArea',
    ]

    for (const method of privateMethods) {
      expect(method in layout).toBe(false)
    }
  })

  it('preserves the public element and loginPage references', () => {
    const layout = createLayout()

    expect(layout.element).toBeInstanceOf(HTMLElement)
    expect(layout.loginPage.element).toBeInstanceOf(HTMLElement)
    expect(layout.element).toBe(layout.element)
    expect(layout.loginPage).toBe(layout.loginPage)
  })

  it('creates independent DOM structures for separate instances', () => {
    const first = createLayout()
    const second = createLayout()

    expect(first.element).not.toBe(second.element)
    expect(first.loginPage).not.toBe(second.loginPage)
    expect(first.element.children[0]).not.toBe(
      second.element.children[0],
    )
    expect(first.element.children[1]).not.toBe(
      second.element.children[1],
    )
    expect(first.element.children[2]).not.toBe(
      second.element.children[2],
    )
  })
})
