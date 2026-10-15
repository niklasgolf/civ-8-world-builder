
# 📘 Civilization of Wonders — Part 1: Local Setup

[← Installation Guide](INSTALLATION-GUIDE.md) | [Part 2 →](INSTALLATION-GUIDE-PART-2.md)

## 1. Prerequisites

Install:

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)
- A code editor, such as VS Code or Cursor

A GitHub account with SSH configured is recommended for cloning the repository.

The application uses **Midgard Hex Grid**, a reusable TypeScript library published on npm.

## 2. Clone the Repository

```bash
git clone git@github.com:niklasgolf/civ-8-world-builder.git
cd civ-8-world-builder
```

The GitHub repository is:

https://github.com/niklasgolf/civ-8-world-builder

## 3. Midgard Hex Grid

Midgard provides the hexagonal grid geometry used by Civilization of Wonders.

- **npm package:** [midgard-hex-grid](https://www.npmjs.com/package/midgard-hex-grid)
- **Version:** `1.0.0`
- **Published:** 15 October 2026
- **Publisher:** `niklasgolf`

### 3.1 npm Dependency

The World Builder uses the published npm package:

```json
"midgard-hex-grid": "^1.0.0"
```

The exact dependency specification is maintained in `package.json`.

The original development setup used a local dependency:

```json
"midgard-hex-grid": "file:../laboration-2/midgard-hex-grid"
```

That local dependency was replaced with the published npm package on 15 October 2026.

**Migration status: Complete and verified.**

The migration was committed to GitHub:

```text
8b59108 Migrate Midgard Hex Grid to npm package
```

Developers no longer need a separate local Midgard repository to install and build Civilization of Wonders.

### 3.2 Verify the Library

After installing project dependencies, run:

```bash
npm ls midgard-hex-grid
```

The installation should show version `1.0.0`, for example:

```text
└── midgard-hex-grid@1.0.0
```

The package contains compiled JavaScript, TypeScript declarations, documentation and its license.

## 4. Install Dependencies

From the `civ-8-world-builder` directory:

```bash
npm install
```

This installs the dependencies declared by the project, including:

- Midgard Hex Grid
- Convex
- Vite
- TypeScript

Midgard is downloaded from npm automatically.

There is no need to install the library separately or clone its source repository.

## 5. Verify TypeScript

Run:

```bash
npx tsc --noEmit
```

This checks TypeScript without generating build files.

Next, verify the production build:

```bash
npm run build
```

Both commands were successfully tested after the npm migration on 15 October 2026.

The Vite production build also completed successfully on Vercel.

## 6. Run the Development Server

Once the Convex deployment has been configured, start Vite:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

Vite serves the frontend application.

Convex provides the database and real-time subscriptions.

For local development, use separate terminals for Vite and Convex.

## 7. About npm Publishing

Publishing Midgard is a separate library maintenance task.

Developers installing Civilization of Wonders do not need to create an npm account or publish anything.

For reference, the first Midgard release was published using:

```bash
npm login
npm whoami
npm publish
```

Successful publication was confirmed by:

```text
+ midgard-hex-grid@1.0.0
```

The package was also verified using:

```bash
npm run build
npm pack --dry-run
```

An ES module import test succeeded:

```text
ES module import successful
```

Future npm releases require a new version number. Published version `1.0.0` cannot simply be overwritten.

Never commit authentication credentials, passkeys or recovery codes to GitHub.

## 8. Part 1 Completion

At this point, you should have:

- Cloned the World Builder repository.
- Installed Node.js and npm.
- Installed project dependencies.
- Verified Midgard Hex Grid 1.0.0.
- Verified TypeScript compilation.
- Verified the Vite production build.

The next step is to configure Convex and initialize the twelve worlds.

**Continue with [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md).**

---

*Last updated: 15 October 2026*
