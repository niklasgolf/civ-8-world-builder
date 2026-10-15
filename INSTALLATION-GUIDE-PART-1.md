
# 📘 Civilization of Wonders — Part 1: Local Setup

[← Installation Guide](INSTALLATION-GUIDE.md) | [Part 2 →](INSTALLATION-GUIDE-PART-2.md)

## 1. Prerequisites

Install:

- [Node.js](https://nodejs.org/) (includes npm)
- [Git](https://git-scm.com/)
- A code editor, such as VS Code or Cursor

You also need a GitHub account with SSH configured if cloning over SSH, and access to a compatible copy of the `midgard-hex-grid` library.

## 2. Clone the Repository

```bash
git clone git@github.com:niklasgolf/civ-8-world-builder.git
cd civ-8-world-builder
```

Alternatively, clone over HTTPS if SSH is not configured.

## 3. Configure Midgard

The application currently uses a local dependency in `package.json`:

```json
"midgard-hex-grid": "file:../laboration-2/midgard-hex-grid"
```

Before installing dependencies, place a compatible copy of the Midgard library at the expected relative path:

```text
parent-directory/
├── civ-8-world-builder/
└── laboration-2/
    └── midgard-hex-grid/
        └── package.json
```

The Midgard library is not included in the application repository. Obtain it separately from its maintainer.

If the library requires building, follow its own instructions to generate its compiled files.

**A fresh clone cannot be installed reliably until this local dependency is available.**

## 4. Install Dependencies

From `civ-8-world-builder`:

```bash
npm install
```

Convex, Vite and TypeScript are already declared as project dependencies. Do not install them separately.

## 5. Verify TypeScript

```bash
npx tsc --noEmit
```

This checks the application without generating build files.

The application also requires a Convex deployment before it can run successfully.

**Continue with [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md).**
