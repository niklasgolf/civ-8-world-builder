
import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'

export class LeftPanel {
  readonly element: HTMLDivElement
  readonly scroll: HTMLDivElement
  private readonly heading: HTMLHeadingElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__left-panel'

    this.scroll = document.createElement('div')
    this.scroll.className = 'tool-panel__scroll'

    this.heading = document.createElement('h2')
    this.heading.className = 'tool-section__title'
    this.heading.textContent = 'Unedited Map'

    const headingContainer = document.createElement('div')
    headingContainer.className = 'tool-section world-panel__info'
    headingContainer.append(this.heading)

    const brushSection = new ToolSection('Brush')
    const terrainSection = new ToolSection('Terrain')
    const featuresSection = new ToolSection('Features')
    const resourcesSection = new ToolSection('Resources')
    const riversSection = new ToolSection('Rivers')

    terrainSection.grid.classList.add('terrain-grid')

    const smallBrushButton = new ToolButton(
      'brush-small',
      'Small brush',
      'brush-small',
      'brush',
    )
    const mediumBrushButton = new ToolButton(
      'brush-medium',
      'Medium brush',
      'brush-medium',
      'brush',
    )
    const largeBrushButton = new ToolButton(
      'brush-large',
      'Large brush',
      'brush-large',
      'brush',
    )
    const undoButton = new ToolButton('undo', 'Undo', 'undo')
    const redoButton = new ToolButton('redo', 'Redo', 'redo')

    const grassButton = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain',
    )
    const plainsButton = new ToolButton(
      'plains',
      'Plains',
      'plains',
      'terrain',
    )
    const desertButton = new ToolButton(
      'desert',
      'Desert',
      'desert',
      'terrain',
    )
    const tundraButton = new ToolButton(
      'tundra',
      'Tundra',
      'tundra',
      'terrain',
    )
    const snowButton = new ToolButton(
      'snow',
      'Snow',
      'snow',
      'terrain',
    )
    const coastButton = new ToolButton(
      'coast',
      'Coast',
      'coast',
      'terrain',
    )
    const oceanButton = new ToolButton(
      'ocean',
      'Ocean',
      'ocean',
      'terrain',
    )

    const woodsButton = new ToolButton(
      'woods',
      'Woods',
      'woods',
      'features',
    )
    const rainforestButton = new ToolButton(
      'rainforest',
      'Rainforest',
      'rainforest',
      'features',
    )
    const marshButton = new ToolButton(
      'marsh',
      'Marsh',
      'marsh',
      'features',
    )
    const oasisButton = new ToolButton(
      'oasis',
      'Oasis',
      'oasis',
      'features',
    )
    const floodplainsButton = new ToolButton(
      'floodplains',
      'Floodplains',
      'floodplains',
      'features',
    )
    const iceButton = new ToolButton(
      'ice',
      'Ice',
      'ice',
      'features',
    )
    const reefButton = new ToolButton(
      'reef',
      'Reef',
      'reef',
      'features',
    )
    const volcanoButton = new ToolButton(
      'volcano',
      'Volcano',
      'volcano',
      'features',
    )

    const wheatButton = new ToolButton(
      'wheat',
      'Wheat',
      'wheat',
      'resources',
    )
    const cattleButton = new ToolButton(
      'cattle',
      'Cattle',
      'cattle',
      'resources',
    )
    const horsesButton = new ToolButton(
      'horses',
      'Horses',
      'horses',
      'resources',
    )
    const deerButton = new ToolButton(
      'deer',
      'Deer',
      'deer',
      'resources',
    )
    const fishButton = new ToolButton(
      'fish',
      'Fish',
      'fish',
      'resources',
    )
    const stoneButton = new ToolButton(
      'stone',
      'Stone',
      'stone',
      'resources',
    )
    const ironButton = new ToolButton(
      'iron',
      'Iron',
      'iron',
      'resources',
    )
    const goldButton = new ToolButton(
      'gold',
      'Gold',
      'gold',
      'resources',
    )

    const riverButton = new ToolButton(
      'river',
      'River',
      'river',
      'rivers',
    )
    const riverSourceButton = new ToolButton(
      'river-source',
      'River source',
      'river-source',
      'rivers',
    )
    const riverMouthButton = new ToolButton(
      'river-mouth',
      'River mouth',
      'river-mouth',
      'rivers',
    )

    brushSection.addButton(smallBrushButton)
    brushSection.addButton(mediumBrushButton)
    brushSection.addButton(largeBrushButton)
    brushSection.addButton(undoButton)
    brushSection.addButton(redoButton)
    mediumBrushButton.setSelected(true)

    terrainSection.addButton(grassButton)
    terrainSection.addButton(plainsButton)
    terrainSection.addButton(desertButton)
    terrainSection.addButton(tundraButton)
    terrainSection.addButton(snowButton)
    terrainSection.addButton(coastButton)
    terrainSection.addButton(oceanButton)
    grassButton.setSelected(true)

    featuresSection.addButton(woodsButton)
    featuresSection.addButton(rainforestButton)
    featuresSection.addButton(marshButton)
    featuresSection.addButton(oasisButton)
    featuresSection.addButton(floodplainsButton)
    featuresSection.addButton(iceButton)
    featuresSection.addButton(reefButton)
    featuresSection.addButton(volcanoButton)

    resourcesSection.addButton(wheatButton)
    resourcesSection.addButton(cattleButton)
    resourcesSection.addButton(horsesButton)
    resourcesSection.addButton(deerButton)
    resourcesSection.addButton(fishButton)
    resourcesSection.addButton(stoneButton)
    resourcesSection.addButton(ironButton)
    resourcesSection.addButton(goldButton)

    riversSection.addButton(riverButton)
    riversSection.addButton(riverSourceButton)
    riversSection.addButton(riverMouthButton)

    this.scroll.append(
      brushSection.element,
      terrainSection.element,
      featuresSection.element,
      resourcesSection.element,
      riversSection.element,
    )

    this.element.append(headingContainer, this.scroll)
  }

  setWorldTitle(title: string): void {
    this.heading.textContent = title
  }
}
