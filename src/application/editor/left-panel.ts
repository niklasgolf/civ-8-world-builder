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
      new ToolSection('Map'),
      new ToolSection('Terrain'),
      new ToolSection('Resources'),
      new ToolSection('Features'),
      new ToolSection('Objects'),
    ]
    const undoButton = new ToolButton('undo', 'Undo', 'undo')
    const redoButton = new ToolButton('redo', 'Redo', 'redo')
    toolSections[0].addButton(undoButton)
    toolSections[0].addButton(redoButton)
    toolSections.forEach(section => this.scroll.append(section.element))
    this.element.append(this.scroll)
  }
}