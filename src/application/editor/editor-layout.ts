
import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'
import { MapArea } from './map-area'

export class EditorLayout {
  readonly element: HTMLDivElement
  readonly mapArea: MapArea
  readonly leftPanel: LeftPanel
  readonly rightPanel: RightPanel

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout'

    this.leftPanel = new LeftPanel()
    this.mapArea = new MapArea()

    // Connect the minimap to the existing world map.
    this.rightPanel = new RightPanel(this.mapArea.mapGrid)

    this.element.append(
      this.leftPanel.element,
      this.mapArea.element,
      this.rightPanel.element,
    )
  }

  setWorldInformation(worldTitle: string, editorTitle: string): void {
    this.leftPanel.setWorldTitle(worldTitle)
    this.rightPanel.setEditorTitle(editorTitle)
  }
}
