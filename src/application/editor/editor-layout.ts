export class EditorLayout {
    readonly element: HTMLDivElement
    constructor() {
        this.element = document.createElement('div')
        this.element.className = 'editor-layout'

        const leftPanel = document.createElement('div')
        leftPanel.className = 'editor-layout__left-panel'

        const mapArea = document.createElement('div')
        mapArea.className = 'editor-layout__map-area'

        const rightPanel = document.createElement('div')
        rightPanel.className = 'editor-layout__right-panel'
        
        this.element.append(leftPanel, mapArea, rightPanel)
    }
}