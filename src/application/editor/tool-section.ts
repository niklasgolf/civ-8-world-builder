export class ToolSection {
  readonly element: HTMLElement

  constructor(title: string) {
    this.element = document.createElement('section')
    this.element.className = 'tool-section'

    const titleElement = document.createElement('h2')
    titleElement.className = 'tool-section__title'
    titleElement.textContent = title
    this.element.append(titleElement)

    const toolsElement = document.createElement('div')
    toolsElement.className = 'tool-section__body'
    this.element.append(toolsElement)
  }
}