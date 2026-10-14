import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'

export class RightPanel {
  readonly element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__right-panel'

    const wonderSection = new ToolSection('Wonders')

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

    wonderSection.addButton(pyramidButton)
    wonderSection.addButton(colossusButton)
    wonderSection.addButton(lighthouseButton)
    wonderSection.addButton(templeButton)
    wonderSection.addButton(gardensButton)
    wonderSection.addButton(observatoryButton)

    this.element.append(wonderSection.element)
  }
}