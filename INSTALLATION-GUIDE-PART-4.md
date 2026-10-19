
# 📕 Civilization of Wonders — Part 4: Authentication and Editor Permissions

[← Installation Guide](INSTALLATION-GUIDE.md) | [← Part 3](INSTALLATION-GUIDE-PART-3.md)

## 1. Overview

Civilization of Wonders uses Clerk for authentication and Convex for database operations and authorization.

The frontend is written in vanilla TypeScript with Vite. It does not use React, Next.js or Convex Auth.

The authentication architecture is:

1. A user signs in using Google through Clerk.
2. Clerk manages the user session and issues a session token.
3. The frontend supplies the token to Convex.
4. Convex verifies the Clerk-issued token.
5. Convex identifies the authenticated user.
6. Backend authorization determines whether the user may edit a world.

Authentication and authorization are separate responsibilities.

A valid Google account does not automatically grant editing permissions.

**Status on 19 October 2026:** The Clerk SDK, official Clerk–Convex integration, Convex authentication configuration, editor registry and frontend authentication connection have been configured. TypeScript and Convex deployment checks pass. The Google sign-in interface and end-to-end authentication test remain pending.

## 2. Create the Clerk Application

Visit:

https://clerk.com/

Create a Clerk account and application.

For Civilization of Wonders, the application is named:

```text
Civilization of Wonders
```

Use the Clerk Development instance while building and testing locally.

The selected authentication method is Google.

The intention is to provide a Google sign-in experience without introducing a separate username-and-password system.

Clerk manages authentication sessions and Google account verification.

## 3. Install the Clerk JavaScript SDK

From the project root, run:

```bash
npm install @clerk/clerk-js
```

This is the vanilla JavaScript SDK.

The installation was completed successfully on 16 October 2026.

The npm installation reported:

- 51 packages added.
- 75 packages audited.
- Zero vulnerabilities.
- A deprecation warning for `crypto-js@4.2.0`.
- Install-script approval notices for several dependencies.

The installed version during configuration was:

```text
@clerk/clerk-js@6.39.0
```

The dependency is recorded in `package.json` and `package-lock.json`.

For a fresh repository installation, `npm install` installs Clerk automatically.

## 4. Configure the Local Environment

The project's `.env.local` contains the Convex and Clerk development configuration.

The relevant variable names are:

```dotenv
CONVEX_DEPLOYMENT=dev:your-deployment
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_CONVEX_SITE_URL=https://your-deployment.convex.site
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
```

The original Convex development deployment is:

```text
https://youthful-reindeer-241.eu-west-1.convex.cloud
```

The Clerk publishable key is obtained from the Clerk dashboard.

The publishable key is intended for browser use. It is different from the Clerk secret key.

Never place a secret key in a variable beginning with `VITE_`.

Keep `.env.local` excluded from Git.

## 5. Enable the Clerk–Convex Integration

Open the Clerk dashboard for Civilization of Wonders.

Select the Development instance.

Navigate to the Clerk integration settings:

**Configure → Developers → Integrations → Convex**

Enable the official Convex integration.

This configures Clerk sessions for use with Convex, including the expected `convex` audience.

The integration was enabled successfully during development.

The original Clerk Frontend API URL is:

```text
https://wise-bee-7465.clerk.accounts.dev
```

This is the issuer domain used by the original development application.

For another Clerk application, use its own Frontend API URL.

## 6. Configure the Convex Environment

Open:

https://dashboard.convex.dev/

Select the Civilization of Wonders development deployment.

Navigate to:

**Settings → Environment Variables**

Add:

```text
CLERK_FRONTEND_API_URL
```

Set its value to the Clerk Frontend API URL:

```text
https://wise-bee-7465.clerk.accounts.dev
```

This variable was configured successfully in the Convex Development environment.

The current authentication configuration uses the Clerk issuer URL directly in `convex/auth.config.ts`, rather than reading this environment variable at runtime.

The environment variable remains useful for documenting the selected Clerk issuer and for a future configuration refactor.

## 7. Configure Convex Authentication

Create:

```text
convex/auth.config.ts
```

Complete source file:

```ts
import type { AuthConfig } from 'convex/server'

export default {
  providers: [
    {
      domain: 'https://wise-bee-7465.clerk.accounts.dev',
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig
```

The `domain` identifies the Clerk token issuer.

The `applicationID` matches the audience configured by Clerk's Convex integration.

This allows Convex to validate compatible Clerk-issued tokens.

An earlier implementation attempted to use:

```ts
process.env.CLERK_FRONTEND_API_URL!
```

That produced a TypeScript error because the Convex configuration type-checking environment did not provide the required Node `process` types.

Using the explicit development issuer URL resolved the error.

The final configuration passed TypeScript verification and Convex deployment checks.

## 8. Create the Clerk Authentication Class

Create:

```text
src/application/authentication/clerk-authentication.ts
```

Complete source file:

```ts
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

  public async getConvexToken(): Promise<string | null> {
    return await this.clerk.session?.getToken() ?? null
  }

  public getClerk(): Clerk {
    return this.clerk
  }
}
```

This class is responsible for:

- Initializing the Clerk SDK.
- Reporting whether a user is signed in.
- Accessing the Clerk user ID.
- Retrieving a Clerk session token.
- Providing access to Clerk for future sign-in and sign-out controls.

It does not determine whether a user is an administrator or editor.

That authorization belongs in Convex.

## 9. Connect Clerk to the Convex Client

The Convex connection class is located at:

```text
src/application/database/convex-client.ts
```

Complete source file:

```ts
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
  ): void {
    this.client.setAuth(
      async () => authentication.getConvexToken(),
    )
  }
}
```

The `setAuth()` method connects the Convex client to Clerk's session-token provider.

The frontend does not create or validate JWTs itself.

Clerk supplies the token and Convex verifies it.

The authentication connection is established after Clerk has initialized.

Further work will handle authentication state changes when a user signs in or out.

## 10. Initialize Authentication in the Application

The application entry point is:

```text
src/main.ts
```

The authentication integration imports:

```ts
import { ClerkAuthentication } from './application/authentication/clerk-authentication.ts'
```

The application creates the authentication service:

```ts
const authentication = new ClerkAuthentication()
```

After initializing the frontend, it starts Clerk and connects the Convex client:

```ts
void authentication.initialize()
  .then(() => {
    convex.connectAuthentication(authentication)
    console.log('Clerk authentication connected to Convex')
  })
  .catch((error: unknown) => {
    console.error('Failed to initialize Clerk authentication:', error)
  })
```

This code does not replace the existing Map Gallery, World Builder, visitor page or wiki.

The browser console successfully displayed:

```text
Clerk authentication connected to Convex
```

This confirms that Clerk initialization completed and the Convex authentication callback was registered.

It does not yet prove that Convex has accepted a signed-in user's token.

## 11. Create the Authentication Verification Query

Create:

```text
convex/authentication.ts
```

Complete source file:

```ts
import { query } from './_generated/server'

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return null
    }

    return {
      clerkUserId: identity.subject,
      authenticated: true,
    }
  },
})
```

This query checks the identity recognized by Convex.

If no authenticated identity is available, it returns:

```json
null
```

If a valid authenticated identity is available, it returns an object containing:

- `clerkUserId`
- `authenticated: true`

The query is intended for the first end-to-end authentication test.

The query does not expose private email addresses or editor records.

It also does not grant editing permissions.

## 12. Editor Registry

The Convex schema includes an `editors` table.

The table was confirmed in the Convex Development dashboard.

It was initially empty.

The editor records contain:

| Field | Type | Visibility |
|---|---|---|
| `email` | string | Private |
| `trueName` | string | Private |
| `fantasyName` | string | Public |
| `clerkUserId` | optional string | Internal |
| `role` | `admin` or `editor` | Authorization |
| `worldId` | optional world ID | Assignment |

The table has indexes for:

```text
by_email
by_clerk_user_id
by_world
```

These support matching invited users to authenticated Clerk identities and their assigned worlds.

### 12.1 Administrator

The administrator will be able to:

- Register and invite editors.
- View editor email addresses and real names.
- Assign editors to worlds.
- Remove or replace editor assignments.
- Edit any world after explicitly taking control.
- Take over an active editing session when necessary.

The administrator initially enters the World Builder as a viewer and must explicitly select **EDIT** before taking control.

### 12.2 Editor

An editor will be able to:

- Sign in using Google.
- Edit an assigned world when authorized.
- Change their own public fantasy name.
- View the same real-time map as visitors.
- See which editing tool is currently selected.

Editors will not be permitted to change their own registered email addresses, true names or authorization roles.

### 12.3 Visitor

A visitor will be able to:

- Browse the Map Gallery.
- Open any public world.
- Watch terrain changes in real time.
- See public fantasy names.
- See the editor's selected tools in a disabled state.

Visitors must not be able to access private editor identities or modify world records.

These are planned authorization requirements, not completed permissions.

## 13. Exclusive World Editing Sessions

Civilization of Wonders contains twelve permanent worlds.

Each world may have one active editing session at a time.

The planned rules are:

1. An assigned editor may request editing control of their world.
2. Convex checks the authenticated user's authorization.
3. Convex grants editing control only when the world is available.
4. Visitors continue watching the same world in real time.
5. An administrator may explicitly take over an active session.
6. The takeover must be performed atomically in Convex.
7. Removing an editor's assignment revokes their editing permissions.
8. The world and its terrain data remain intact.

Authorization must be enforced in Convex mutations, not merely by disabling frontend buttons.

The session system has not yet been implemented.

## 14. Verification

On 19 October 2026, the following commands completed successfully:

```bash
npx tsc --noEmit
npx convex dev --once
```

The Convex terminal confirmed:

```text
✔ 08:15:44 Convex functions ready! (1.44s)
```

The Node.js runtime also displayed:

```text
ExperimentalWarning: localStorage is not available because --localstorage-file was not provided.
```

This warning did not prevent Convex from deploying its functions.

The successful checks confirm that:

- TypeScript compilation passes.
- Convex accepts the deployed authentication configuration.
- The authentication query is available in the development deployment.
- The frontend has successfully initialized Clerk and registered its Convex authentication callback.

The following checks remain pending:

- [ ] Display a Google sign-in interface.
- [ ] Sign in using a Google account.
- [ ] Verify that Convex recognizes the Clerk identity.
- [ ] Sign out and confirm that the authenticated identity disappears.
- [ ] Handle authentication changes without requiring a page refresh.
- [ ] Verify that unauthorized users cannot edit worlds.
- [ ] Register the administrator securely.
- [ ] Implement editor invitations and assignments.

## 15. Vercel Authentication Configuration

The local development environment contains:

```text
VITE_CLERK_PUBLISHABLE_KEY
```

The same variable must be configured in Vercel before deploying the Clerk-enabled frontend.

Navigate to:

**Vercel → Project → Settings → Environment Variables**

Add the publishable key for the appropriate Clerk instance.

Redeploy the frontend after adding the variable.

The Clerk-enabled public deployment has not yet been verified.

A future production environment should use:

- A Clerk production instance.
- A matching Convex production deployment.
- The production Clerk issuer in `auth.config.ts`.
- The correct Clerk publishable key in Vercel.

Never place Clerk secret keys in frontend environment variables.

## 16. Next Development Steps

The immediate next step is to implement the **Visitors & Login** page.

The planned sequence is:

1. Add a Civilization of Wonders sign-in button.
2. Open Clerk's secure Google sign-in interface.
3. Handle sign-in and sign-out events.
4. Query `api.authentication.currentUser`.
5. Verify that Convex recognizes the authenticated user.
6. Display the authentication status.
7. Implement administrator registration.
8. Implement secure editor lookup and invitations.
9. Enforce editor permissions on backend mutations.
10. Implement exclusive editing sessions.
11. Enable terrain painting for authorized editors.

The first milestone is a successfully verified Google sign-in.

The second milestone is server-enforced editor authorization.

The third milestone is secure real-time terrain editing.

---

*Last updated: 19 October 2026*
