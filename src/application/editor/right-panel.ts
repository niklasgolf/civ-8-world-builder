
import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'
import { EditorActionButton } from './editor-action-button'

export class RightPanel {
  readonly element: HTMLDivElement
  readonly scroll: HTMLDivElement

  private readonly heading: HTMLHeadingElement
  private readonly editingStatus: HTMLDivElement
  private readonly likeButton: EditorActionButton
  private readonly editButton: EditorActionButton
  private readonly takeoverButton: EditorActionButton

  private onEditAction: (() => void) | null = null
  private onTakeoverAction: (() => void) | null = null

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__right-panel'

    this.scroll = document.createElement('div')
    this.scroll.className = 'tool-panel__scroll'

    this.heading = document.createElement('h2')
    this.heading.className = 'tool-section__title'
    this.heading.textContent = 'Unassigned'

    const headingContainer = document.createElement('div')
    headingContainer.className = 'tool-section world-panel__info'

    this.editingStatus = document.createElement('div')
    this.editingStatus.className = 'editor-panel__status'
    this.editingStatus.textContent = 'Viewing mode'

    const headingRow = document.createElement('div')
    headingRow.className = 'editor-panel__heading-row'

    const headingLine = document.createElement('div')
    headingLine.className = 'editor-panel__heading-line'

    headingRow.append(
      this.editingStatus,
      headingLine,
      this.heading,
    )

    this.likeButton = new EditorActionButton(
      'Like',
      'like',
      () => { },
    )
    this.likeButton.setDisabled(true)
    this.likeButton.element.title = 'Likes coming soon'

    this.editButton = new EditorActionButton(
      'Edit',
      'edit',
      () => {
        this.onEditAction?.()
      },
    )

    this.takeoverButton = new EditorActionButton(
      'Take Over',
      'take-over',
      () => {
        this.onTakeoverAction?.()
      },
    )

    // Editing controls remain hidden until authorization.
    this.editButton.setVisible(false)
    this.takeoverButton.setVisible(false)

    const actionContainer = document.createElement('div')
    actionContainer.className = 'editor-panel__actions'
    actionContainer.append(
      this.likeButton.element,
      this.editButton.element,
      this.takeoverButton.element,
    )

    headingContainer.append(
      headingRow,
      actionContainer,
    )

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

  public setEditorTitle(title: string): void {
    this.heading.textContent = title
  }

  public setEditingStatus(status: string): void {
    this.editingStatus.textContent = status
  }

  public setEditing(isEditing: boolean): void {
    this.editButton.setLabel(
      isEditing ? 'Stop Editing' : 'Edit',
    )

    this.editButton.setIcon(
      isEditing ? 'stop-editing' : 'edit',
    )
  }

  public setEditButtonVisible(visible: boolean): void {
    this.editButton.setVisible(visible)
  }

  public setTakeoverButtonVisible(visible: boolean): void {
    this.takeoverButton.setVisible(visible)
  }

  public setEditingButtonsDisabled(disabled: boolean): void {
    this.editButton.setDisabled(disabled)
    this.takeoverButton.setDisabled(disabled)
  }

  public onEdit(callback: () => void): void {
    this.onEditAction = callback
  }

  public onTakeover(callback: () => void): void {
    this.onTakeoverAction = callback
  }
}
