
import { ToolButton } from './tool-button.ts'

export class TerrainButton extends ToolButton {
  constructor(
    id: string,
    label: string,
    createGraphic: () => SVGSVGElement,
  ) {
    super(id, label, 'grass', 'terrain')

    const graphic = createGraphic()
    graphic.classList.add('tool-icon')

    this.element.replaceChildren(graphic)
  }
}
