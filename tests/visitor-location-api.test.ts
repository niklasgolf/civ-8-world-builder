import { describe, expect, it } from 'vitest'
import { GET } from '../api/visitor-location.ts'

function createRequest(
  latitude?: string,
  longitude?: string
): Request {
  const headers = new Headers()

  if (latitude !== undefined) {
    headers.set('x-vercel-ip-latitude', latitude)
  }

  if (longitude !== undefined) {
    headers.set('x-vercel-ip-longitude', longitude)
  }

  return new Request('https://example.com/api/visitor-location', {
    headers
  })
}

describe('Visitor location API', () => {
  it('returns valid coordinates', async () => {
    const response = GET(createRequest('56.66', '16.36'))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      success: true,
      latitude: 56.66,
      longitude: 16.36
    })
  })

  it('accepts boundary coordinates', async () => {
    const response = GET(createRequest('-90', '180'))

    expect(await response.json()).toEqual({
      success: true,
      latitude: -90,
      longitude: 180
    })
  })

  it('rejects missing latitude', async () => {
    const response = GET(createRequest(undefined, '16.36'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('rejects missing longitude', async () => {
    const response = GET(createRequest('56.66'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('rejects empty coordinates', async () => {
    const response = GET(createRequest(' ', '16.36'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('rejects nonnumeric coordinates', async () => {
    const response = GET(createRequest('invalid', '16.36'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('rejects latitude outside the valid range', async () => {
    const response = GET(createRequest('91', '16.36'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('rejects longitude outside the valid range', async () => {
    const response = GET(createRequest('56.66', '-181'))

    expect(await response.json()).toEqual({ success: false })
  })

  it('prevents caching of visitor coordinates', () => {
    const response = GET(createRequest('56.66', '16.36'))

    expect(response.headers.get('Cache-Control')).toBe(
      'private, no-store'
    )
  })

  it('prevents caching of invalid responses', () => {
    const response = GET(createRequest('invalid', '16.36'))

    expect(response.headers.get('Cache-Control')).toBe(
      'private, no-store'
    )
  })
})