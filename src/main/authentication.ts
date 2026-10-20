
import { api } from '../../convex/_generated/api.js'
import type { ClerkAuthentication } from '../application/authentication/clerk-authentication.ts'
import type { ConvexConnection } from '../application/database/convex-client.ts'
import type { VisitorsLayout } from '../application/visitors/visitors-layout.ts'
import type { ApplicationState } from './application-state.ts'

export class Authentication {
  private readonly authentication: ClerkAuthentication
  private readonly convex: ConvexConnection
  private readonly visitors: VisitorsLayout
  private readonly state: ApplicationState
  private readonly updateEditingControls: () => void

  constructor(
    authentication: ClerkAuthentication,
    convex: ConvexConnection,
    visitors: VisitorsLayout,
    state: ApplicationState,
    updateEditingControls: () => void,
  ) {
    this.authentication = authentication
    this.convex = convex
    this.visitors = visitors
    this.state = state
    this.updateEditingControls = updateEditingControls
  }

  public async initialize(): Promise<void> {
    try {
      await this.authentication.initialize()

      this.visitors.loginPage.initialize(() => {
        void this.refreshFantasyIdentity()
      })

      await this.convex.connectAuthentication(this.authentication)

      await this.refreshFantasyIdentity()
    } catch (error: unknown) {
      console.error('Authentication initialization failed:', error)
      this.state.currentIdentity = null
      this.visitors.loginPage.setFantasyIdentity(null)
      this.updateEditingControls()
    }
  }

  public async refreshFantasyIdentity(): Promise<void> {
    const request = ++this.state.authenticationRequest
    const userId = this.authentication.getUserId()

    this.state.currentIdentity = null
    this.visitors.loginPage.setFantasyIdentity(null)
    this.updateEditingControls()

    if (!userId) {
      return
    }

    try {
      const user = await this.convex.client.query(
        api.authentication.currentUser,
        {},
      )

      if (
        request !== this.state.authenticationRequest ||
        this.authentication.getUserId() !== userId
      ) {
        return
      }

      this.state.currentIdentity = user
      this.visitors.loginPage.setFantasyIdentity(user)
      this.updateEditingControls()

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
      if (request !== this.state.authenticationRequest) {
        return
      }

      console.error('Fantasy identity verification failed:', error)
      this.state.currentIdentity = null
      this.visitors.loginPage.setFantasyIdentity(null)
      this.updateEditingControls()
    }
  }
}
