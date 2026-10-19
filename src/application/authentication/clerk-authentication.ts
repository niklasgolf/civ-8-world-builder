
import { Clerk } from '@clerk/clerk-js'

export class ClerkAuthentication {
  private readonly clerk: Clerk

  constructor() {
    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

    if (!publishableKey) {
      throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local')
    }

    this.clerk = new Clerk(publishableKey)
  }

  public async initialize(): Promise<void> {
    await this.clerk.load()
  }

  public isSignedIn(): boolean {
    return this.clerk.isSignedIn
  }

  public getUserId(): string | null {
    return this.clerk.user?.id ?? null
  }

  public getClerk(): Clerk {
    return this.clerk
  }
}
