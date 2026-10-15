
import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'
import { MapArea } from './map-area'

export class EditorLayout {
  readonly element: HTMLDivElement
  readonly mapArea: MapArea

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout'

    const leftPanel = new LeftPanel()

    this.mapArea = new MapArea()

    const rightPanel = new RightPanel()

    this.element.append(
      leftPanel.element,
      this.mapArea.element,
      rightPanel.element,
    )
  }
}
