
# 🌍 Civilization of Wonders — Installation Guide

**Build your own world. Connect your own database.**

Civilization of Wonders (CoW) is a TypeScript/Vite application for building hexagonal worlds, using Midgard Hex Grid for geometry and Convex for persistent, real-time terrain data.

The application is hosted publicly using Vercel.

**Live website:** https://civ-8-world-builder.vercel.app

## 🎉 Public Collaboration Milestone — 21 October 2026

**Current verified status supersedes the historical 19 October progress notes below.** The original sections have been retained as a record of the installation process.

- The live Vercel application loads successfully at https://civ-8-world-builder.vercel.app.
- Clerk's publishable key is now configured in Vercel and the frontend has been redeployed successfully.
- Google-authenticated users have accessed the World Builder with distinct fantasy identities, including **Legolas** and **Frodo**.
- Authorized editors can select terrain and paint hexagons in their world.
- Terrain changes persist in Convex and appear automatically in another connected browser, as demonstrated by the Legolas/Frodo test.
- The application supports **17 terrain/relief graphics**, with ocean and coast alongside five land terrain types at flat, hills, and mountain relief.
- Editing sessions and administrator takeover controls are present; the interface displays **Stop Editing** and **Take Over** as appropriate.
- Brush variations, features, resources, and rivers are visually marked unavailable; they are not part of the completed terrain-painting feature.

**Important environment distinction:** The public Vercel site is still connected to the Convex **development** deployment, and the configured Clerk publishable key belongs to a **development** instance (`pk_test_`). This is a successful public test deployment, **not yet a production-isolated authentication/database setup**. Before wider public invitations, verify the chosen Clerk instance's permitted domains and usage conditions, confirm access controls for each invited editor, and decide whether to move to production instances.

The next priorities are invitation testing, deployment hardening, README updates, and assignment requirements. A dedicated production Convex database and matching Clerk production configuration remain pending.

---

## 📚 Installation

### 📘 [Part 1 — Local Setup](INSTALLATION-GUIDE-PART-1.md)

Clone the GitHub repository, install dependencies and verify the application.

Midgard Hex Grid 1.0.0 was published to npm on 15 October 2026.

The World Builder now uses the published npm package instead of a local file dependency.

**Status: Complete and verified.**

### 📗 [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md)

Create a Convex deployment, initialize twelve worlds and their hexagons, and run the application locally.

This guide also explains:

- Persistent world data.
- Real-time subscriptions.
- The Map Gallery.
- World selection.
- SVG hexagonal rendering.
- Development and production database considerations.

**Status: Complete for the current implementation.**

### 📙 [Part 3 — Vercel Deployment](INSTALLATION-GUIDE-PART-3.md)

Deploy Civilization of Wonders from GitHub to Vercel.

This guide covers:

- Importing the GitHub repository.
- Configuring Vite.
- Installing Midgard from npm.
- Setting `VITE_CONVEX_URL`.
- Deploying the application.
- Testing the public website.
- Accessing the application from multiple computers.
- Future custom domain configuration.

**Status: First public deployment completed and verified on 15 October 2026; collaborative editing verified on 21 October 2026.**

### 📕 [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md)

**Status: Clerk–Convex authentication and collaborative terrain editing tested successfully on 21 October 2026.**

This part documents:

- Clerk authentication.
- Google sign-in.
- Administrator and editor roles.
- Server-side authorization.
- Secure terrain editing.
- Exclusive world editing sessions.
- Administrator takeover.
- Editor invitations and world assignments.

## 🔐 Authentication Milestone — 19 October 2026

Clerk is the chosen authentication provider. Its official Convex integration is enabled in the Clerk Development instance. The Convex backend has an `auth.config.ts` configuration and an `editors` table; the vanilla TypeScript frontend initializes Clerk and configures `ConvexClient.setAuth()` to fetch Clerk session tokens. The `authentication.currentUser` backend query has been deployed.

TypeScript and Convex deployment checks passed, and the browser logged `Clerk authentication connected to Convex`. A real Google sign-in and a verified authenticated Convex query had **not** yet been tested at this milestone. Editor authorization was **not** yet enforced.

**21 October update:** Google-authenticated editor access, real-time painting, and cross-browser synchronization have subsequently been demonstrated.

See [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md) for the setup and subsequent milestones.

## 🌍 Current Features

- 12 permanent worlds.
- 1,174 hexagons per world (14,088 total).
- Persistent terrain data in Convex.
- Real-time SVG map updates.
- Map Gallery with twelve selectable world cards.
- World Builder navigation activated after selecting a world.
- Dynamic world and editor headings.
- Midgard Hex Grid 1.0.0 installed from npm.
- GitHub-connected Vercel deployment.
- Public HTTPS website.
- Successful access from multiple computers.
- Google authentication using Clerk.
- Administrator and editor identities.
- Exclusive editing sessions and takeover controls.
- Selection and painting of 17 terrain/relief variations.
- Persistent terrain painting synchronized between browsers.

## 🚧 Not Yet Implemented or Finalized

- Additional brush sizes and brush actions.
- Painting features, resources, and rivers.
- Separate Convex production deployment.
- Matching Clerk production configuration.
- Custom domain configuration.
- Final production hardening and wider invitation testing.

The current application supports viewing shared world data and authenticated, real-time terrain editing.

## 🏗️ Architecture

| Component | Technology |
|---|---|
| Programming language | TypeScript |
| Frontend build tool | Vite |
| Hexagonal geometry | Midgard Hex Grid |
| Graphics | SVG |
| Cloud database | Convex |
| Source control | Git and GitHub |
| Web hosting | Vercel |
| Authentication | Clerk |

The SVG map is a visual representation of terrain data stored in Convex.

Midgard provides geometry and coordinates.

Convex stores the persistent world records and supplies real-time updates.

## 🚀 Deployment Milestones

**15 October 2026 — First public deployment**

Civilization of Wonders was successfully deployed to Vercel and tested from two different computers.

The deployment confirmed that the application could be built from GitHub using the published Midgard npm package and could display terrain data from Convex.

**21 October 2026 — Public collaborative editing**

The Vercel deployment was updated with the missing `VITE_CLERK_PUBLISHABLE_KEY` environment variable and redeployed.

The public application loaded successfully with Clerk authentication enabled. Editing and synchronized map updates were demonstrated with the Legolas and Frodo accounts.

The current public website still uses the Convex development deployment.

A dedicated production deployment will be introduced later.

The custom domain `mindchess.se` is also reserved for a future step and has not yet been connected.

## 🔗 Links

- [Live Civilization of Wonders](https://civ-8-world-builder.vercel.app)
- [GitHub repository](https://github.com/niklasgolf/civ-8-world-builder)
- [Midgard Hex Grid on npm](https://www.npmjs.com/package/midgard-hex-grid)
- [Convex documentation](https://docs.convex.dev/)
- [Convex dashboard](https://dashboard.convex.dev/)
- [Clerk documentation](https://clerk.com/docs)
- [Vercel documentation](https://vercel.com/docs)

## 🧭 Next Development Milestone

The next priority is preparing Civilization of Wonders for invited editors and completing the assignment documentation.

The planned workflow is:

1. Verify each invited editor's access and world assignment.
2. Confirm that unauthorized users cannot modify world data.
3. Decide on dedicated production instances for Clerk and Convex.
4. Complete the README and installation documentation.
5. Review the assignment requirements and submission checklist.
6. Continue developing additional world-building tools after the submission priorities are satisfied.

---

*Original guide sections last updated: 19 October 2026; milestone update: 21 October 2026*
