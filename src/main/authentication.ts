import { api } from '../../convex/_generated/api.js'
import type { ClerkAuthentication } from '../application/authentication/clerk-authentication.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { VisitorsLayout } from '../application/visitors/visitors-layout.ts'
import type { ApplicationState } from './application-state.ts'

export class Authentication {
  readonly #authentication: ClerkAuthentication
  readonly #convex: ConvexConnection
  readonly #visitors: VisitorsLayout
  readonly #state: ApplicationState
  readonly #updateEditingControls: () => void

  constructor(
    authentication: ClerkAuthentication,
    convex: ConvexConnection,
    visitors: VisitorsLayout,
    state: ApplicationState,
    updateEditingControls: () => void,
  ) {
    this.#authentication = authentication
    this.#convex = convex
    this.#visitors = visitors
    this.#state = state
    this.#updateEditingControls = updateEditingControls
  }

  public async initialize(): Promise<void> {
    try {
      await this.#authentication.initialize()

      this.#visitors.loginPage.initialize(() => {
        void this.refreshFantasyIdentity()
      })

      await this.#convex.connectAuthentication(this.#authentication)

      await this.refreshFantasyIdentity()
    } catch (error: unknown) {
      console.error('Authentication initialization failed:', error)
      this.#state.setCurrentIdentity(null)
      this.#visitors.loginPage.setFantasyIdentity(null)
      this.#updateEditingControls()
    }
  }

  public async refreshFantasyIdentity(): Promise<void> {
    const request = this.#state.nextAuthenticationRequest()
    const userId = this.#authentication.getUserId()

    this.#state.setCurrentIdentity(null)
    this.#visitors.loginPage.setFantasyIdentity(null)
    this.#updateEditingControls()

    if (!userId) {
      return
    }

    try {
      const user = await this.#convex.client.query(
        api.authentication.currentUser,
        {},
      )

      if (
        request !== this.#state.getAuthenticationRequest() ||
        this.#authentication.getUserId() !== userId
      ) {
        return
      }

      this.#state.setCurrentIdentity(user)
      this.#visitors.loginPage.setFantasyIdentity(user)
      this.#updateEditingControls()

      if (user?.role === 'admin') {
        console.log(
          `Administrator verified: ${user.fantasyName}`,
        )
      } else if (user?.role === 'editor') {
        console.log(
          `Editor verified: ${user.fantasyName}`,
        )
      } else {
        console.log('Visitor verified')
      }
    } catch (error: unknown) {
      if (request !== this.#state.getAuthenticationRequest()) {
        return
      }

      console.error('Fantasy identity verification failed:', error)
      this.#state.setCurrentIdentity(null)
      this.#visitors.loginPage.setFantasyIdentity(null)
      this.#updateEditingControls()
    }
  }
}