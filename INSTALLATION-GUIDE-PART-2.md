
# 🌍 Civilization of Wonders — Installation Guide, Part 2

**Convex Database and Cloud Integration**

> Part 2 explains how to create an independent Convex cloud database, connect it to the TypeScript application, and initialize the twelve permanent worlds.

**Status: In progress**

[← Installation Guide Index](INSTALLATION-GUIDE.md) | [← Part 1](INSTALLATION-GUIDE-PART-1.md)

---

## 📖 About Part 2

Part 1 covered the development environment, GitHub cloning and npm dependencies.

Part 2 begins with the first Convex installation step.

Convex is responsible for storing the worlds and their hexagons in the cloud.

The objective is to allow multiple computers to work with the same persistent database and eventually receive real-time updates.

Each developer must create a **separate Convex project**.

Do not connect your application to another developer's deployment.

---

## ☁️ Part 2 — Convex Database Setup

Convex provides the application's cloud database and real-time communication.

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

It also installed Convex agent skills in:

- `.agents/skills/`
- `.claude/skills/`

These files help AI-assisted development but are **not required for the website to function**.

The original project keeps `AGENTS.md` and `CLAUDE.md` in GitHub, but excludes the installed skill directories from version control.

See Section 2.8 for details.

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

The project's `.gitignore` contains:

    *.local

This excludes `.env.local` and other files ending in `.local`.

Check that your `.gitignore` excludes local environment files before committing changes.

Never commit secret keys, private credentials or authentication tokens to a public GitHub repository.

**Important:** Variables beginning with `VITE_` are exposed to the browser application when used in client-side code. Never store secret credentials in these variables.

### 2.8 Git Configuration and AI Skill Files

Convex can install numerous AI development files.

During the original setup, the optional AI configuration generated dozens of files that were accidentally included in the first Git commit.

These files are useful locally but do not all need to be stored in the application repository.

#### Files to Keep in GitHub

The project keeps:

- `AGENTS.md`
- `CLAUDE.md`
- `convex/README.md`
- `convex/tsconfig.json`
- `convex/_generated/`
- `package.json`
- `package-lock.json`
- Application source code
- Project documentation

The `convex/_generated/` directory contains generated TypeScript API definitions and related Convex files.

These are normally committed to Git so that the project has the generated types needed for development and builds.

Do not manually edit generated API or type definitions.

#### Files Excluded from GitHub

The following optional AI skill files are excluded:

- `.agents/skills/`
- `.claude/skills/`
- `skills-lock.json`

The project's `.gitignore` includes:

    # AI assistant skills installed by Convex
    .agents/skills/
    .claude/skills/
    skills-lock.json

This keeps the GitHub repository focused on the application rather than large collections of locally installed AI assistant instructions.

Other developers may choose to install their own AI skills independently.

#### Important — Gitignore Does Not Remove Tracked Files

Adding a filename to `.gitignore` prevents Git from automatically tracking it in the future.

However, if the file has already been committed, Git continues tracking it.

To stop tracking the optional AI skills without deleting them from your computer, run:

    git rm -r --cached .agents/skills .claude/skills skills-lock.json

The options mean:

- `git rm` — Remove files from Git's index.
- `-r` — Process directories recursively.
- `--cached` — Keep the actual files on your computer.

The files will be removed from the next Git commit but will remain available locally.

Check the result:

    git status --short

The removed files should appear with a `D` in the staged column.

After reviewing the changes, commit and push:

    git add .
    git commit -m "Clean up Convex AI files and update gitignore"
    git push

This cleanup was completed in the original project on 15 October 2026.

**Note:** Removing files in a new commit does not erase them from earlier Git history. Never use this approach as a substitute for properly removing exposed secrets.

### 2.9 Generated Convex Files

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

Application-specific database schemas, queries and mutations are added in later sections of this guide.

### 2.10 Keep Convex Running During Development

The command:

    npx convex dev

continues running after initialization.

This is normal.

It watches the backend files and synchronizes changes with your Convex development deployment.

Keep this terminal open while developing.

Open a second terminal for ordinary commands such as:

    npm run dev

### 2.11 Verify the Convex Deployment

When initialization succeeds, the terminal should report something similar to:

    Convex functions ready!

Open the dashboard:

https://dashboard.convex.dev/

Select your newly created project and its development deployment.

The dashboard allows you to inspect database tables, functions, logs and deployment health.

**At this initial stage**, an empty database is expected because the application's schema and data have not yet been created.

The following sections explain how to add the first database records.

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

### 3.3 Connect the Client to the Application

The application entry point is:

    src/main.ts

Import the wrapper:

    import { ConvexConnection } from './application/database/convex-client.ts'

After verifying that the application root exists, create the connection:

    const convex = new ConvexConnection()

The current implementation temporarily includes:

    void convex

This avoids an unused-variable warning until database operations are connected to the user interface.

It does not perform a database query or demonstrate real-time synchronization.

The complete application entry point also initializes the editor, Wiki and navigation.

Do not replace those existing features merely to add Convex.

### 3.4 Verify TypeScript Compilation

Run:

    npx tsc --noEmit

This checks the TypeScript project without generating output files.

If compilation succeeds, the command normally finishes without reporting errors.

The original project passed this check on 15 October 2026.

**Important:** Successful TypeScript compilation does not prove that the application has connected to Convex or that database operations work.

Those features must be tested separately.

### 3.5 Current Implementation Status

Completed:

- Created the `ConvexConnection` wrapper.
- Imported and instantiated it in the application entry point.
- Verified TypeScript compilation.

Still to implement:

- Application-level database queries.
- Real-time subscriptions.
- Database-driven map rendering.
- Editing and synchronization.

**Status:** The Convex client has been configured, but end-to-end database integration is not yet complete.

---

## 🗺️ Part 4 — Twelve Permanent Worlds

The application will contain twelve permanent worlds.

Every independent installation must initialize its own set of twelve records.

### 4.1 World Database Design

Each world currently has three fields:

- `number` — Permanent world number, from 1 to 12.
- `name` — Display name, initially `World 1` through `World 12`.
- `ownerId` — Optional owner identifier, reserved for future authentication.

The initial worlds have no assigned owners.

The world records are stored in the Convex `worlds` table.

### 4.2 Create the Database Schema

Create:

    convex/schema.ts

Add:

    import { defineSchema, defineTable } from 'convex/server'
    import { v } from 'convex/values'

    export default defineSchema({
      worlds: defineTable({
        number: v.number(),
        name: v.string(),
        ownerId: v.optional(v.string()),
      }).index('by_number', ['number']),
    })

The schema defines the `worlds` table.

The `by_number` index allows efficient queries ordered by world number.

The `ownerId` field is optional because Clerk authentication has not yet been implemented.

**Important:** An index does not automatically guarantee that world numbers are unique.

The initialization function will check that the table is empty before inserting records.

### 4.3 Create the World Functions

Create:

    convex/worlds.ts

Add:

    import { internalMutation, query } from './_generated/server'

    export const initialize = internalMutation({
      args: {},
      handler: async (ctx) => {
        const existingWorlds = await ctx.db.query('worlds').collect()

        if (existingWorlds.length > 0) {
          throw new Error('World initialization requires an empty worlds table')
        }

        for (let number = 1; number <= 12; number++) {
          await ctx.db.insert('worlds', {
            number,
            name: `World ${number}`,
          })
        }

        return { created: 12 }
      },
    })

    export const list = query({
      args: {},
      handler: async (ctx) => {
        return await ctx.db.query('worlds').withIndex('by_number').collect()
      },
    })

This file defines two Convex functions.

#### `initialize`

An internal mutation that creates the twelve world records.

It first checks whether any worlds already exist.

If the table is not empty, it throws an error instead of adding another twelve records.

The function inserts worlds numbered 1 through 12.

It returns the number of created records.

#### `list`

A public query that returns the worlds using the `by_number` index.

This will eventually allow the application to display the available worlds.

### 4.4 Why Initialization Is Internal

The initialization function uses:

    internalMutation

instead of:

    mutation

This is an important security decision.

A public mutation could be called directly from a browser client.

An internal mutation cannot be invoked directly by an ordinary browser client.

The initialization operation is intended for trusted administrative use through the Convex CLI.

The query `list` remains public because world discovery is intended to be readable without authentication.

Future write operations will require proper authorization.

### 4.5 Deploy the Schema and Functions

Keep the following command running in your Convex development terminal:

    npx convex dev

Convex watches the files and automatically updates the development deployment.

After creating `convex/schema.ts`, the development deployment should recognize the `worlds` table and its index.

After creating `convex/worlds.ts`, the functions should become available.

During initial file creation, Convex may briefly report an error if it reads an incomplete file.

Wait until the file has been saved and check that the terminal reports successful deployment.

Do not proceed with initialization while the deployment is reporting errors.

### 4.6 Initialize the Twelve Worlds

Open a second terminal in the project root.

Run:

    npx convex run worlds:initialize

This invokes the internal initialization mutation through the Convex CLI.

Expected result:

    { created: 12 }

The original development deployment returned this result successfully on 15 October 2026.

**Important:** Run this initialization only once for a new, empty `worlds` table.

If the table already contains records, the function will reject the operation.

Do not delete existing records merely to repeat the installation process.

### 4.7 Verify the Database

Open:

https://dashboard.convex.dev/

Select your own project and development deployment.

Navigate to the **Data** section.

Open the `worlds` table.

You should see twelve records:

| number | name |
|---|---|
| 1 | World 1 |
| 2 | World 2 |
| 3 | World 3 |
| 4 | World 4 |
| 5 | World 5 |
| 6 | World 6 |
| 7 | World 7 |
| 8 | World 8 |
| 9 | World 9 |
| 10 | World 10 |
| 11 | World 11 |
| 12 | World 12 |

Each record also has a Convex-generated document ID.

The `ownerId` field is currently unset.

The original project verified all twelve records in the Convex dashboard on 15 October 2026.

### 4.8 Understanding GitHub and Cloud Data

The following files are stored in GitHub:

- `convex/schema.ts`
- `convex/worlds.ts`

The twelve database records are **not stored in GitHub**.

They exist inside the Convex cloud deployment.

Cloning the repository gives another developer the code needed to create the records, but not the original developer's database contents.

Each developer must configure their own Convex project and run the initialization command against their own deployment.

### 4.9 Verify the Query

After the schema and functions are deployed, the public query can be tested with:

    npx convex run worlds:list

It should return twelve world documents.

Each document includes its Convex document ID, creation time, world number and name.

This command is an additional verification step.

The original project has verified the records in the dashboard; this guide does not claim that the CLI query verification has already been performed.

### 4.10 Git Commit

The original project committed and pushed the database milestone using:

    git add .
    git commit -m "Create Convex worlds schema and initialization"
    git push

Commit:

    65d9f66

This preserves the schema and initialization functions in the repository.

The database records remain in Convex Cloud.

---

## ⬡ Part 5 — Hexagon Database

**Status: Planned**

The next development stage is to store the individual hexagons of each world.

The planned world dimensions are:

    44 × 26 = 1,144 hexagons

For twelve worlds:

    12 × 1,144 = 13,728 hexagons

The intended initial terrain is ocean.

This section will document:

- The hexagon database schema.
- World-to-hexagon relationships.
- Coordinate storage.
- Terrain values.
- Initialization of all hexagons.
- Queries for loading a world.
- Mutations for changing terrain.
- Real-time synchronization.

The exact implementation will be documented after it has been designed and tested.

---

## 🔐 Part 6 — Clerk Authentication

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

If authentication setup becomes sufficiently extensive, this section will move into a separate installation guide part.

---

## 🔑 Part 7 — Google Sign-In

**Status: Planned**

This section will document:

- Configuring Google authentication through Clerk.
- When a Google Cloud project and OAuth client are required.
- Configuring authorized domains and redirect URLs.
- Testing Google login.
- Handling unapproved accounts.

No Google client secrets will be included in this repository.

---

## 🚀 Part 8 — Vercel Deployment

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

## 🌐 Part 9 — Custom Domain

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

## 🧪 Part 10 — Final Installation Verification

**Status: In progress**

A completed installation should pass the following checks:

- [ ] Project dependencies install successfully on a fresh clone.
- [x] TypeScript compilation succeeds in the original development environment.
- [ ] Vite starts the application on a fresh clone.
- [x] Convex development deployment is configured.
- [x] Twelve permanent worlds exist in the original development database.
- [ ] Each world contains 1,144 hexagons.
- [ ] Clerk authentication works.
- [ ] Google sign-in works.
- [ ] Only approved creators can edit.
- [ ] Map owners can edit only their own worlds.
- [ ] Changes synchronize between browsers.
- [ ] Vercel serves the production application.
- [ ] The custom domain works, if configured.

Checks marked complete refer to the original development environment, not every new installation.

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

Completed installation stages should remain stable, while ongoing work is documented in the current installation part.

**🌍 Twelve worlds. Your own database. Your own website. Infinite possibilities.**

---

*Installation Guide — Part 2, Version 1.0*

*Last updated: 15 October 2026*

*Documentation will be expanded as each integration is implemented and verified.*
