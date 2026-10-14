# 🌍 Civilization of Wonders — Installation Guide

**Build your own world. Connect your own database. Host your own website.**

> A step-by-step installation guide for developers who want to clone Civilization of Wonders (CoW) from GitHub and configure their own working application.

---

## 📖 About This Guide

Civilization of Wonders is a TypeScript application for building and exploring hexagonal worlds.

The project is designed to use:

- 🟦 **TypeScript** — Application programming language.
- ⚡ **Vite** — Development server and production build tool.
- ⬡ **midgard-hex-grid** — Hexagonal geometry library.
- ☁️ **Convex** — Cloud database and real-time synchronization.
- 🔐 **Clerk** — User authentication.
- 🔑 **Google** — Google account sign-in.
- 🚀 **Vercel** — Website hosting.
- 🌐 **Custom domain** — Your own website address.

This guide explains how to configure these services using **your own accounts and credentials**.

You do not need access to the original developer's database, authentication accounts or hosting services.

### 🎯 Installation Goal

By the end of this guide, you should have:

- Your own copy of the source code.
- Your own Convex project and database.
- Your own Clerk authentication application.
- Your own Google sign-in configuration.
- Your own Vercel deployment.
- Your own domain, if desired.
- A working Civilization of Wonders website.

**Important:** This guide is being developed alongside the application. Sections marked *Planned* will be completed as those features are implemented and tested.

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

## ☁️ Part 2 — Convex Database Setup

Convex provides the application's cloud database and real-time communication.

Each developer must create a **separate Convex project**.

Do not connect your application to another developer's deployment.

### 2.1 Install Convex

From the project root, run:

    npm install convex

This adds Convex to `package.json` and updates `package-lock.json`.

Convex belongs in the regular application dependencies because the browser application uses its client library.

### 2.2 Initialize Your Convex Project

Run:

    npx convex dev

The Convex command-line interface will guide you through the setup.

If authentication is required, sign in using your own Convex account.

### 2.3 Create a New Project

When asked:

    What would you like to configure?

Select:

    create a new project

Do not select an existing project unless you intentionally want to connect to a Convex project you already own.

### 2.4 Choose a Project Name

When asked:

    Project name:

Choose a name for your own project.

For example:

    civilization-of-wonders

The Convex project name does not have to match the GitHub repository name or the `name` field in `package.json`.

Project names must be available within the relevant Convex account or team.

### 2.5 Choose Cloud Deployment

When asked:

    Use cloud or local dev deployment?

Select:

    cloud deployment

This creates a hosted development deployment.

Using Convex Cloud makes it possible for applications running on different computers to communicate through the same backend.

The local deployment option is not used in this installation guide.

### 2.6 Configure AI Development Files (Optional)

Convex may ask:

    Set up Convex AI files? (guidelines, AGENTS.md, agent skills)

Choose `Yes` if you want Convex to generate guidance for AI coding assistants.

During the original project setup, this created files including:

- `AGENTS.md`
- `CLAUDE.md`
- `convex/_generated/ai/guidelines.md`

It also installed Convex agent skills.

These files help AI-assisted development but are **not required for the website to function**.

### 2.7 Development Environment Variables

After successful setup, Convex automatically creates or updates:

    .env.local

The setup records environment variables such as:

    CONVEX_DEPLOYMENT=your-development-deployment
    VITE_CONVEX_URL=https://your-deployment.convex.cloud
    VITE_CONVEX_SITE_URL=https://your-deployment.convex.site

These are examples, not real deployment credentials.

**Do not copy another developer's deployment values.**

Use the values generated for your own Convex project.

#### 🔒 Git Security

Keep `.env.local` out of version control.

Check that your `.gitignore` excludes local environment files before committing changes.

Never commit secret keys, private credentials or authentication tokens to a public GitHub repository.

### 2.8 Generated Convex Files

The Convex setup creates a directory similar to:

    convex/
    ├── _generated/
    ├── README.md
    └── tsconfig.json

**`_generated/`**

Contains code automatically generated by Convex. Do not manually edit generated API or type definitions.

**`README.md`**

Contains Convex-specific instructions.

**`tsconfig.json`**

Configures TypeScript for the Convex backend.

Application-specific database schemas, queries and mutations will be added later.

### 2.9 Keep Convex Running During Development

The command:

    npx convex dev

continues running after initialization.

This is normal.

It watches the backend files and synchronizes changes with your Convex development deployment.

Keep this terminal open while developing.

Open a second terminal for ordinary commands such as:

    npm run dev

### 2.10 Verify the Convex Deployment

When initialization succeeds, the terminal should report something similar to:

    Convex functions ready!

Open the dashboard:

https://dashboard.convex.dev/

Select your newly created project and its development deployment.

The dashboard allows you to inspect database tables, functions, logs and deployment health.

At this stage, an empty database is expected because the application's schema and data have not yet been created.

---

## 🧩 Part 3 — Connecting TypeScript to Convex

### 3.1 Create the Convex Client Wrapper

The application uses object-oriented TypeScript.

Create this file:

    src/application/database/convex-client.ts

Add the following TypeScript code:

    import { ConvexClient } from 'convex/browser'

    export class ConvexConnection {
      readonly client: ConvexClient

      constructor() {
        const url = import.meta.env.VITE_CONVEX_URL

        if (!url) {
          throw new Error('VITE_CONVEX_URL is not configured')
        }

        this.client = new ConvexClient(url)
      }
    }

### 3.2 Understanding the Class

**`ConvexConnection`**

An application-specific wrapper around the Convex browser client.

**`ConvexClient`**

Provides communication with Convex, including support for real-time subscriptions.

**`import.meta.env.VITE_CONVEX_URL`**

Reads the Convex deployment URL from Vite's environment configuration.

**Constructor validation**

Throws an error if the required URL is missing.

This prevents silently creating a client without a configured deployment.

### 3.3 Current Implementation Status

The client wrapper has been created.

The next steps are to:

1. Verify TypeScript compilation.
2. Connect the client to the application.
3. Define the Convex database schema.
4. Implement the twelve permanent worlds.
5. Add database queries and mutations.
6. Verify real-time communication.

**Status:** In progress — not yet an end-to-end working database integration.

---

## 🔐 Part 4 — Clerk Authentication

**Status: Planned**

This section will document:

- Creating your own Clerk application.
- Configuring authentication providers.
- Installing the necessary Clerk packages.
- Connecting Clerk to the TypeScript application.
- Connecting Clerk authentication to Convex.
- Defining approved map creators.
- Enforcing map ownership securely.

Every developer will use their own Clerk account and credentials.

---

## 🔑 Part 5 — Google Sign-In

**Status: Planned**

This section will document:

- Configuring Google authentication through Clerk.
- When a Google Cloud project and OAuth client are required.
- Configuring authorized domains and redirect URLs.
- Testing Google login.
- Handling unapproved accounts.

No Google client secrets will be included in this repository.

---

## 🗺️ Part 6 — Database Initialization

**Status: Planned**

This section will document how to create:

- Twelve permanent maps.
- Exactly 44 × 26 hexagons per map.
- An initial ocean terrain for every hexagon.
- Creator ownership records.
- Default map titles.
- Server-side authorization rules.

Each new installation should initialize its **own twelve worlds**.

---

## 🚀 Part 7 — Vercel Deployment

**Status: Planned**

This section will document:

- Creating a Vercel account and project.
- Connecting your own GitHub repository.
- Configuring the production build.
- Adding environment variables.
- Connecting the production Convex deployment.
- Configuring Clerk for production.
- Testing the public website.

---

## 🌐 Part 8 — Custom Domain

**Status: Planned**

This section will explain how to:

- Add your own domain to Vercel.
- Configure DNS records with your domain provider.
- Verify the domain.
- Configure authentication for the public address.
- Verify HTTPS and production access.

The original project plans to use `mindchess.se`, but **you can use any domain you control**.

You do not need to purchase the same domain.

---

## 🧪 Part 9 — Final Installation Verification

**Status: Planned**

A completed installation should pass the following checks:

- [ ] Project dependencies install successfully.
- [ ] TypeScript compilation succeeds.
- [ ] Vite starts the application.
- [ ] Convex connects to the developer's own deployment.
- [ ] Twelve permanent worlds exist in the database.
- [ ] Each world contains 1,144 hexagons.
- [ ] Clerk authentication works.
- [ ] Google sign-in works.
- [ ] Only approved creators can edit.
- [ ] Map owners can edit only their own worlds.
- [ ] Changes synchronize between browsers.
- [ ] Vercel serves the production application.
- [ ] The custom domain works, if configured.

---

## 📚 Useful Links

**Source code**

https://github.com/niklasgolf/civ-8-world-builder

**Convex documentation**

https://docs.convex.dev/

**Convex dashboard**

https://dashboard.convex.dev/

**Clerk documentation**

https://clerk.com/docs

**Google Cloud Console**

https://console.cloud.google.com/

**Vercel documentation**

https://vercel.com/docs

**Reference project — Bokcirkel**

https://github.com/niklasgolf/bokcirkel

---

## ❤️ Development Philosophy

**Simple code. Clear instructions. Reproducible installations.**

The objective is not merely to make Civilization of Wonders work on the original developer's computer.

The objective is to make it possible for another developer to clone the repository, configure independent services, and build a fully functional installation.

**🌍 Twelve worlds. Your own database. Your own website. Infinite possibilities.**

---

*Installation Guide — Version 1.0*

*Last updated: 15 October 2026*

*Documentation will be expanded as each integration is implemented and verified.*