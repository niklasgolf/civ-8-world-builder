export class MapArea {
  readonly element: HTMLDivElement

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__map-area'
  }
}