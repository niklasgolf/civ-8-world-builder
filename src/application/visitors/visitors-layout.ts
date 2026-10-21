
import type { ClerkAuthentication } from '../authentication/clerk-authentication.ts'
import { LoginPage } from '../authentication/login-page.ts'
import { createVisitorWorldMap } from '../../library-svg-graphics/world-map/world-map.ts'

export class VisitorsLayout {
  readonly element: HTMLElement
  readonly statisticsArea: HTMLElement
  readonly mapArea: HTMLElement
  readonly loginArea: HTMLElement
  readonly loginPage: LoginPage

  constructor(authentication: ClerkAuthentication) {
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

    this.createStatistics()
    this.createWorldMap()
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

  private createStatistics(): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Visitor Statistics'

    const description = document.createElement('p')
    description.textContent =
      'Visitor activity and device statistics will appear here.'

    const total = document.createElement('div')
    total.className = 'visitors-layout__statistic'

    const label = document.createElement('span')
    label.textContent = 'Total visitors'

    const value = document.createElement('strong')
    value.textContent = '—'

    total.append(label, value)

    const devices = document.createElement('div')
    devices.className = 'visitors-layout__statistic'

    const devicesLabel = document.createElement('span')
    devicesLabel.textContent = 'Devices'

    const devicesValue = document.createElement('strong')
    devicesValue.textContent = 'PC · Mac · Mobile'

    devices.append(devicesLabel, devicesValue)

    this.statisticsArea.append(
      heading,
      description,
      total,
      devices,
      this.createPanelNotes(),
    )
  }

  private createPanelNotes(): HTMLElement {
    const notes = document.createElement('div')
    notes.className = 'visitors-layout__notes'
    notes.append(this.createMapCredit(), this.createPrivacyNotice())
    return notes
  }

  private createWorldMap(): void {
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
