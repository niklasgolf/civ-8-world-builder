
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

## 5. Configure the Convex Environment Variable

Before deployment, expand **Environment Variables**.

Add the following key:

```text
VITE_CONVEX_URL
```

For the original project's first deployment, the value was:

```text
https://youthful-reindeer-241.eu-west-1.convex.cloud
```

Choose the appropriate deployment environments.

The first deployment used:

```text
Production and Preview
```

For your own project, use the Convex URL generated for your deployment.

### 5.1 Configure the Clerk Publishable Key

Clerk was integrated into the project after the first Vercel deployment.

The frontend now requires an additional environment variable:

```text
VITE_CLERK_PUBLISHABLE_KEY
```

The value must be the publishable key from the appropriate Clerk application instance.

To configure it:

1. Open the Vercel dashboard.
2. Select the `civ-8-world-builder` project.
3. Open **Settings → Environment Variables**.
4. Add `VITE_CLERK_PUBLISHABLE_KEY`.
5. Paste the publishable key from Clerk.
6. Select the appropriate deployment environments.
7. Save the variable.
8. Redeploy the application so the new value is included in the Vite build.

Clerk publishable keys are intended for browser applications.

Never place a Clerk secret key in a `VITE_` environment variable.

**Current status:** The Clerk publishable key is configured locally. Adding it to Vercel and verifying the public authentication integration remain pending.

### 5.2 Important: Development Versus Production

The first Civilization of Wonders deployment intentionally reused the existing Convex development database.

This made it possible to verify the application online using the twelve worlds already created during development.

However, the recommended long-term arrangement is:

- Local development → Convex development deployment.
- Public production website → Convex production deployment.

A separate production deployment has not yet been configured for the original project.

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

## 8. Verify the Public Website

Open the production website:

https://civ-8-world-builder.vercel.app

Verify the following:

- The page loads successfully over HTTPS.
- The Civilization of Wonders header appears.
- The Map Gallery loads the twelve worlds.
- A world can be selected.
- The World Builder renders its SVG hexagonal grid.
- The selected world's headings are displayed.
- The terrain data loads from Convex.

For the original project's test data, World 1 contains a green grass hexagon near the lower-right corner of the map.

The public application was tested successfully on two separate computers.

This confirmed that the frontend could be accessed remotely and render data from the shared Convex deployment.

### 8.1 Authentication Verification

After the Clerk environment variable has been configured and the authentication interface implemented, verify that:

1. The public website loads without a missing Clerk publishable key error.
2. The Clerk SDK initializes.
3. Google sign-in opens successfully.
4. A user can sign in and sign out.
5. Clerk supplies a session token.
6. Convex verifies the authenticated identity.
7. Unauthenticated visitors remain able to view public worlds.
8. Unauthorized users cannot modify world data.

These checks are **not yet completed**.

A successful deployment alone does not prove that authentication and authorization work.

## 9. GitHub and Future Deployments

Vercel is connected to the GitHub repository.

The production deployment uses the `main` branch.

Future changes can be committed and pushed using:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

Only stage files that belong in the commit. Review `git status` before committing.

A push to the configured production branch normally triggers a new Vercel deployment automatically.

Check the Vercel dashboard to confirm that the new deployment completes successfully.

## 10. Local Development Still Works

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

For the first deployment, both environments connect to the same Convex development database.

## 11. Connecting a Custom Domain

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

## 12. Future Production Improvements

The first online deployment is working, but the following improvements remain planned:

- A dedicated Convex production deployment.
- Separate development and production databases.
- Complete Google sign-in and sign-out interface.
- End-to-end Clerk authentication verification.
- Administrator and editor permissions.
- Secure, authorized terrain editing.
- Exclusive editing sessions.
- Custom domain configuration.

The Clerk SDK and Convex authentication foundation have been configured locally.

The frontend is currently a working public world viewer.

Interactive terrain painting and multi-user editing are future development milestones.

## 13. Deployment Checklist

- [ ] GitHub repository is connected to Vercel.
- [ ] Project framework is Vite.
- [ ] Root directory is correct.
- [ ] Midgard is installed from npm.
- [ ] `VITE_CONVEX_URL` is configured.
- [ ] Deployment status is Ready.
- [ ] The public website loads over HTTPS.
- [ ] The Map Gallery displays twelve worlds.
- [ ] World selection works.
- [ ] SVG maps render correctly.
- [ ] Convex terrain data is visible.
- [ ] The website works on another computer.
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` is configured on Vercel.
- [ ] Google sign-in and sign-out work.
- [ ] Convex verifies the signed-in Clerk identity.
- [ ] Backend authorization rejects unauthorized edits.

The final four authentication and authorization checks are pending.

## 14. Deployment Milestone

On 15 October 2026, Civilization of Wonders achieved its first successful public deployment.

The following components were verified together:

- GitHub source repository.
- npm-hosted Midgard Hex Grid library.
- TypeScript and Vite production build.
- Vercel web hosting.
- Convex cloud database.
- SVG world rendering.
- Access from multiple computers.

On 19 October 2026, the Clerk–Convex authentication foundation was also configured and successfully passed TypeScript and Convex deployment checks.

This establishes the foundation for the next development phase: **Google authentication, server-side editor permissions and interactive terrain editing with real-time updates**.

---

*Last updated: 19 October 2026*
