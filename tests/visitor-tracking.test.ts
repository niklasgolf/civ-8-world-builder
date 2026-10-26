import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  detectVisitorDevice,
  detectVisitorLocation
} from '../src/application/visitors/visitor-tracking.ts'

describe('Visitor device detection', () => {
  it('detects Windows computers', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'

    expect(detectVisitorDevice(userAgent)).toBe('windows')
  })

  it('detects Mac computers', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/17.0 Safari/605.1.15'

    expect(detectVisitorDevice(userAgent)).toBe('mac')
  })

  it('detects mobile devices', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'

    expect(detectVisitorDevice(userAgent)).toBe('mobile')
  })

  it('returns other for an unknown device', () => {
    expect(detectVisitorDevice('UnknownDevice/1.0')).toBe('other')
  })
})

describe('Visitor location detection', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns valid coordinates', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        latitude: 56.66,
        longitude: 16.36
      })
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(detectVisitorLocation()).resolves.toEqual({
      latitude: 56.66,
      longitude: 16.36
    })

    expect(fetchMock).toHaveBeenCalledWith('/api/visitor-location')
  })

  it('rejects coordinates outside valid ranges', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        latitude: 95,
        longitude: 200
      })
    }))

    await expect(detectVisitorLocation()).resolves.toBeUndefined()
  })

  it('rejects unsuccessful API responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false
    }))

    await expect(detectVisitorLocation()).resolves.toBeUndefined()
  })

  it('rejects responses without success confirmation', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        latitude: 56.66,
        longitude: 16.36
      })
    }))

    await expect(detectVisitorLocation()).resolves.toBeUndefined()
  })

  it('handles network errors without throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(
      new Error('Network unavailable')
    ))

    await expect(detectVisitorLocation()).resolves.toBeUndefined()
  })
})