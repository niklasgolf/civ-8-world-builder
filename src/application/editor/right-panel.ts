
import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'

export class RightPanel {
  readonly element: HTMLDivElement
  readonly scroll: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__right-panel'

    this.scroll = document.createElement('div')
    this.scroll.className = 'tool-panel__scroll'

    const heading = document.createElement('h2')
    heading.className = 'tool-section__title'
    heading.textContent = 'Editor 1'

    const headingContainer = document.createElement('div')
    headingContainer.className = 'tool-section world-panel__info'
    headingContainer.append(heading)

    const wonderSection = new ToolSection('Wonders')
    const continentsSection = new ToolSection('Continents')
    const resourcesSection = new ToolSection('Resources')
    const improvementsSection = new ToolSection('Improvements')

    const pyramidButton = new ToolButton(
      'pyramid',
      'Pyramid',
      'pyramid',
      'wonders'
    )
    const colossusButton = new ToolButton(
      'colossus',
      'Colossus',
      'colossus',
      'wonders'
    )
    const lighthouseButton = new ToolButton(
      'lighthouse',
      'Lighthouse',
      'lighthouse',
      'wonders'
    )
    const templeButton = new ToolButton(
      'temple',
      'Temple',
      'temple',
      'wonders'
    )
    const gardensButton = new ToolButton(
      'gardens',
      'Gardens',
      'gardens',
      'wonders'
    )
    const observatoryButton = new ToolButton(
      'observatory',
      'Observatory',
      'observatory',
      'wonders'
    )

    const crimsonContinentButton = new ToolButton(
      'continent-crimson',
      'Crimson continent',
      'continent-crimson',
      'continents'
    )
    const blueContinentButton = new ToolButton(
      'continent-blue',
      'Blue continent',
      'continent-blue',
      'continents'
    )
    const greenContinentButton = new ToolButton(
      'continent-green',
      'Green continent',
      'continent-green',
      'continents'
    )
    const goldContinentButton = new ToolButton(
      'continent-gold',
      'Gold continent',
      'continent-gold',
      'continents'
    )
    const purpleContinentButton = new ToolButton(
      'continent-purple',
      'Purple continent',
      'continent-purple',
      'continents'
    )
    const orangeContinentButton = new ToolButton(
      'continent-orange',
      'Orange continent',
      'continent-orange',
      'continents'
    )

    const wheatButton = new ToolButton(
      'wheat',
      'Wheat',
      'wheat',
      'resources'
    )
    const cattleButton = new ToolButton(
      'cattle',
      'Cattle',
      'cattle',
      'resources'
    )
    const horsesButton = new ToolButton(
      'horses',
      'Horses',
      'horses',
      'resources'
    )
    const deerButton = new ToolButton(
      'deer',
      'Deer',
      'deer',
      'resources'
    )
    const fishButton = new ToolButton(
      'fish',
      'Fish',
      'fish',
      'resources'
    )
    const stoneButton = new ToolButton(
      'stone',
      'Stone',
      'stone',
      'resources'
    )
    const ironButton = new ToolButton(
      'iron',
      'Iron',
      'iron',
      'resources'
    )
    const goldButton = new ToolButton(
      'gold',
      'Gold',
      'gold',
      'resources'
    )

    const farmButton = new ToolButton(
      'farm',
      'Farm',
      'farm',
      'improvements'
    )
    const mineButton = new ToolButton(
      'mine',
      'Mine',
      'mine',
      'improvements'
    )
    const quarryButton = new ToolButton(
      'quarry',
      'Quarry',
      'quarry',
      'improvements'
    )
    const campButton = new ToolButton(
      'camp',
      'Camp',
      'camp',
      'improvements'
    )
    const pastureButton = new ToolButton(
      'pasture',
      'Pasture',
      'pasture',
      'improvements'
    )
    const fishingButton = new ToolButton(
      'fishing',
      'Fishing boats',
      'fishing',
      'improvements'
    )
    const plantationButton = new ToolButton(
      'plantation',
      'Plantation',
      'plantation',
      'improvements'
    )
    const fortButton = new ToolButton(
      'fort',
      'Fort',
      'fort',
      'improvements'
    )

    wonderSection.addButton(pyramidButton)
    wonderSection.addButton(colossusButton)
    wonderSection.addButton(lighthouseButton)
    wonderSection.addButton(templeButton)
    wonderSection.addButton(gardensButton)
    wonderSection.addButton(observatoryButton)

    continentsSection.addButton(crimsonContinentButton)
    continentsSection.addButton(blueContinentButton)
    continentsSection.addButton(greenContinentButton)
    continentsSection.addButton(goldContinentButton)
    continentsSection.addButton(purpleContinentButton)
    continentsSection.addButton(orangeContinentButton)

    resourcesSection.addButton(wheatButton)
    resourcesSection.addButton(cattleButton)
    resourcesSection.addButton(horsesButton)
    resourcesSection.addButton(deerButton)
    resourcesSection.addButton(fishButton)
    resourcesSection.addButton(stoneButton)
    resourcesSection.addButton(ironButton)
    resourcesSection.addButton(goldButton)

    improvementsSection.addButton(farmButton)
    improvementsSection.addButton(mineButton)
    improvementsSection.addButton(quarryButton)
    improvementsSection.addButton(campButton)
    improvementsSection.addButton(pastureButton)
    improvementsSection.addButton(fishingButton)
    improvementsSection.addButton(plantationButton)
    improvementsSection.addButton(fortButton)

    this.scroll.append(wonderSection.element)
    this.scroll.append(continentsSection.element)
    this.scroll.append(resourcesSection.element)
    this.scroll.append(improvementsSection.element)

    this.element.append(headingContainer, this.scroll)
  }
}
