
# 📘 Civilization of Wonders — Part 1: Local Setup

[← Installation Guide](INSTALLATION-GUIDE.md) | [Part 2 →](INSTALLATION-GUIDE-PART-2.md)

## 1. Prerequisites

Install:

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)
- A code editor, such as VS Code or Cursor

You also need a GitHub account with SSH configured if cloning over SSH.

The application uses **Midgard Hex Grid**, a reusable TypeScript library that is now publicly available on npm.

## 2. Clone the Repository

```bash
git clone git@github.com:niklasgolf/civ-8-world-builder.git
cd civ-8-world-builder
```

Alternatively, clone over HTTPS if SSH is not configured.

## 3. Midgard Hex Grid

Midgard provides the hexagonal grid geometry used by Civilization of Wonders.

**npm package:** [midgard-hex-grid](https://www.npmjs.com/package/midgard-hex-grid)

**First published version:** `1.0.0`

**Published:** 15 October 2026

**npm publisher:** `niklasgolf`

### 3.1 Public npm Package

The library has been successfully published to the npm registry.

It can be installed with:

```bash
npm install midgard-hex-grid@1.0.0
```

The package includes compiled JavaScript, TypeScript declarations, documentation and its license.

The published package was verified using:

```bash
npm run build
npm pack --dry-run
```

An ES module import test also succeeded:

```text
ES module import successful
```

### 3.2 World Builder Dependency Migration

The World Builder originally used a local dependency:

```json
"midgard-hex-grid": "file:../laboration-2/midgard-hex-grid"
```

This required a separate local copy of Midgard at:

```text
parent-directory/
├── civ-8-world-builder/
└── laboration-2/
    └── midgard-hex-grid/
        └── package.json
```

Now that Midgard is published on npm, this arrangement can be replaced by a normal npm dependency.

**Migration status:** The public npm package is available, but the World Builder dependency change has not yet been verified.

Before relying on a fresh clone, update the World Builder's `package.json` and `package-lock.json` to use the npm package, test the application, and commit the changes.

After that migration, developers will no longer need a separate local Midgard repository.

## 4. Install Dependencies

From `civ-8-world-builder`:

```bash
npm install
```

Convex, Vite and TypeScript are already declared as project dependencies. Do not install them separately.

**Important:** Until the Midgard dependency migration is committed, the existing local dependency must still be available for a fresh installation.

Once the migration is complete, `npm install` will retrieve Midgard directly from npm.

## 5. Verify TypeScript

```bash
npx tsc --noEmit
```

This checks the application without generating build files.

You can also verify the production build:

```bash
npm run build
```

The application requires a Convex deployment before its database-driven features can run successfully.

## 6. About npm Publishing

Publishing Midgard is a separate maintenance task. Developers installing Civilization of Wonders do not need to publish the library or create an npm account.

For reference, the first release was published using:

```bash
npm login
npm whoami
npm publish
```

The npm account uses two-factor authentication with a passkey.

Successful publication was confirmed by:

```text
+ midgard-hex-grid@1.0.0
```

Future releases must use a new version number. Version `1.0.0` cannot simply be overwritten.

Authentication credentials, passkeys and npm recovery codes must never be committed to GitHub.

## 7. Part 1 Completion

At this point, you should have:

- Cloned the World Builder repository.
- Installed Node.js and npm.
- Installed the project dependencies.
- Verified TypeScript compilation.
- Prepared the application for its Convex connection.

**Continue with [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md).**

---

*Last updated: 15 October 2026*
