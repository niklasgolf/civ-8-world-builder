export class RightPanel {
  readonly element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__right-panel'
  }
}