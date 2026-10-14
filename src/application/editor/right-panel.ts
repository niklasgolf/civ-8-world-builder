import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'

export class RightPanel {
  readonly element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__right-panel'

    const wonderSection = new ToolSection('Wonders')
    const continentsSection = new ToolSection('Continents')

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

    this.element.append(wonderSection.element)
    this.element.append(continentsSection.element)
  }
}