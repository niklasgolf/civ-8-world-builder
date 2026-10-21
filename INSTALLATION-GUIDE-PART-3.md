
# 📙 Civilization of Wonders — Part 3: Vercel Deployment

[← Installation Guide](INSTALLATION-GUIDE.md) | [← Part 2](INSTALLATION-GUIDE-PART-2.md) | [Part 4 →](INSTALLATION-GUIDE-PART-4.md)

## 1. Overview

Civilization of Wonders is hosted using Vercel.

The frontend is built with TypeScript and Vite.

Midgard Hex Grid provides hexagonal geometry and is installed directly from npm.

Convex provides persistent world data and real-time subscriptions.

Clerk provides authentication using Google accounts.

GitHub stores the source code and connects the project to Vercel.

The first successful public deployment was completed on **15 October 2026**.

On **21 October 2026**, the Clerk-enabled application was successfully deployed and public terrain editing was verified.

**Live application:**

https://civ-8-world-builder.vercel.app

**GitHub repository:**

https://github.com/niklasgolf/civ-8-world-builder

## 2. Prerequisites

Before deploying, verify that:

- The project is available on GitHub.
- The Midgard dependency uses the published npm package.
- `npm install` succeeds.
- `npx tsc --noEmit` succeeds.
- `npm run build` succeeds.
- A Convex deployment exists.
- The twelve worlds have been initialized.

The World Builder was migrated to Midgard Hex Grid 1.0.0 from npm in commit:

```text
8b59108 Migrate Midgard Hex Grid to npm package
```

This is important because Vercel cannot rely on a separate local folder on the developer's computer.

## 3. Create a Vercel Account

Visit:

https://vercel.com/

Sign in or create an account.

Connecting a GitHub account is recommended because Vercel can import and deploy GitHub repositories directly.

The original project was deployed using a Vercel Hobby account.

## 4. Import the GitHub Repository

From the Vercel dashboard:

1. Select **Add New → Project**.
2. Choose the GitHub repository.
3. Import `niklasgolf/civ-8-world-builder`.
4. Select the `main` branch.

Use the following configuration:

| Setting | Value |
|---|---|
| Project Name | `civ-8-world-builder` |
| Root Directory | `./` |
| Application Preset | `Vite` |
| Build Command | Vite project default |
| Output Directory | Vite project default (`dist`) |

The project already includes its build script in `package.json`:

```bash
npm run build
```

This runs TypeScript compilation followed by the Vite production build.

Normally, the Vercel build and output defaults do not need to be overridden.

## 5. Configure Environment Variables

The Vercel frontend requires two environment variables:

```text
VITE_CONVEX_URL
VITE_CLERK_PUBLISHABLE_KEY
```

Both must be available when Vite builds the application.

### 5.1 Configure the Convex URL

Before deployment, expand **Environment Variables**.

Add:

```text
VITE_CONVEX_URL
```

For the original project's first deployment, the value was:

```text
https://youthful-reindeer-241.eu-west-1.convex.cloud
```

Choose the appropriate deployment environments.

The original deployment used:

```text
Production and Preview
```

For your own project, use the Convex URL generated for your deployment.

### 5.2 Configure the Clerk Publishable Key

The frontend also requires:

```text
VITE_CLERK_PUBLISHABLE_KEY
```

Obtain the publishable key from the Clerk dashboard.

To configure it:

1. Open the Vercel dashboard.
2. Select the `civ-8-world-builder` project.
3. Open **Settings → Environment Variables**.
4. Add `VITE_CLERK_PUBLISHABLE_KEY`.
5. Paste the publishable key from Clerk.
6. Select **Production and Preview**.
7. Save the variable.
8. Redeploy the application.

The Clerk publishable key identifies the Clerk application and is intended for browser use.

Never place a Clerk secret key in a `VITE_` environment variable.

### 5.3 Why Redeployment Is Necessary

Vite includes environment variables beginning with `VITE_` in the frontend build.

Changing an environment variable in the Vercel dashboard does not retroactively change an already-generated JavaScript bundle.

A new deployment must be built after the variable is added or changed.

For the 21 October deployment, a fresh redeployment was performed without using the previous build cache.

A cache-free rebuild is useful when troubleshooting stale configuration, although it is not normally necessary for every environment-variable change.

### 5.4 Development Versus Production

The public Civilization of Wonders website currently uses the existing Convex development database.

This makes it possible to view and edit the twelve worlds already created during development.

The Clerk publishable key currently belongs to a Clerk development instance, identifiable by its `pk_test_` prefix.

The recommended long-term arrangement is:

- Local development → Convex development deployment.
- Public production website → Convex production deployment.
- Local authentication → Clerk development instance.
- Production authentication → Clerk production instance.

A separate production deployment has not yet been configured.

Do not assume that Convex automatically copies database records between deployments.

When creating a separate production environment, configure the matching Clerk production instance and its authentication issuer.

## 6. Create the Vercel Project

After reviewing the settings, select:

**Create Project**

Vercel creates the project and may display recommended integrations.

A Convex integration may be offered.

The original deployment did not require adding that optional integration because the application was already configured using `VITE_CONVEX_URL`.

Once the project has been created, continue to deployment.

## 7. Deploy the Application

Select:

**Deploy**

Vercel will:

1. Retrieve the source code from GitHub.
2. Install the npm dependencies.
3. Download Midgard Hex Grid from npm.
4. Install Clerk and the other project dependencies.
5. Run the production build.
6. Publish the generated frontend.

Wait for the deployment to finish.

A successful deployment displays a congratulations screen and a production deployment marked **Ready**.

The original application was deployed successfully on 15 October 2026.

### 7.1 Terrain Painting Deployment

On 21 October 2026, the real-time terrain painting implementation was committed and pushed to GitHub.

The commit was:

```text
9c75fbf Implement real-time terrain painting with Convex synchronization
```

The commit included the frontend integration for:

- Terrain selection.
- Hexagon click handling.
- Convex terrain mutations.
- Real-time map updates.
- SVG terrain rendering.
- Backend terrain validation.

Vercel automatically deployed the updated `main` branch.

The deployment was marked **Ready**.

However, the first attempt to open the updated public application revealed a configuration problem.

## 8. Troubleshooting: Missing Clerk Publishable Key

### 8.1 The Problem

The updated application worked locally but initially failed to display correctly on the public Vercel website.

The reason was that Clerk authentication had been added to the application after the original Vercel deployment.

The local `.env.local` file already contained:

```text
VITE_CLERK_PUBLISHABLE_KEY
```

But the corresponding variable had not yet been configured in Vercel.

The frontend therefore could not initialize Clerk correctly.

### 8.2 The Solution

The problem was resolved using the Vercel dashboard:

1. Open the `civ-8-world-builder` project.
2. Select **Settings → Environment Variables**.
3. Add `VITE_CLERK_PUBLISHABLE_KEY`.
4. Copy the publishable key from the Clerk dashboard.
5. Select **Production and Preview**.
6. Save the configuration.
7. Open the deployment section.
8. Select **Redeploy**.
9. Build a fresh deployment without using the previous build cache.
10. Wait for the deployment to become **Ready**.

After redeployment, the public application loaded successfully.

The World Builder displayed the authenticated Legolas account and the existing terrain map.

The public application also displayed terrain data that had been saved through Convex.

### 8.3 Important Lesson

A successful Vercel build does not necessarily mean the application has all required runtime configuration.

Vite can compile the frontend even when an environment variable needed during application initialization is missing.

Always verify the actual deployed website after changing authentication or database configuration.

## 9. Verify the Public Website

Open:

https://civ-8-world-builder.vercel.app

Verify the following:

- The page loads successfully over HTTPS.
- The Civilization of Wonders header appears.
- The Map Gallery loads the twelve worlds.
- A world can be selected.
- The World Builder renders its SVG hexagonal grid.
- The selected world's headings are displayed.
- The terrain data loads from Convex.
- Clerk authentication initializes.
- A registered user can sign in.
- An authorized editor can activate an editing session.
- Terrain painting updates the database.
- Other connected browsers receive the terrain changes.

### 9.1 Public Deployment Verification — 21 October 2026

The public website was successfully opened after the Clerk configuration was corrected.

The following were observed:

- The Vercel deployment was marked **Ready**.
- The Clerk-enabled application loaded.
- Legolas was signed in.
- The World Builder displayed an active editing session.
- Previously painted terrain was visible.
- The application continued to use the shared Convex development database.

Earlier local testing with the separate Legolas and Frodo accounts also confirmed that terrain updates could be observed between browsers.

These results demonstrate that the application can render and edit persistent world data using its deployed frontend and shared backend.

### 9.2 Authentication and Authorization Checks

Before inviting additional editors, verify:

1. The public website loads without a missing Clerk publishable key error.
2. The Clerk SDK initializes.
3. Google sign-in opens successfully on the public domain.
4. Users can sign in and sign out.
5. Convex recognizes the authenticated identity.
6. Unauthenticated visitors can view public worlds.
7. Unauthorized users cannot modify world data.
8. An editor can edit only their assigned world.
9. Only one editing session controls a world at a time.
10. Administrator takeover works as intended.

The application has demonstrated authenticated editing and real-time synchronization.

A complete public-domain access-control test involving invited users should still be performed before wider distribution.

## 10. GitHub and Future Deployments

Vercel is connected to the GitHub repository.

The production deployment uses the `main` branch.

Future changes can be committed and pushed using:

```bash
git add .
git commit -m "Describe the change"
git push
```

Review `git status` before committing to avoid including local environment files or unrelated changes.

A push to the configured production branch normally triggers a new Vercel deployment automatically.

Check the Vercel dashboard to confirm that the deployment completes successfully.

## 11. Local Development Still Works

Deploying to Vercel does not replace the local development environment.

For local development, use two terminals.

Terminal 1 — Convex:

```bash
npx convex dev
```

Terminal 2 — Vite:

```bash
npm run dev
```

The local application usually runs at:

```text
http://localhost:5173
```

The public website runs independently on Vercel.

Both currently connect to the same Convex development database.

### 11.1 Deploying Backend Changes

The Vercel deployment builds and publishes the frontend.

Convex backend changes must also reach the correct Convex deployment.

For development, run:

```bash
npx convex dev --once
```

This synchronizes the local Convex backend with the configured development deployment.

The command was used successfully on 21 October 2026 to deploy updated terrain validators.

For a future dedicated production deployment, use the appropriate Convex production deployment procedure rather than relying on the development command.

## 12. Connecting a Custom Domain

The original project owner has reserved:

```text
mindchess.se
```

The domain is not connected to Civilization of Wonders yet.

The application currently uses the Vercel-provided domain:

https://civ-8-world-builder.vercel.app

Custom domain configuration is intentionally postponed.

When ready, the general process will be:

1. Open the Vercel project dashboard.
2. Select **Domains**.
3. Add the custom domain.
4. Follow Vercel's current DNS instructions.
5. Update the DNS configuration with the domain provider.
6. Wait for domain verification.
7. Verify HTTPS and public access.

Do not change the existing domain DNS records until the correct settings have been confirmed in Vercel.

## 13. Future Production Improvements

The public application is working, but the following improvements remain planned:

- A dedicated Convex production deployment.
- Separate development and production databases.
- A matching Clerk production instance.
- Public-domain authentication and invitation testing.
- Complete authorization testing for assigned editors and visitors.
- Custom domain configuration.
- Final deployment documentation and security review.

The application already supports authenticated terrain editing and real-time synchronization.

## 14. Deployment Checklist

- [x] GitHub repository is connected to Vercel.
- [x] Project framework is Vite.
- [x] Root directory is correct.
- [x] Midgard is installed from npm.
- [x] `VITE_CONVEX_URL` is configured.
- [x] `VITE_CLERK_PUBLISHABLE_KEY` is configured.
- [x] Environment variables are available to Production and Preview.
- [x] Deployment status is Ready.
- [x] The public website loads over HTTPS.
- [x] The Map Gallery displays twelve worlds.
- [x] World selection works.
- [x] SVG maps render correctly.
- [x] Convex terrain data is visible.
- [x] The website works on another computer.
- [x] The Clerk-enabled public frontend loads.
- [x] Authenticated editing has been demonstrated.
- [x] Terrain painting persists in Convex.
- [x] Real-time terrain synchronization has been demonstrated.
- [ ] Public-domain invitation testing is complete.
- [ ] All unauthorized editing scenarios have been tested.
- [ ] Dedicated production Convex deployment is configured.
- [ ] Matching Clerk production instance is configured.

## 15. Deployment Milestones

### 15 October 2026 — First Public Deployment

Civilization of Wonders achieved its first successful public deployment.

The following components were verified together:

- GitHub source repository.
- npm-hosted Midgard Hex Grid library.
- TypeScript and Vite production build.
- Vercel web hosting.
- Convex cloud database.
- SVG world rendering.
- Access from multiple computers.

### 19 October 2026 — Clerk–Convex Foundation

The Clerk–Convex authentication foundation was configured.

TypeScript and Convex deployment checks passed.

### 21 October 2026 — Real-Time Terrain Painting

Interactive terrain painting was implemented and tested.

The backend accepted authenticated terrain mutations, and connected browsers received the resulting map updates.

The Legolas and Frodo accounts demonstrated collaborative world viewing and persistent terrain changes.

### 21 October 2026 — Public Clerk-Enabled Deployment

The missing `VITE_CLERK_PUBLISHABLE_KEY` was added to Vercel.

The frontend was redeployed successfully.

The public application loaded with Clerk authentication and displayed the persistent Convex world data.

**Civilization of Wonders is now a publicly accessible, database-connected world builder with authenticated terrain editing.**

---

*Original guide last updated: 19 October 2026; deployment and collaboration milestones updated: 21 October 2026*
