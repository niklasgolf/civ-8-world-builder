
# 🌍 Civilization of Wonders — Installation Guide, Part 1

**Development Environment**

> Part 1 explains how to obtain the source code and prepare a local development environment.

**Status: Completed foundation**

[← Installation Guide Index](INSTALLATION-GUIDE.md) | [Continue to Part 2 →](INSTALLATION-GUIDE-PART-2.md)

---

## 📖 About This Guide

Civilization of Wonders (CoW) is a TypeScript application for building and exploring hexagonal worlds.

The project is designed to use:

- 🟦 **TypeScript** — Application programming language.
- ⚡ **Vite** — Development server and production build tool.
- ⬡ **midgard-hex-grid** — Hexagonal geometry library.
- ☁️ **Convex** — Cloud database and real-time synchronization.
- 🔐 **Clerk** — User authentication.
- 🔑 **Google** — Google account sign-in.
- 🚀 **Vercel** — Website hosting.
- 🌐 **Custom domain** — Your own website address.

This guide explains how to configure the application using your own development environment and accounts.

The installation documentation is divided into multiple parts.

**Part 1** covers the local development environment.

**Part 2** begins with the very first Convex installation step and continues through database development.

Future parts will document additional integrations when appropriate.

---

## 🛠️ Part 1 — Development Environment

### 1.1 Prerequisites

You will need:

- Git
- Node.js and npm
- A code editor, such as VS Code or Cursor
- A GitHub account
- A Convex account

Later installation stages will also require Clerk, Google Cloud and Vercel accounts.

The project is being developed on macOS, but the application is intended to use cross-platform web technologies.

### 1.2 Clone the Repository

The source code is available at:

https://github.com/niklasgolf/civ-8-world-builder

Clone it using SSH:

    git clone git@github.com:niklasgolf/civ-8-world-builder.git

Enter the project directory:

    cd civ-8-world-builder

Alternatively, use the HTTPS clone URL if SSH is not configured.

### 1.3 Install Project Dependencies

Run:

    npm install

**Important — local hex-grid dependency**

The project currently references the hex-grid library through a local filesystem dependency:

    "midgard-hex-grid": "file:../laboration-2/midgard-hex-grid"

This means that cloning the main repository alone may not be sufficient for a successful installation.

You must also provide the compatible `midgard-hex-grid` library at the expected relative path.

A more convenient installation method for external developers will be documented once the dependency arrangement is finalized.

---

## ✅ Part 1 Completion

At this point, you should have:

- Obtained the application source code.
- Prepared Node.js and npm.
- Installed the application dependencies, provided the local hex-grid library is available.
- Opened the project in your code editor.

The next step is to configure the cloud database.

**Continue with:**

### 📗 [Part 2 — Convex Database](INSTALLATION-GUIDE-PART-2.md)

---

## ❤️ Development Philosophy

**Simple code. Clear instructions. Reproducible installations.**

Part 1 records the initial development setup. It should remain stable unless a correction or dependency change requires an update.

---

*Installation Guide — Part 1, Version 1.0*

*Last updated: 15 October 2026*
