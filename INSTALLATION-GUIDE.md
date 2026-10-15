
# 🌍 Civilization of Wonders — Installation Guide

**Build your own world. Connect your own database.**

Civilization of Wonders (CoW) is a TypeScript/Vite application for building hexagonal worlds, using Midgard for geometry and Convex for persistent, real-time terrain data.

## 📚 Installation

### 📘 [Part 1 — Local Setup](INSTALLATION-GUIDE-PART-1.md)

Clone the repository, install the Midgard Hex Grid dependency, and prepare the application.

Midgard Hex Grid version 1.0.0 was published to npm on 15 October 2026.

The World Builder's migration from its original local dependency is the next installation step.

### 📗 [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md)

Create your own Convex deployment, initialize twelve worlds and their hexagons, and run the application.

Part 2 also documents the Map Gallery, world selection and real-time SVG map rendering.

**Follow Part 1, then Part 2.**

### 📙 Part 3 — Authentication

**Status: Planned**

This part will document:

- Clerk authentication.
- Google sign-in.
- Administrator and editor roles.
- Server-side authorization.
- Exclusive world editing sessions.
- Editor invitations and world assignments.

### 📕 Part 4 — Production Hosting

**Status: In preparation**

This part will document:

- Creating a Vercel project.
- Importing the GitHub repository.
- Configuring Vite build settings.
- Installing the published Midgard npm dependency.
- Configuring environment variables.
- Connecting the production Convex deployment.
- Deploying the application.
- Connecting a custom domain.
- Verifying HTTPS and public access.

The original project will use `mindchess.se`.

Other developers can use their own domains.

## 🌍 Current Features

- 12 permanent worlds.
- 1,174 hexagons per world (14,088 total).
- Persistent terrain data in Convex.
- Real-time SVG map updates.
- Map Gallery with twelve selectable world cards.
- World Builder navigation activated after selecting a world.
- Dynamic world and editor headings.
- Midgard Hex Grid 1.0.0 published on npm.

## 🚧 Not Yet Implemented

- Browser-based terrain editing.
- Clerk authentication and Google sign-in.
- Administrator and editor permissions.
- Production deployment with Vercel.
- Custom domain configuration.

These features will be documented as they are implemented and tested.

## 🔗 Links

- [GitHub repository](https://github.com/niklasgolf/civ-8-world-builder)
- [Midgard Hex Grid on npm](https://www.npmjs.com/package/midgard-hex-grid)
- [Convex documentation](https://docs.convex.dev/)
- [Convex dashboard](https://dashboard.convex.dev/)
- [Clerk documentation](https://clerk.com/docs)
- [Vercel documentation](https://vercel.com/docs)

---

*Last updated: 15 October 2026*
