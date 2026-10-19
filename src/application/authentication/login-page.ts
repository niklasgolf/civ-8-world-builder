
import type { ClerkAuthentication } from './clerk-authentication.ts'

type FantasyIdentity = {
  authenticated: boolean
  role: 'admin' | 'editor' | 'visitor'
  fantasyName: string | null
  worldId: string | null
}

export class LoginPage {
  readonly element: HTMLElement

  private readonly authentication: ClerkAuthentication
  private readonly status: HTMLElement
  private readonly roleLabel: HTMLElement
  private readonly actionButton: HTMLButtonElement

  private onAuthenticationChange: (() => void) | null = null
  private currentUserId: string | null = null
  private fantasyIdentity: FantasyIdentity | null = null

  constructor(authentication: ClerkAuthentication) {
    this.authentication = authentication

    this.element = document.createElement('div')
    this.element.className = 'login-page'

    this.status = document.createElement('div')
    this.status.className = 'login-page__status'
    this.status.textContent = 'Checking authentication...'

    this.roleLabel = document.createElement('div')
    this.roleLabel.className = 'login-page__role'

    this.actionButton = document.createElement('button')
    this.actionButton.className = 'login-page__button'
    this.actionButton.type = 'button'
    this.actionButton.disabled = true

    this.actionButton.addEventListener('click', () => {
      void this.handleAction()
    })

    this.element.append(
      this.status,
      this.roleLabel,
      this.actionButton,
    )
  }

  public initialize(
    onAuthenticationChange?: () => void,
  ): void {
    this.onAuthenticationChange = onAuthenticationChange ?? null

    const clerk = this.authentication.getClerk()

    clerk.addListener(() => {
      this.updateAuthenticationState()
    })

    this.updateAuthenticationState()
  }

  public setFantasyIdentity(
    identity: FantasyIdentity | null,
  ): void {
    this.fantasyIdentity = identity
    this.render()
  }

  private updateAuthenticationState(): void {
    const userId = this.authentication.getUserId()

    if (userId !== this.currentUserId) {
      this.currentUserId = userId
      this.fantasyIdentity = null

      this.render()
      this.onAuthenticationChange?.()
      return
    }

    this.render()
  }

  private render(): void {
    const isSignedIn = this.authentication.isSignedIn()

    if (!isSignedIn) {
      this.status.textContent = 'Visitor'
      this.roleLabel.textContent = ''
      this.actionButton.textContent = 'Sign in with Google'
    } else {
      const identity = this.fantasyIdentity

      if (!identity) {
        this.status.textContent = 'Loading fantasy identity...'
        this.roleLabel.textContent = ''
      } else if (identity.role === 'visitor') {
        this.status.textContent = 'Visitor'
        this.roleLabel.textContent = ''
      } else {
        this.status.textContent =
          identity.fantasyName ?? 'Visitor'

        this.roleLabel.textContent =
          identity.role === 'admin'
            ? 'Administrator'
            : 'Editor'
      }

      this.actionButton.textContent = 'Sign out'
    }

    this.actionButton.disabled = false
  }

  private async handleAction(): Promise<void> {
    const clerk = this.authentication.getClerk()

    this.actionButton.disabled = true

    try {
      if (this.authentication.isSignedIn()) {
        await clerk.signOut()
      } else {
        await clerk.redirectToSignIn({
          signInForceRedirectUrl: `${window.location.origin}/`,
        })
      }
    } catch (error: unknown) {
      console.error('Authentication action failed:', error)

      this.status.textContent =
        'Authentication failed. Please try again.'
    } finally {
      this.updateAuthenticationState()
    }
  }
}
