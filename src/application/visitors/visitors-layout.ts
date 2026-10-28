
import type { ConvexClient } from 'convex/browser'
import type { ClerkAuthentication } from '../authentication/clerk-authentication.ts'
import { LoginPage } from '../authentication/login-page.ts'
import { createVisitorWorldMap } from '../../library-svg-graphics/visitor-map-world/world-map.ts'
import { createVisitorKalmarMap } from '../../library-svg-graphics/visitor-map-kalmar/kalmar-map.ts'
import { loadVisitorLocations } from './visitor-locations.ts'
import { createVisitorStatistics } from './visitor-statistics.ts'

export class VisitorsLayout {
  readonly element: HTMLElement
  readonly statisticsArea: HTMLElement
  readonly mapArea: HTMLElement
  readonly loginArea: HTMLElement
  readonly loginPage: LoginPage

  constructor(
    authentication: ClerkAuthentication,
    client: ConvexClient,
  ) {
    this.element = document.createElement('section')
    this.element.className = 'visitors-layout'
    this.element.setAttribute('aria-label', 'Visitors & Login')

    this.statisticsArea = document.createElement('aside')
    this.statisticsArea.className = 'visitors-layout__left-panel'

    this.mapArea = document.createElement('div')
    this.mapArea.className = 'visitors-layout__map-area'

    this.loginArea = document.createElement('aside')
    this.loginArea.className = 'visitors-layout__right-panel'

    this.loginPage = new LoginPage(authentication)

    this.createStatistics(client)
    this.createWorldMap(client)
    this.createLoginArea()

    this.element.append(
      this.statisticsArea,
      this.mapArea,
      this.loginArea,
    )
  }

  public initializeAuthentication(): void {
    this.loginPage.initialize()
  }

  private createStatistics(client: ConvexClient): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Visitor Statistics'

    const description = document.createElement('p')
    description.textContent = 'All recorded visits, by device.'

    this.statisticsArea.append(
      heading,
      description,
      createVisitorStatistics(client),
      this.createPanelNotes(),
    )
  }

  private createPanelNotes(): HTMLElement {
    const notes = document.createElement('div')
    notes.className = 'visitors-layout__notes'
    notes.append(this.createMapCredit(), this.createPrivacyNotice())
    return notes
  }

  private createWorldMap(client: ConvexClient): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Visitor World Map'

    const description = document.createElement('p')
    description.textContent =
      'Live visitor locations will appear on this map.'

    const frame = document.createElement('figure')
    frame.className = 'visitors-layout__map-frame'

    const map = createVisitorWorldMap()
    map.classList.add('visitors-layout__world-map')
    map.setAttribute('role', 'img')
    map.setAttribute('aria-label', 'Equirectangular world map')

    frame.append(map)

    const kalmarContainer = document.createElement('div')
    kalmarContainer.className = 'visitors-layout__kalmar-map-container'

    const kalmarMap = createVisitorKalmarMap()
    kalmarMap.classList.add('visitors-layout__kalmar-map')
    kalmarMap.setAttribute('role', 'img')
    kalmarMap.setAttribute('aria-label', 'Map of Kalmar and surrounding area')

    kalmarContainer.append(kalmarMap)
    frame.append(kalmarContainer)

    loadVisitorLocations(client, map)

    this.mapArea.append(
      heading,
      description,
      frame,
    )
  }

  private createMapCredit(): HTMLElement {
    const credit = document.createElement('p')
    credit.className = 'visitors-layout__map-credit'

    const source = document.createElement('a')
    source.href =
      'https://commons.wikimedia.org/wiki/File:Equirectangular_projection_world_map_without_borders.svg'
    source.textContent = 'Ebrahim'
    source.rel = 'license noreferrer'
    source.target = '_blank'

    const license = document.createElement('a')
    license.href = 'https://creativecommons.org/licenses/by-sa/4.0/'
    license.textContent = 'CC BY-SA 4.0'
    license.rel = 'license noreferrer'
    license.target = '_blank'

    credit.append(
      'World map by ',
      source,
      ', ',
      license,
      ', based on Natural Earth data. Recolored for Civilization of Wonders.',
    )

    return credit
  }

  private createPrivacyNotice(): HTMLElement {
    const notice = document.createElement('p')
    notice.className = 'visitors-layout__privacy'
    notice.textContent =
      'Anonymous visits are counted. Approximate locations may be determined by our hosting provider, Vercel. No IP addresses or visitor identities are stored in our database.'

    return notice
  }

  private createLoginArea(): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Login & Account'

    const description = document.createElement('p')
    description.textContent =
      'Sign in with Google to access your Civilization of Wonders account.'

    this.loginArea.append(
      heading,
      description,
      this.loginPage.element,
    )
  }
}
