
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
  const clerk = {
    load: vi.fn(),
    addListener: vi.fn(),
    redirectToSignIn: vi.fn(),
    signOut: vi.fn(),
    isSignedIn: false,
    user: null as { id: string } | null,
    session: null as { getToken: () => Promise<string | null> } | null,
  }

  return {
    clerk,
    constructor: vi.fn(),
  }
})

vi.mock('@clerk/clerk-js', () => ({
  Clerk: class {
    constructor(key: string) {
      mocks.constructor(key)
      return mocks.clerk
    }
  },
}))

import { ClerkAuthentication } from '../src/application/authentication/clerk-authentication.ts'

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', 'pk_test_example')

  mocks.clerk.isSignedIn = false
  mocks.clerk.user = null
  mocks.clerk.session = null
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('ClerkAuthentication — existing behavior', () => {
  it('requires a publishable key', () => {
    vi.stubEnv('VITE_CLERK_PUBLISHABLE_KEY', '')

    expect(() => new ClerkAuthentication()).toThrow(
      'Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local',
    )
  })

  it('creates Clerk using the publishable key', () => {
    new ClerkAuthentication()

    expect(mocks.constructor).toHaveBeenCalledWith('pk_test_example')
  })

  it('loads Clerk during initialization', async () => {
    const authentication = new ClerkAuthentication()

    await authentication.initialize()

    expect(mocks.clerk.load).toHaveBeenCalledOnce()
  })

  it('reports signed-out status', () => {
    const authentication = new ClerkAuthentication()

    expect(authentication.isSignedIn()).toBe(false)
    expect(authentication.getUserId()).toBeNull()
  })

  it('reports signed-in status and user identity', () => {
    mocks.clerk.isSignedIn = true
    mocks.clerk.user = { id: 'user_123' }

    const authentication = new ClerkAuthentication()

    expect(authentication.isSignedIn()).toBe(true)
    expect(authentication.getUserId()).toBe('user_123')
  })

  it('returns null when no session token is available', async () => {
    const authentication = new ClerkAuthentication()

    await expect(authentication.getConvexToken()).resolves.toBeNull()
  })

  it('returns the session token for Convex', async () => {
    const getToken = vi.fn().mockResolvedValue('test-token')
    mocks.clerk.session = { getToken }

    const authentication = new ClerkAuthentication()

    await expect(authentication.getConvexToken()).resolves.toBe('test-token')
    expect(getToken).toHaveBeenCalledOnce()
  })

  it('registers an authentication change listener', () => {
    const authentication = new ClerkAuthentication()
    const callback = vi.fn()

    authentication.onAuthenticationChange(callback)

    expect(mocks.clerk.addListener).toHaveBeenCalledWith(callback)
  })

  it('redirects to Google sign-in with the original return URL', async () => {
    const authentication = new ClerkAuthentication()

    await authentication.signIn()

    expect(mocks.clerk.redirectToSignIn).toHaveBeenCalledWith({
      signInForceRedirectUrl: `${window.location.origin}/`,
    })
  })

  it('signs out using Clerk', async () => {
    const authentication = new ClerkAuthentication()

    await authentication.signOut()

    expect(mocks.clerk.signOut).toHaveBeenCalledOnce()
  })
})

describe('ClerkAuthentication — encapsulation', () => {
  it('does not expose the Clerk instance', () => {
    const authentication = new ClerkAuthentication()
    const properties = Object.getOwnPropertyNames(authentication)

    expect(properties).not.toContain('clerk')
    expect('getClerk' in authentication).toBe(false)
  })
})
