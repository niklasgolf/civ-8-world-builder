import { ConvexClient } from 'convex/browser'

export class ConvexConnection {
  readonly client: ConvexClient

  constructor() {
    const url = import.meta.env.VITE_CONVEX_URL

    if (!url) {
      throw new Error('VITE_CONVEX_URL is not configured')
    }

    this.client = new ConvexClient(url)
  }
}