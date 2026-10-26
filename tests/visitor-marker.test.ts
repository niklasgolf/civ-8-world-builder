import { describe, expect, it } from 'vitest'
import {
  addVisitorMarker,
  projectVisitorLocation,
  VISITOR_COLORS
} from '../src/application/visitors/visitor-marker.ts'

describe('Visitor location projection', () => {
  it('projects the center of the world map', () => {
    expect(projectVisitorLocation(0, 0)).toEqual({
      x: 2880,
      y: 1440
    })
  })

  it('projects the northwest corner', () => {
    expect(projectVisitorLocation(90, -180)).toEqual({
      x: 0,
      y: 0
    })
  })

  it('projects the southeast corner', () => {
    expect(projectVisitorLocation(-90, 180)).toEqual({
      x: 5760,
      y: 2880
    })
  })
})

describe('Visitor SVG markers', () => {
  const devices = ['windows', 'mac', 'mobile', 'other'] as const

  it.each(devices)('creates a correctly colored %s marker', (device) => {
    const map = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    const marker = addVisitorMarker(map, 0, 0, device)

    expect(marker.tagName.toLowerCase()).toBe('circle')
    expect(map.contains(marker)).toBe(true)

    expect(marker.getAttribute('cx')).toBe('2880')
    expect(marker.getAttribute('cy')).toBe('1440')
    expect(marker.getAttribute('r')).toBe('16')

    expect(marker.getAttribute('fill')).toBe(VISITOR_COLORS[device])
    expect(marker.getAttribute('stroke')).toBe('#0B2941')
    expect(marker.getAttribute('stroke-width')).toBe('0.5')
    expect(marker.getAttribute('vector-effect')).toBe('non-scaling-stroke')

    expect(
      marker.classList.contains('visitors-layout__visitor-marker')
    ).toBe(true)
  })

  it('returns the exact SVG element added to the map', () => {
    const map = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    const marker = addVisitorMarker(map, 56.66, 16.36, 'mac')

    expect(map.children.length).toBe(1)
    expect(map.firstElementChild).toBe(marker)
  })
})