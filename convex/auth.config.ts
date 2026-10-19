
import type { AuthConfig } from 'convex/server'

export default {
  providers: [
    {
      domain: 'https://wise-bee-7465.clerk.accounts.dev',
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig
