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