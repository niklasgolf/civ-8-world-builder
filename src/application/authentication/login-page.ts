
import type { ClerkAuthentication } from './clerk-authentication.ts'

type FantasyIdentity = {
  authenticated: boolean
  role: 'admin' | 'editor' | 'visitor'
  fantasyName: string | null
  worldId: string | null
}

export class LoginPage {
  readonly element: HTMLElement

  readonly #authentication: ClerkAuthentication
  readonly #status: HTMLElement
  readonly #roleLabel: HTMLElement
  readonly #actionButton: HTMLButtonElement

  #onAuthenticationChange: (() => void) | null = null
  #currentUserId: string | null = null
  #fantasyIdentity: FantasyIdentity | null = null

  constructor(authentication: ClerkAuthentication) {
    this.#authentication = authentication

    this.element = document.createElement('div')
    this.element.className = 'login-page'

    this.#status = document.createElement('div')
    this.#status.className = 'login-page__status'
    this.#status.textContent = 'Checking authentication...'

    this.#roleLabel = document.createElement('div')
    this.#roleLabel.className = 'login-page__role'

    this.#actionButton = document.createElement('button')
    this.#actionButton.className = 'login-page__button'
    this.#actionButton.type = 'button'
    this.#actionButton.disabled = true

    this.#actionButton.addEventListener('click', () => {
      void this.#handleAction()
    })

    this.element.append(
      this.#status,
      this.#roleLabel,
      this.#actionButton,
    )
  }

  public initialize(
    onAuthenticationChange?: () => void,
  ): void {
    this.#onAuthenticationChange = onAuthenticationChange ?? null

    this.#authentication.onAuthenticationChange(() => {
      this.#updateAuthenticationState()
    })

    this.#updateAuthenticationState()
  }

  public setFantasyIdentity(
    identity: FantasyIdentity | null,
  ): void {
    this.#fantasyIdentity = identity
    this.#render()
  }

  #updateAuthenticationState(): void {
    const userId = this.#authentication.getUserId()

    if (userId !== this.#currentUserId) {
      this.#currentUserId = userId
      this.#fantasyIdentity = null

      this.#render()
      this.#onAuthenticationChange?.()
      return
    }

    this.#render()
  }

  #render(): void {
    const isSignedIn = this.#authentication.isSignedIn()

    if (!isSignedIn) {
      this.#status.textContent = 'Visitor'
      this.#roleLabel.textContent = ''
      this.#actionButton.textContent = 'Sign in with Google'
    } else {
      const identity = this.#fantasyIdentity

      if (!identity) {
        this.#status.textContent = 'Loading fantasy identity...'
        this.#roleLabel.textContent = ''
      } else if (identity.role === 'visitor') {
        this.#status.textContent = 'Visitor'
        this.#roleLabel.textContent = ''
      } else {
        this.#status.textContent =
          identity.fantasyName ?? 'Visitor'

        this.#roleLabel.textContent =
          identity.role === 'admin'
            ? 'Administrator'
            : 'Editor'
      }

      this.#actionButton.textContent = 'Sign out'
    }

    this.#actionButton.disabled = false
  }

  async #handleAction(): Promise<void> {
    this.#actionButton.disabled = true

    try {
      if (this.#authentication.isSignedIn()) {
        await this.#authentication.signOut()
      } else {
        await this.#authentication.signIn()
      }
    } catch (error: unknown) {
      console.error('Authentication action failed:', error)

      this.#status.textContent =
        'Authentication failed. Please try again.'
    } finally {
      this.#updateAuthenticationState()
    }
  }
}
