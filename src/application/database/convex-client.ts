
import { ConvexClient } from 'convex/browser'
import type { ClerkAuthentication } from '../authentication/clerk-authentication.ts'

export class ConvexConnection {
  readonly client: ConvexClient

  constructor() {
    const url = import.meta.env.VITE_CONVEX_URL

    if (!url) {
      throw new Error('VITE_CONVEX_URL is not configured')
    }

    this.client = new ConvexClient(url)
  }

  public connectAuthentication(
    authentication: ClerkAuthentication,
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.client.setAuth(
        async () => authentication.getConvexToken(),
        (isAuthenticated) => {
          resolve(isAuthenticated)
        },
      )
    })
  }
}
