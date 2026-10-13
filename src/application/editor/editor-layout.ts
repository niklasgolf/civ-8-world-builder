import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'
import { MapArea } from './map-area'

export class EditorLayout {
    readonly element: HTMLDivElement
    constructor() {
        this.element = document.createElement('div')
        this.element.className = 'editor-layout'

        const leftPanel = new LeftPanel()

        const mapArea = new MapArea()

        const rightPanel = new RightPanel()
        
        this.element.append(leftPanel.element, mapArea.element, rightPanel.element)
    }
}