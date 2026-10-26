
import {
  createEditorActionIcon,
  type EditorActionIconName,
} from './editor-action-icons.ts'

export class EditorActionButton {
  readonly element: HTMLButtonElement

  readonly #iconContainer: HTMLSpanElement
  readonly #labelElement: HTMLSpanElement

  constructor(
    label: string,
    icon: EditorActionIconName,
    onClick: () => void,
  ) {
    this.element = document.createElement('button')
    this.element.className = 'tool-button editor-action-button'
    this.element.type = 'button'

    this.#iconContainer = document.createElement('span')
    this.#iconContainer.className = 'editor-action-button__icon'

    const svg = createEditorActionIcon(icon)
    svg.classList.add('tool-icon')
    this.#iconContainer.append(svg)

    this.#labelElement = document.createElement('span')
    this.#labelElement.className = 'editor-action-button__label'
    this.#labelElement.textContent = label

    this.element.append(
      this.#iconContainer,
      this.#labelElement,
    )

    this.element.addEventListener('click', onClick)
  }

  public setLabel(label: string): void {
    this.#labelElement.textContent = label
  }

  public setIcon(icon: EditorActionIconName): void {
    const svg = createEditorActionIcon(icon)
    svg.classList.add('tool-icon')
    this.#iconContainer.replaceChildren(svg)
  }

  public setDisabled(disabled: boolean): void {
    this.element.disabled = disabled
  }

  public setVisible(visible: boolean): void {
    this.element.hidden = !visible
  }
}
