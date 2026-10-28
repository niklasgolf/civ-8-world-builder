
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ClerkAuthentication } from '../src/application/authentication/clerk-authentication.ts'
import { LoginPage } from '../src/application/authentication/login-page.ts'

type FakeAuthentication = {
  isSignedIn: ReturnType<typeof vi.fn>
  getUserId: ReturnType<typeof vi.fn>
  onAuthenticationChange: ReturnType<typeof vi.fn>
  signIn: ReturnType<typeof vi.fn>
  signOut: ReturnType<typeof vi.fn>
}

function createPage(): {
  page: LoginPage
  authentication: FakeAuthentication
  notify: () => void
} {
  let notify = () => { }

  const authentication: FakeAuthentication = {
    isSignedIn: vi.fn().mockReturnValue(false),
    getUserId: vi.fn().mockReturnValue(null),
    onAuthenticationChange: vi.fn((callback: () => void) => {
      notify = callback
    }),
    signIn: vi.fn().mockResolvedValue(undefined),
    signOut: vi.fn().mockResolvedValue(undefined),
  }

  const page = new LoginPage(
    authentication as unknown as ClerkAuthentication,
  )

  return {
    page,
    authentication,
    notify: () => notify(),
  }
}

function getButton(page: LoginPage): HTMLButtonElement {
  const button = page.element.querySelector('button')

  if (!(button instanceof HTMLButtonElement)) {
    throw new Error('Login button was not created')
  }

  return button
}

async function clickAndWait(button: HTMLButtonElement): Promise<void> {
  button.click()

  await vi.waitFor(() => {
    expect(button.disabled).toBe(false)
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('LoginPage — existing behavior', () => {
  it('creates the login page structure', () => {
    const { page } = createPage()

    expect(page.element.className).toBe('login-page')
    expect(page.element.children).toHaveLength(3)
    expect(page.element.querySelector('.login-page__status')).not.toBeNull()
    expect(page.element.querySelector('.login-page__role')).not.toBeNull()
    expect(getButton(page).disabled).toBe(true)
  })

  it('shows the signed-out visitor view', () => {
    const { page } = createPage()

    page.initialize()

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('Visitor')

    expect(getButton(page).textContent).toBe('Sign in with Google')
    expect(getButton(page).disabled).toBe(false)
  })

  it('registers an authentication listener', () => {
    const { page, authentication } = createPage()

    page.initialize()

    expect(authentication.onAuthenticationChange).toHaveBeenCalledOnce()
    expect(
      authentication.onAuthenticationChange.mock.calls[0][0],
    ).toBeTypeOf('function')
  })

  it('shows the loading identity state when signed in', () => {
    const { page, authentication } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('user_123')

    page.initialize()

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('Loading fantasy identity...')
    expect(getButton(page).textContent).toBe('Sign out')
  })

  it('displays the administrator fantasy identity', () => {
    const { page, authentication } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('admin_123')
    page.initialize()

    page.setFantasyIdentity({
      authenticated: true,
      role: 'admin',
      fantasyName: 'High Chancellor',
      worldId: null,
    })

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('High Chancellor')
    expect(
      page.element.querySelector('.login-page__role')?.textContent,
    ).toBe('Administrator')
  })

  it('displays the editor fantasy identity', () => {
    const { page, authentication } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('editor_123')
    page.initialize()

    page.setFantasyIdentity({
      authenticated: true,
      role: 'editor',
      fantasyName: 'World Builder',
      worldId: 'world_1',
    })

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('World Builder')
    expect(
      page.element.querySelector('.login-page__role')?.textContent,
    ).toBe('Editor')
  })

  it('shows Visitor for a signed-in visitor identity', () => {
    const { page, authentication } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('visitor_123')
    page.initialize()

    page.setFantasyIdentity({
      authenticated: true,
      role: 'visitor',
      fantasyName: null,
      worldId: null,
    })

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('Visitor')
    expect(getButton(page).textContent).toBe('Sign out')
  })

  it('notifies the application when the user changes', () => {
    const { page, authentication, notify } = createPage()
    const callback = vi.fn()

    page.initialize(callback)

    authentication.getUserId.mockReturnValue('user_456')
    authentication.isSignedIn.mockReturnValue(true)
    notify()

    expect(callback).toHaveBeenCalledOnce()
  })

  it('clears the previous fantasy identity when the user changes', () => {
    const { page, authentication, notify } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('user_1')
    page.initialize()

    page.setFantasyIdentity({
      authenticated: true,
      role: 'admin',
      fantasyName: 'First Ruler',
      worldId: null,
    })

    authentication.getUserId.mockReturnValue('user_2')
    notify()

    expect(
      page.element.querySelector('.login-page__status')?.textContent,
    ).toBe('Loading fantasy identity...')
  })

  it('calls signIn when the visitor clicks the button', async () => {
    const { page, authentication } = createPage()

    page.initialize()
    await clickAndWait(getButton(page))

    expect(authentication.signIn).toHaveBeenCalledOnce()
    expect(authentication.signOut).not.toHaveBeenCalled()
  })

  it('calls signOut when a signed-in user clicks the button', async () => {
    const { page, authentication } = createPage()

    authentication.isSignedIn.mockReturnValue(true)
    authentication.getUserId.mockReturnValue('user_123')
    page.initialize()

    await clickAndWait(getButton(page))

    expect(authentication.signOut).toHaveBeenCalledOnce()
    expect(authentication.signIn).not.toHaveBeenCalled()
  })

  it('shows an error when sign-in fails', async () => {
    const { page, authentication } = createPage()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    authentication.signIn.mockRejectedValue(new Error('Sign-in failed'))

    page.initialize()
    await clickAndWait(getButton(page))

    expect(authentication.signIn).toHaveBeenCalledOnce()
    expect(consoleSpy).toHaveBeenCalledOnce()

    consoleSpy.mockRestore()
  })
})

describe('LoginPage — encapsulation', () => {
  it('does not expose internal fields', () => {
    const { page } = createPage()
    const properties = Object.getOwnPropertyNames(page)

    for (const field of [
      'authentication',
      'status',
      'roleLabel',
      'actionButton',
      'onAuthenticationChange',
      'currentUserId',
      'fantasyIdentity',
    ]) {
      expect(properties).not.toContain(field)
    }
  })

  it('does not expose internal methods', () => {
    const { page } = createPage()

    for (const method of [
      'updateAuthenticationState',
      'render',
      'handleAction',
    ]) {
      expect(method in page).toBe(false)
    }
  })

  it('preserves the public interface', () => {
    const { page } = createPage()

    expect(page.element).toBeInstanceOf(HTMLElement)
    expect(page.initialize).toBeTypeOf('function')
    expect(page.setFantasyIdentity).toBeTypeOf('function')
  })
})
