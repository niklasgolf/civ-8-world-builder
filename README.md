# Civilization of Wonders

Civilization of Wonders is an SVG-based, collaborative hexagonal world builder. Visitors can watch twelve permanent worlds change live. Approved editors can paint terrain on the world assigned to them, and an administrator can take over an active editing session.

The application is a TypeScript project for the Linnaeus University course 1DV610, Introduction to Software Quality.

## Vision and purpose

The goal is a simple multi-user world-building site: one shared database, twelve Civilization-style maps, and changes that appear without a separate save step or a manual refresh.

- **Visitors** can browse the Map Gallery, open a world, and watch its terrain.
- **Approved editors** sign in with Google and paint the world assigned to them.
- **An administrator** can edit and can take over a session that another editor has started.
- **Anonymous visits** are counted by device. When the deployed site can determine an approximate location, that location can appear on a geographic world map.

Only the person who holds the current editing session can paint. Everyone else sees the same map update in real time.

## Live application

The public application is deployed on Vercel:

**[https://civ-8-world-builder.vercel.app/](https://civ-8-world-builder.vercel.app/)**

## Features

- Map Gallery, World Builder, Visitors & Login, and CoW Wiki.
- Twelve worlds stored in Convex. Each world is a hex grid of 1,174 cells, generated with `midgard-hex-grid`.
- Seventeen SVG terrain graphics: grass, plains, desert, tundra, and snow, each as flat land, hills, or mountains, plus coast and ocean.
- Five zoom levels and an interactive minimap.
- Google sign-in through Clerk, with a fantasy identity for each approved editor.
- Exclusive editing sessions and administrator takeover.
- Single-hexagon painting, saved in Convex and synchronized to other open clients.
- One anonymous visit registration per full page load, with device classification from `visitor-module`.
- Permanent visit statistics and colored location markers on a geographic SVG world map.
- Optional approximate coordinates from Vercel geolocation headers.
- An SVG graphics catalog in the CoW Wiki.

## Functional requirements

| ID | Requirement | Description |
|---|---|---|
| R1 | Navigate between the four views | The header offers Map Gallery, World Builder, Visitors & Login, and CoW Wiki. Selecting a view shows that view. World Builder stays unavailable until a world has been selected from the Map Gallery. |
| R2 | Browse and open a stored world | The Map Gallery lists the worlds stored in Convex. Choosing a world opens it in the World Builder. |
| R3 | Display a hexagonal world map | The open world is drawn as a hex grid. Cell positions come from `midgard-hex-grid`. Each cell is shown with an SVG terrain graphic. |
| R4 | Navigate with zoom and the minimap | The World Builder provides zoom levels 1 through 5. Choosing a level changes the map scale. Clicking the minimap recenters the map on that point. |
| R5 | Authenticate with Google and show a fantasy identity | Visitors & Login offers sign-in with Google through Clerk. After sign-in, an approved editor sees that editor's fantasy name. A signed-in person who is not an approved editor is shown as a visitor and cannot edit. |
| R6 | Start, stop, and take over an editing session | An assigned editor, or an administrator, can start editing the selected world and later stop. While another person holds the session, an administrator can take over. The panel shows who is editing, or that the world is in viewing mode. |
| R7 | Paint one hexagon and synchronize it | While the signed-in user holds the editing session, selecting one of the 17 terrain graphics and clicking a hexagon changes that hexagon. The change is stored in Convex, remains after a reload, and appears in another open client without a manual refresh. |
| R8 | Register one anonymous visit per page load | A full page load registers one anonymous visit. Navigating between views does not register another visit. Reloading the page can register a new visit. The device is classified with `visitor-module` as Windows, Mac, Mobile, or Other. |
| R9 | Display permanent visit statistics | The Visitors & Login panel shows the permanent total and, in this order, Mac, Mobile, Windows, and Other. These numbers come from the stored counters. They are not calculated by counting markers on the map. |
| R10 | Display visitor locations on a geographic map | Each stored visit that has valid coordinates appears as one circular SVG marker on the geographic world map. Mac is green, Mobile is blue, Windows is red, and Other is yellow. |
| R11 | Obtain coordinates from Vercel when available | On the deployed application, approximate coordinates may be read from Vercel's geolocation headers and stored with the visit. If those headers are missing or invalid, the visit is still registered and no location marker is required for it. |
| R12 | Display the SVG graphics catalog | CoW Wiki shows the project's SVG graphics, including terrain, features, resources, and editor icons. Choosing a section in the wiki changes the graphics on display. |

## Student modules

The application uses one module written by the author and one module written by another student. Both are installed from npm.

### midgard-hex-grid 1.0.0

Author: Niklas Herrloff.

Repository: [https://github.com/niklasgolf/1dv610-labb2-midgard-hex-grid](https://github.com/niklasgolf/1dv610-labb2-midgard-hex-grid)

`midgard-hex-grid` provides the hexagonal geometry used by the World Builder. It creates the grid, supplies coordinates, and calculates positions. The application uses those results to place SVG terrain on each world. The published package version in this project is 1.0.0.

### visitor-module 0.2.0

Author: Felix.

Repository: [https://github.com/FelixJrB/VisitorModule](https://github.com/FelixJrB/VisitorModule)

`visitor-module` classifies the browser for the anonymous visitor statistics. The application uses its user-agent parser to distinguish Windows, Mac, and mobile or tablet devices. Other devices are recorded as Other. The published package version in this project is 0.2.0.

## Technology and architecture

| Part | Role in this application |
|---|---|
| TypeScript and Vite | The client is a Vite application written in TypeScript. `npm run dev` starts the local client, and `npm run build` typechecks and builds it. |
| SVG | Terrain, icons, the hex map, the minimap, and the geographic visitor map are SVG. Reusable graphics live under `src/library-svg-graphics/`. |
| Convex | Convex stores worlds, hexagons, editors, editing sessions, visits, and the permanent visitor counters. Hexagon and editing-session views stay up to date through Convex subscriptions. |
| Clerk | Clerk provides Google sign-in. The client sends the Clerk session token to Convex, and Convex identifies the approved editor. |
| Vercel | Vercel hosts the public website and the visitor-location endpoint used by R11. |
| midgard-hex-grid | Hexagonal coordinates, positions, and grid generation for the world maps. |
| visitor-module | Device classification for anonymous visit registration. |

Visitor statistics and visitor-location markers are requested once when the Visitors & Login page is created. They do not use a live subscription.

## Installation and setup

Detailed setup is already documented in these guides:

- [Installation Guide](INSTALLATION-GUIDE.md)
- [Part 1 — Local Setup](INSTALLATION-GUIDE-PART-1.md)
- [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md)
- [Part 3 — Vercel Deployment](INSTALLATION-GUIDE-PART-3.md)
- [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md)

### Quick start

Install dependencies and start the client:

```bash
npm install
npm run dev
```

Other scripts in `package.json`:

```bash
npm run build
npm run preview
```

`npm run dev` starts the Vite client only. A local backend also requires a Convex development deployment and the environment configuration described in Part 1 and Part 2. Local authentication requires the Clerk configuration described in Part 4.

The local configuration belongs in `.env.local`, which is not committed. The client expects `VITE_CONVEX_URL` and `VITE_CLERK_PUBLISHABLE_KEY`. Do not put private API secrets in variables whose names begin with `VITE_`. The guides name the required variables and explain how to create them. This README does not contain deployment identifiers, tokens, or keys.

## How to use the application

The application opens on the Map Gallery.

1. **Map Gallery.** Choose one of the stored worlds. World Builder becomes available after that choice.
2. **World Builder.** Inspect the hexagonal map. Change the zoom level or click the minimap to move the view. Anyone can view the world.
3. **Visitors & Login.** Sign in with Google when you need to edit. An approved editor sees a fantasy name. The same page shows visit statistics and the geographic visitor map.
4. **Edit a world.** Return to the selected world. If you are the assigned editor, or an administrator, start editing. Select a terrain graphic and click one hexagon. Stop editing when you are finished. If another editor holds the session, an administrator can take over.
5. **CoW Wiki.** Browse the SVG graphics catalog. This view does not change a world.

Painting is ignored unless you hold the current editing session for that world.

## Current limitations

These editor controls are visible but are not implemented. They do not change a world:

- Brush sizes, undo, and redo. The brush section is marked unavailable.
- Terrain features, resources, and rivers. Those sections are marked unavailable.
- Improvements, wonders, and continents. They can be selected visually and have no effect on the map.
- Like. The button is disabled.

Other current limits:

- Visitor statistics and location markers load once per full page load. Moving between views does not refresh them.
- If the statistics request fails, the panel keeps a dash placeholder instead of showing zeros.
- At most 1,000 visit records are stored. The permanent total and device counters continue to increase after older records are removed, so the total can be larger than the number of markers.
- Approximate coordinates are available through the deployed Vercel endpoint. The local Vite server does not provide those geolocation headers.
- The public site currently uses the Convex and Clerk development environments. A separate production database and a separate Clerk production instance are not configured.
- The custom domain `mindchess.se` is not connected. The public address is the Vercel application linked above.

## Testing

Requirement-based test cases and their results are documented in [TEST_REPORT.md](TEST_REPORT.md).

## Repository links

- Application repository: [https://github.com/niklasgolf/civ-8-world-builder](https://github.com/niklasgolf/civ-8-world-builder)
- Author's module, `midgard-hex-grid`: [https://github.com/niklasgolf/1dv610-labb2-midgard-hex-grid](https://github.com/niklasgolf/1dv610-labb2-midgard-hex-grid)
- Other student's module, `visitor-module`: [https://github.com/FelixJrB/VisitorModule](https://github.com/FelixJrB/VisitorModule)
- Live application: [https://civ-8-world-builder.vercel.app/](https://civ-8-world-builder.vercel.app/)
