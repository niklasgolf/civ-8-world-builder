
export class VisitorsLayout {
  readonly element: HTMLElement
  readonly statisticsArea: HTMLElement
  readonly mapArea: HTMLElement
  readonly loginArea: HTMLElement

  constructor() {
    this.element = document.createElement('section')
    this.element.className = 'visitors-layout'
    this.element.setAttribute('aria-label', 'Visitors & Login')

    this.statisticsArea = document.createElement('aside')
    this.statisticsArea.className = 'visitors-layout__left-panel'

    this.mapArea = document.createElement('div')
    this.mapArea.className = 'visitors-layout__map-area'

    this.loginArea = document.createElement('aside')
    this.loginArea.className = 'visitors-layout__right-panel'

    this.createStatistics()
    this.createMapPlaceholder()
    this.createLoginPlaceholder()

    this.element.append(
      this.statisticsArea,
      this.mapArea,
      this.loginArea,
    )
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
    )
  }

  private createMapPlaceholder(): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Visitor World Map'

    const description = document.createElement('p')
    description.textContent =
      'Live visitor locations will appear on this map.'

    const placeholder = document.createElement('div')
    placeholder.className = 'visitors-layout__map-placeholder'

    const symbol = document.createElement('span')
    symbol.className = 'visitors-layout__map-symbol'
    symbol.textContent = '🌍'

    const message = document.createElement('span')
    message.textContent = 'Visitor map coming soon'

    placeholder.append(symbol, message)

    this.mapArea.append(
      heading,
      description,
      placeholder,
    )
  }

  private createLoginPlaceholder(): void {
    const heading = document.createElement('h1')
    heading.textContent = 'Login & Account'

    const description = document.createElement('p')
    description.textContent =
      'Sign in with Google to access your Civilization of Wonders account.'

    const status = document.createElement('div')
    status.className = 'visitors-layout__account-status'
    status.textContent = 'Authentication interface coming next'

    this.loginArea.append(
      heading,
      description,
      status,
    )
  }
}
