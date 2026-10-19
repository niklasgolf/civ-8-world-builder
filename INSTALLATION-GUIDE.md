
# 🌍 Civilization of Wonders — Installation Guide

**Build your own world. Connect your own database.**

Civilization of Wonders (CoW) is a TypeScript/Vite application for building hexagonal worlds, using Midgard Hex Grid for geometry and Convex for persistent, real-time terrain data.

The application is hosted publicly using Vercel.

**Live website:** [civ-8-world-builder.vercel.app](https://civ-8-world-builder.vercel.app)

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

**Status: First public deployment completed and verified on 15 October 2026.**

### 📕 [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md)

**Status: Clerk–Convex foundation configured and verified; end-to-end Google login and authorization pending.**

This part will document:

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

TypeScript and Convex deployment checks passed, and the browser logged `Clerk authentication connected to Convex`. A real Google sign-in and a verified authenticated Convex query have **not** yet been tested. Editor authorization is **not** yet enforced.

See [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md) for the exact setup and remaining work.

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

## 🚧 Not Yet Implemented

- Browser-based terrain painting.
- Google sign-in interface and end-to-end authentication test.
- Administrator and editor permissions.
- Exclusive editing sessions.
- Separate Convex production deployment.
- Custom domain configuration.

The current application supports viewing the shared world data.

Browser-based editing and authenticated multi-user collaboration will be implemented in future development phases.

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
| Authentication | Clerk (integration configured; login UI pending) |

The SVG map is a visual representation of terrain data stored in Convex.

Midgard provides geometry and coordinates.

Convex stores the persistent world records and supplies real-time updates.

## 🚀 Deployment Milestone

**15 October 2026 — First public deployment**

Civilization of Wonders was successfully deployed to Vercel and tested from two different computers.

The deployment confirmed that the application could be built from GitHub using the published Midgard npm package and could display terrain data from Convex.

The current public website uses the Convex development deployment.

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

The next major feature is interactive terrain painting.

The planned workflow is:

1. Select a terrain type.
2. Click a hexagon.
3. Save the terrain change to Convex.
4. Update the SVG map.
5. Display the change automatically on other connected computers.

This will provide the foundation for authenticated, real-time world editing.

---

*Last updated: 19 October 2026*
