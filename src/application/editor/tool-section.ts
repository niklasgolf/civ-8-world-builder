
import { ToolButton } from './tool-button'

export class ToolSection {
  private readonly grid: HTMLDivElement
  readonly element: HTMLElement
  private readonly buttons: ToolButton[]
  private readonly body: HTMLElement

  constructor(title: string) {
    this.buttons = []
    this.body = document.createElement('div')
    this.grid = document.createElement('div')
    this.grid.className = 'tool-grid'

    this.element = document.createElement('section')
    this.element.className = 'tool-section'

    const titleElement = document.createElement('h2')
    titleElement.className = 'tool-section__title'
    titleElement.textContent = title
    this.element.append(titleElement)

    this.body.className = 'tool-section__body'
    this.element.append(this.body)
    this.body.append(this.grid)
  }

  public addGridClass(className: string): void {
    this.grid.classList.add(className)
  }

  public addButton(button: ToolButton): void {
    this.buttons.push(button)
    this.grid.append(button.element)
    button.element.addEventListener('click', () => this.select(button))
  }

  public setUnavailable(): void {
    this.element.classList.add('tool-section--unavailable')

    this.buttons.forEach(button => {
      button.element.disabled = true
    })
  }

  private select(button: ToolButton): void {
    if (!button.group) {
      return
    }

    this.buttons.forEach(otherButton => {
      if (otherButton.group === button.group) {
        otherButton.setSelected(otherButton === button)
      }
    })
  }
}
