
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

**Status on 19 October 2026:** The Clerk SDK, official Clerk–Convex integration, Convex authentication configuration, editor registry and frontend authentication connection were configured. TypeScript and Convex deployment checks passed. The Google sign-in interface and end-to-end authentication test remained pending.

**Update — 21 October 2026:** Google authentication, editor-controlled terrain painting, editing sessions, and real-time synchronization between separate users have been demonstrated successfully.

The public Vercel frontend is also operational with Clerk authentication enabled.

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

The original authentication configuration used the Clerk issuer URL directly in `convex/auth.config.ts`, rather than reading this environment variable at runtime.

The environment variable remains useful for documenting the selected Clerk issuer and for a future configuration refactor.

## 7. Configure Convex Authentication

Create:

```text
convex/auth.config.ts
```

The original configuration from 19 October 2026 was:

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

The configuration passed TypeScript verification and Convex deployment checks.

When introducing a separate Clerk production instance, update the authentication configuration to match the correct issuer.

## 8. Create the Clerk Authentication Class

Create:

```text
src/application/authentication/clerk-authentication.ts
```

The original implementation from 19 October 2026 was:

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
- Providing access to Clerk for sign-in and sign-out controls.

It does not determine whether a user is an administrator or editor.

That authorization belongs in Convex.

**21 October update:** The application now includes a working authentication interface and authenticated editing workflow. The example above is retained as the original installation milestone, not guaranteed to be the latest complete source file.

## 9. Connect Clerk to the Convex Client

The Convex connection class is located at:

```text
src/application/database/convex-client.ts
```

The original implementation was:

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

The application subsequently gained support for authenticated user interaction and editing sessions.

## 10. Initialize Authentication in the Application

The application entry point is:

```text
src/main.ts
```

The original authentication integration imported:

```ts
import { ClerkAuthentication } from './application/authentication/clerk-authentication.ts'
```

The application created the authentication service:

```ts
const authentication = new ClerkAuthentication()
```

The original initialization sequence was:

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

This code did not replace the existing Map Gallery, World Builder, visitor page or wiki.

The browser console successfully displayed:

```text
Clerk authentication connected to Convex
```

This initially confirmed that Clerk initialization completed and the Convex authentication callback was registered.

At that time, it did not prove that Convex had accepted a signed-in user's token.

**21 October update:** Subsequent authenticated editor interactions and successful Convex terrain mutations demonstrated the functioning authentication and authorization integration.

## 11. Create the Authentication Verification Query

Create:

```text
convex/authentication.ts
```

The original verification query was:

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

The administrator can manage editor access and world assignments.

The intended capabilities include:

- Registering and inviting editors.
- Viewing editor email addresses and real names.
- Assigning editors to worlds.
- Removing or replacing editor assignments.
- Editing any world after explicitly taking control.
- Taking over an active editing session when necessary.

The administrator initially enters the World Builder as a viewer and must explicitly select **EDIT** before taking control.

### 12.2 Editor

An editor can:

- Sign in using Google.
- Edit an assigned world when authorized.
- Use a public fantasy name.
- View the same real-time map as visitors.
- See which editing tool is currently selected.

Editors must not be permitted to change their own registered email addresses, true names or authorization roles.

### 12.3 Visitor

A visitor can:

- Browse the Map Gallery.
- Open public worlds.
- Watch terrain changes in real time.
- See public fantasy names.
- View editing tools without permission to modify terrain.

Visitors must not be able to access private editor identities or modify world records.

These privacy and authorization requirements must be enforced by backend functions.

## 13. Exclusive World Editing Sessions

Civilization of Wonders contains twelve permanent worlds.

Each world may have one active editing session at a time.

The session rules are:

1. An assigned editor may request editing control of their world.
2. Convex checks the authenticated user's authorization.
3. Convex grants editing control only when the world is available.
4. Visitors continue watching the same world in real time.
5. An administrator may explicitly take over an active session.
6. The takeover must be performed atomically in Convex.
7. Removing an editor's assignment revokes their editing permissions.
8. The world and its terrain data remain intact.

Authorization must be enforced in Convex mutations, not merely by disabling frontend buttons.

**21 October update:** The application now includes editing-session controls, including **EDIT**, **Stop Editing**, and administrator **Take Over** functionality.

The terrain-painting mutation checks the active editing session before modifying world data.

## 14. Interactive Terrain Painting

On 21 October 2026, interactive terrain painting was implemented and successfully tested.

The application supports seventeen terrain and relief combinations:

| Terrain | Flat | Hills | Mountains |
|---|---|---|---|
| Grass | Yes | Yes | Yes |
| Plains | Yes | Yes | Yes |
| Desert | Yes | Yes | Yes |
| Tundra | Yes | Yes | Yes |
| Snow | Yes | Yes | Yes |
| Coast | Yes | — | — |
| Ocean | Yes | — | — |

Terrain values:

```ts
type Terrain =
  | 'ocean'
  | 'coast'
  | 'grass'
  | 'plains'
  | 'desert'
  | 'tundra'
  | 'snow'
```

Relief values:

```ts
type Relief = 'flat' | 'hills' | 'mountain'
```

The database uses `mountain` in the singular.

### 14.1 Frontend Painting Workflow

When an authorized editor paints a hexagon:

1. The editor selects a terrain type in the left panel.
2. The editor clicks a hexagon.
3. `MapGrid` reports the clicked coordinates.
4. The application checks whether the current user controls the editing session.
5. The selected terrain is translated into terrain and relief values.
6. The application calls the Convex terrain mutation.
7. Convex validates the operation.
8. The database record is updated.
9. Connected clients receive the new terrain data.
10. The SVG map renders the updated terrain graphic.

The mutation is:

```text
api.hexes.setTerrain
```

The real-time query is:

```text
api.hexes.listByWorld
```

### 14.2 Backend Authorization

The terrain mutation checks:

- The authenticated Clerk identity.
- The user's editor or administrator role.
- Authorization to edit the selected world.
- The active editing session.
- World initialization status.
- Valid hexagon coordinates.
- The existence of the target hexagon record.

The backend is the authoritative security boundary.

Frontend checks and disabled buttons improve the user experience but do not replace server-side authorization.

### 14.3 Reactive Rendering

The SVG map does not maintain an independent authoritative terrain database.

Instead, Convex stores the terrain records.

`WorldMapController` subscribes to the selected world's hexagon data.

When Convex reports a change, the corresponding SVG terrain graphic is updated.

This allows multiple browsers to observe the same world.

## 15. Real-Time Collaboration Verification

On 21 October 2026, the application was tested with two separate authenticated accounts:

- **Legolas**
- **Frodo**

The following behavior was demonstrated:

1. Legolas entered the World Builder.
2. Legolas painted terrain using the available terrain buttons.
3. Convex saved the changes.
4. Frodo accessed the application using a separate account.
5. Frodo painted terrain in another world.
6. Both users could observe the persistent world data.

The demonstration included:

- A smiling face created with terrain graphics.
- The word **FRODO** painted into a world map.
- Successful real-time synchronization between browsers.

This confirmed that the application supports authenticated terrain editing and persistent shared world data.

## 16. Convex Backend Deployment

During development, the frontend initially encountered a Convex validation error when attempting to paint newly added terrain types.

The backend validators had not yet been synchronized with the updated frontend.

The updated Convex backend was deployed using:

```bash
npx convex dev --once
```

After the backend update, the terrain mutations succeeded.

This demonstrated an important distinction:

- Vercel deploys the frontend.
- Convex hosts the backend functions and database.
- Backend changes must be deployed to the correct Convex environment.

For local development, the Convex development command synchronizes backend functions.

For a dedicated production deployment, use the appropriate Convex production deployment procedure.

## 17. Vercel Authentication Configuration

The local development environment contains:

```text
VITE_CLERK_PUBLISHABLE_KEY
```

The same variable must be configured in Vercel.

Navigate to:

**Vercel → Project → Settings → Environment Variables**

Add the publishable key for the appropriate Clerk instance.

For the original public deployment, the variable was configured for:

```text
Production and Preview
```

Redeploy the frontend after adding the variable.

### 17.1 Public Deployment Problem — 21 October 2026

The Clerk-enabled frontend initially failed to load correctly on Vercel.

The reason was that the publishable key was available locally but missing from the Vercel environment configuration.

The problem was resolved by:

1. Adding `VITE_CLERK_PUBLISHABLE_KEY` to Vercel.
2. Selecting Production and Preview.
3. Saving the configuration.
4. Redeploying the frontend without using the previous build cache.
5. Opening the public website again.

After redeployment, the public application loaded successfully.

Legolas was signed in, and the World Builder displayed persistent terrain data.

### 17.2 Development and Production Authentication

The current public application uses a Clerk development instance.

Its publishable key begins with:

```text
pk_test_
```

The public Vercel website also connects to the Convex development deployment.

This is suitable for the current development and demonstration stage, subject to Clerk's development-instance restrictions.

A future production environment should use:

- A Clerk production instance.
- A matching Convex production deployment.
- The production Clerk issuer in `auth.config.ts`.
- The correct Clerk publishable key in Vercel.
- Separately initialized or migrated production world data.

Never place Clerk secret keys in frontend environment variables.

## 18. Verification Checklist

### 18.1 Completed Development Milestones

- [x] Install the Clerk JavaScript SDK.
- [x] Enable the official Clerk–Convex integration.
- [x] Configure Convex authentication.
- [x] Create the authentication verification query.
- [x] Create the editor registry.
- [x] Initialize Clerk in the frontend.
- [x] Connect Clerk authentication to Convex.
- [x] Implement Google sign-in.
- [x] Implement editor-controlled terrain painting.
- [x] Implement editing-session controls.
- [x] Deploy the updated Convex terrain validators.
- [x] Verify persistent terrain updates.
- [x] Verify real-time updates between browsers.
- [x] Configure the Clerk publishable key in Vercel.
- [x] Verify the public Clerk-enabled application loads.

### 18.2 Remaining Production Verification

- [ ] Test invitations with additional users on the public domain.
- [ ] Verify that unauthorized visitors cannot modify terrain.
- [ ] Verify that editors cannot modify unassigned worlds.
- [ ] Verify administrator takeover under simultaneous access.
- [ ] Configure a dedicated Convex production deployment.
- [ ] Configure a matching Clerk production instance.
- [ ] Verify production authentication and authorization end to end.
- [ ] Complete final deployment documentation.

## 19. Development Milestones

### 16 October 2026 — Clerk SDK

The vanilla Clerk JavaScript SDK was installed.

### 19 October 2026 — Clerk–Convex Integration

The authentication configuration and editor registry were established.

TypeScript and Convex deployment checks succeeded.

### 21 October 2026 — Authenticated Editing

Google-authenticated users successfully accessed the World Builder.

Editing sessions and terrain painting were operational.

### 21 October 2026 — Real-Time Collaboration

Legolas and Frodo demonstrated persistent terrain editing and synchronization between browsers.

### 21 October 2026 — Public Deployment

The missing Clerk publishable key was added to Vercel.

The frontend was redeployed successfully.

The public website loaded with Clerk authentication and the shared Convex world data.

**Civilization of Wonders now supports authenticated, database-backed world editing with real-time updates.**

---

*Original guide last updated: 19 October 2026; authentication and collaboration milestones updated: 21 October 2026*
