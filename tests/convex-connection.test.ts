
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ClerkAuthentication } from '../src/application/authentication/clerk-authentication.ts'

const mocks = vi.hoisted(() => ({
  constructor: vi.fn(),
  setAuth: vi.fn(),
}))

vi.mock('convex/browser', () => ({
  ConvexClient: class {
    setAuth = mocks.setAuth

    constructor(url: string) {
      mocks.constructor(url)
    }
  },
}))

import { ConvexConnection } from '../src/application/database/convex-client.ts'

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('VITE_CONVEX_URL', 'https://example.convex.cloud')
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('ConvexConnection — existing behavior', () => {
  it('requires a Convex URL', () => {
    vi.stubEnv('VITE_CONVEX_URL', '')

    expect(() => new ConvexConnection()).toThrow(
      'VITE_CONVEX_URL is not configured',
    )
  })

  it('creates ConvexClient with the configured URL', () => {
    new ConvexConnection()

    expect(mocks.constructor).toHaveBeenCalledWith(
      'https://example.convex.cloud',
    )
  })

  it('exposes the Convex client publicly', () => {
    const connection = new ConvexConnection()

    expect(connection.client).toBeDefined()
    expect(connection.client.setAuth).toBe(mocks.setAuth)
  })

  it('registers the authentication callbacks', () => {
    const connection = new ConvexConnection()

    const authentication = {
      getConvexToken: vi.fn().mockResolvedValue('test-token'),
    } as unknown as ClerkAuthentication

    connection.connectAuthentication(authentication)

    expect(mocks.setAuth).toHaveBeenCalledOnce()
    expect(mocks.setAuth).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
    )
  })

  it('retrieves the Clerk token through the registered callback', async () => {
    const connection = new ConvexConnection()

    const getConvexToken = vi.fn().mockResolvedValue('test-token')

    const authentication = {
      getConvexToken,
    } as unknown as ClerkAuthentication

    connection.connectAuthentication(authentication)

    const tokenCallback = mocks.setAuth.mock.calls[0][0] as
      () => Promise<string | null>

    await expect(tokenCallback()).resolves.toBe('test-token')
    expect(getConvexToken).toHaveBeenCalledOnce()
  })

  it('resolves true when Convex confirms authentication', async () => {
    const connection = new ConvexConnection()

    const authentication = {
      getConvexToken: vi.fn().mockResolvedValue('test-token'),
    } as unknown as ClerkAuthentication

    const result = connection.connectAuthentication(authentication)

    const onAuthenticationChange = mocks.setAuth.mock.calls[0][1] as
      (authenticated: boolean) => void

    onAuthenticationChange(true)

    await expect(result).resolves.toBe(true)
  })

  it('resolves false when Convex rejects authentication', async () => {
    const connection = new ConvexConnection()

    const authentication = {
      getConvexToken: vi.fn().mockResolvedValue(null),
    } as unknown as ClerkAuthentication

    const result = connection.connectAuthentication(authentication)

    const onAuthenticationChange = mocks.setAuth.mock.calls[0][1] as
      (authenticated: boolean) => void

    onAuthenticationChange(false)

    await expect(result).resolves.toBe(false)
  })
})
