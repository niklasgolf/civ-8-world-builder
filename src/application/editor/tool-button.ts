import { createIcon, type IconName } from '../../library-svg-graphics/icons/icons'

export class ToolButton {
  readonly element: HTMLButtonElement
  readonly id: string
  readonly group: string | undefined

  constructor(id: string, label: string, icon: IconName, group?: string) {
    this.element = document.createElement('button')
    this.element.className = 'tool-button'
    this.element.type = 'button'
    this.element.title = label
    this.element.setAttribute('aria-label', label)
    this.id = id
    this.group = group
    if (this.group) {
      this.element.setAttribute('aria-pressed', 'false')
    }
    this.element.append(createIcon(icon))
  }

  public setSelected(selected: boolean): void {
    this.element.classList.toggle('is-selected', selected)
    if (this.group) {
      this.element.setAttribute('aria-pressed', selected.toString())
    }
  }
}