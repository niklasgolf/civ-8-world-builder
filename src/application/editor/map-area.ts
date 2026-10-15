
import { MapGrid } from '../map/map-grid.ts'

export class MapArea {
  readonly element: HTMLDivElement
  readonly mapGrid: MapGrid

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__map-area'

    this.mapGrid = new MapGrid()
    this.element.append(this.mapGrid.element)
  }
}
