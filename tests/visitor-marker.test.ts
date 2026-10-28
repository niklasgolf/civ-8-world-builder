import { describe, expect, it } from 'vitest'
import { projectVisitorOnKalmarMap } from '../src/library-svg-graphics/visitor-map-kalmar/kalmar-map.ts'
import { projectVisitorOnSverigeMap } from '../src/library-svg-graphics/visitor-map-sverige/sverige-map.ts'
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

  it('skips a marker when the placement is outside that map', () => {
    const map = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    const marker = addVisitorMarker(map, 55.6761, 12.5683, 'other', {
      project: projectVisitorOnSverigeMap,
      radius: 9.58
    })

    expect(marker).toBeNull()
    expect(map.children.length).toBe(0)
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

describe('Detailed visitor map projections', () => {
  it('places Kalmar inside both detailed maps', () => {
    const kalmar = projectVisitorOnKalmarMap(56.6634, 16.3616)
    const sweden = projectVisitorOnSverigeMap(56.6634, 16.3616)

    expect(kalmar).not.toBeNull()
    expect(sweden).not.toBeNull()
    expect(kalmar?.x).toBeCloseTo(1246.3982, 4)
    expect(kalmar?.y).toBeCloseTo(588.8056, 4)
    expect(sweden?.x).toBeCloseTo(522.6904, 4)
    expect(sweden?.y).toBeCloseTo(751.0466, 4)
  })

  it('places Stockholm, Göteborg and Malmö on Sweden only', () => {
    for (const [latitude, longitude] of [
      [59.3293, 18.0686],
      [57.7089, 11.9746],
      [55.605, 13.0007]
    ]) {
      expect(projectVisitorOnSverigeMap(latitude, longitude)).not.toBeNull()
      expect(projectVisitorOnKalmarMap(latitude, longitude)).toBeNull()
    }
  })

  it('keeps Kalmarsund on the Kalmar map and off the Sweden land', () => {
    expect(projectVisitorOnKalmarMap(56.66, 16.45)).not.toBeNull()
    expect(projectVisitorOnSverigeMap(56.66, 16.45)).toBeNull()
  })

  it('excludes Denmark, Norway and a point north of the Sweden crop', () => {
    expect(projectVisitorOnSverigeMap(55.6761, 12.5683)).toBeNull()
    expect(projectVisitorOnKalmarMap(55.6761, 12.5683)).toBeNull()
    expect(projectVisitorOnSverigeMap(59.124, 11.387)).toBeNull()
    expect(projectVisitorOnSverigeMap(61.2, 17.1)).toBeNull()
    expect(projectVisitorOnKalmarMap(59.9139, 10.7522)).toBeNull()
  })
})