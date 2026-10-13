import { ToolSection } from './tool-section'

export class LeftPanel {
  readonly element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__left-panel'

    const toolSections = [
      new ToolSection('Map'),
      new ToolSection('Terrain'),
      new ToolSection('Resources'),
      new ToolSection('Features'),
      new ToolSection('Objects'),
    ]
    toolSections.forEach(section => this.element.append(section.element))
  }
}