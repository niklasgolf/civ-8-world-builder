import { LeftPanel } from './left-panel'
import { RightPanel } from './right-panel'

export class EditorLayout {
    readonly element: HTMLDivElement
    constructor() {
        this.element = document.createElement('div')
        this.element.className = 'editor-layout'

        const leftPanel = new LeftPanel()

        const mapArea = document.createElement('div')
        mapArea.className = 'editor-layout__map-area'

        const rightPanel = new RightPanel()
        
        this.element.append(leftPanel.element, mapArea, rightPanel.element)
    }
}