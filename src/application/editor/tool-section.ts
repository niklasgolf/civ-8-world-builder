import { ToolButton } from './tool-button'

export class ToolSection {
  readonly element: HTMLElement
  readonly buttons: ToolButton[]
  readonly body: HTMLElement

  constructor(title: string) {
    this.buttons = []
    this.body = document.createElement('div')
    this.element = document.createElement('section')
    this.element.className = 'tool-section'

    const titleElement = document.createElement('h2')
    titleElement.className = 'tool-section__title'
    titleElement.textContent = title
    this.element.append(titleElement)

    this.body.className = 'tool-section__body'
    this.element.append(this.body)
  }

  public addButton(button: ToolButton): void {
    this.buttons.push(button)
    this.body.append(button.element)
  }
}