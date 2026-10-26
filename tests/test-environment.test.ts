import { describe, expect, it } from 'vitest'

describe('Test environment', () => {
  it('can create HTML elements with happy-dom', () => {
    const button = document.createElement('button')
    button.textContent = 'Civilization of Wonders'

    expect(button.textContent).toBe('Civilization of Wonders')
    expect(button instanceof HTMLButtonElement).toBe(true)
  })

  it('can create SVG elements with happy-dom', () => {
    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    svg.setAttribute('viewBox', '0 0 260 300')

    expect(svg.getAttribute('viewBox')).toBe('0 0 260 300')
    expect(svg instanceof SVGSVGElement).toBe(true)
  })

  it('can test ordinary TypeScript logic', () => {
    const coordinates = { x: 12, y: 4 }

    expect(coordinates.x + coordinates.y).toBe(16)
  })
})