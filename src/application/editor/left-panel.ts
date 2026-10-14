import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'

export class LeftPanel {
  readonly element: HTMLDivElement
  readonly scroll: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__left-panel'
    this.scroll = document.createElement('div')
    this.scroll.className = 'tool-panel__scroll'

    const toolSections = [
      new ToolSection('Terrain'),
      new ToolSection('Features'),
      new ToolSection('Rivers'),
      new ToolSection('Brush'),
    ]
    const grassButton = new ToolButton(
      'grass',
      'Grass',
      'grass',
      'terrain'
    )
    const plainsButton = new ToolButton(
      'plains',
      'Plains',
      'plains',
      'terrain'
    )
    const desertButton = new ToolButton(
      'desert',
      'Desert',
      'desert',
      'terrain'
    )
    const tundraButton = new ToolButton(
      'tundra',
      'Tundra',
      'tundra',
      'terrain'
    )
    const snowButton = new ToolButton(
      'snow',
      'Snow',
      'snow',
      'terrain'
    )
    const coastButton = new ToolButton(
      'coast',
      'Coast',
      'coast',
      'terrain'
    )
    const oceanButton = new ToolButton(
      'ocean',
      'Ocean',
      'ocean',
      'terrain'
    )
    const woodsButton = new ToolButton(
      'woods',
      'Woods',
      'woods',
      'features'
    )
    const rainforestButton = new ToolButton(
      'rainforest',
      'Rainforest',
      'rainforest',
      'features'
    )
    const marshButton = new ToolButton(
      'marsh',
      'Marsh',
      'marsh',
      'features'
    )
    const oasisButton = new ToolButton(
      'oasis',
      'Oasis',
      'oasis',
      'features'
    )
    const floodplainsButton = new ToolButton(
      'floodplains',
      'Floodplains',
      'floodplains',
      'features'
    )
    const iceButton = new ToolButton(
      'ice',
      'Ice',
      'ice',
      'features'
    )
    const reefButton = new ToolButton(
      'reef',
      'Reef',
      'reef',
      'features'
    )
    const volcanoButton = new ToolButton(
      'volcano',
      'Volcano',
      'volcano',
      'features'
    )
    const smallBrushButton = new ToolButton(
      'brush-small',
      'Small brush',
      'brush-small',
      'brush'
    )
    const mediumBrushButton = new ToolButton(
      'brush-medium',
      'Medium brush',
      'brush-medium',
      'brush'
    )
    const largeBrushButton = new ToolButton(
      'brush-large',
      'Large brush',
      'brush-large',
      'brush'
    )
    const undoButton = new ToolButton('undo', 'Undo', 'undo')
    const redoButton = new ToolButton('redo', 'Redo', 'redo')
    toolSections[0].addButton(grassButton)
    toolSections[0].addButton(plainsButton)
    toolSections[0].addButton(desertButton)
    toolSections[0].addButton(tundraButton)
    toolSections[0].addButton(snowButton)
    toolSections[0].addButton(coastButton)
    toolSections[0].addButton(oceanButton)
    toolSections[1].addButton(woodsButton)
    toolSections[1].addButton(rainforestButton)
    toolSections[1].addButton(marshButton)
    toolSections[1].addButton(oasisButton)
    toolSections[1].addButton(floodplainsButton)
    toolSections[1].addButton(iceButton)
    toolSections[1].addButton(reefButton)
    toolSections[1].addButton(volcanoButton)
    grassButton.setSelected(true)
    toolSections[3].addButton(smallBrushButton)
    toolSections[3].addButton(mediumBrushButton)
    mediumBrushButton.setSelected(true)
    toolSections[3].addButton(largeBrushButton)
    toolSections[3].addButton(undoButton)
    toolSections[3].addButton(redoButton)
    toolSections.forEach(section => this.scroll.append(section.element))
    this.element.append(this.scroll)
  }
}