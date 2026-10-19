
# 📗 Civilization of Wonders — Part 2: Convex Database

[← Installation Guide](INSTALLATION-GUIDE.md) | [← Part 1](INSTALLATION-GUIDE-PART-1.md) | [Part 3 →](INSTALLATION-GUIDE-PART-3.md)

## 1. Create Your Convex Deployment

Create an account at [Convex](https://www.convex.dev/).

From the application directory, run:

```bash
npx convex dev
```

Follow the setup prompts:

1. Sign in to your Convex account.
2. Create a project, for example `civilization-of-wonders`.
3. Select a cloud development deployment.
4. Configure optional development tools according to your preferences.

Convex creates a `.env.local` file containing values similar to:

```dotenv
CONVEX_DEPLOYMENT=dev:your-deployment
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_CONVEX_SITE_URL=https://your-deployment.convex.site
```

Use the values generated for your own project.

Keep `npx convex dev` running during local development. It synchronizes backend functions and schema changes with the development deployment.

**Security:** Keep `.env.local` out of Git. Variables beginning with `VITE_` are exposed to browser code and must not contain secrets.

## 2. Initialize the Twelve Worlds

Open a second terminal in the project directory.

For a new, empty Convex deployment, run:

```bash
npx convex run worlds:initialize
```

Expected result:

```text
{ created: 12 }
```

This creates twelve permanent world records, initially named `World 1` through `World 12`.

Run this initialization only once per new deployment. It rejects initialization when world records already exist.

## 3. Initialize the Hexagons

The repository includes:

```text
scripts/initialize-world.mjs
```

Run:

```bash
node scripts/initialize-world.mjs
```

The script uses Midgard Hex Grid to generate coordinates and Convex to populate the database.

It initializes or verifies:

- 12 worlds
- 1,174 hexagons per world
- 14,088 hexagons in total
- Initial terrain: `ocean`
- Initial relief: `flat`

Initialization runs in batches.

Wait until the script finishes.

Expected final confirmation:

```text
All 12 worlds verified! Expected total: 14088 hexagons.
```

The script skips worlds that are already initialized and verifies their record counts.

Do not delete existing database records simply to repeat installation.

## 4. Verify the Database

Open the [Convex dashboard](https://dashboard.convex.dev/) and select your development deployment.

Under **Data**, verify:

| Table | Expected records |
|---|---:|
| `worlds` | 12 |
| `hexes` | 14,088 |
| `editors` | 0 initially |

Each world should have:

```text
initializationStatus: "ready"
```

World records and hexagons are stored in Convex, not in GitHub or Vercel.

### 4.1 Editor Registry

On 19 October 2026, the `editors` table was confirmed in the Convex Development dashboard.

It stores the private identities, public fantasy names and authorization information for invited editors and administrators.

The table is defined in:

```text
convex/schema.ts
```

The current editor fields are:

| Field | Type | Purpose |
|---|---|---|
| `email` | string | Private email address used for invitations |
| `trueName` | string | Private real name, managed by the administrator |
| `fantasyName` | string | Public display name |
| `clerkUserId` | optional string | Clerk user identifier after account linking |
| `role` | `admin` or `editor` | Authorization role |
| `worldId` | optional world ID | World assigned to the editor |

`clerkUserId` is optional because an invitation may exist before the invited person signs in.

`worldId` is optional because administrators are not restricted to one assigned world.

The editor table includes three indexes:

```text
editors.by_email
editors.by_clerk_user_id
editors.by_world
```

These indexes support efficient lookup by invited email address, authenticated Clerk identity and assigned world.

### 4.2 Private and Public Information

The editor registry separates real identities from public fantasy identities.

For example:

| Email | True name | Fantasy name |
|---|---|---|
| tom@example.com | Thomas Example | Tom Bombadil |
| giselle@example.com | Anna Example | Giselle |
| sam@example.com | Samuel Example | Samwise Gamgee |

These are illustrative records, not actual editor accounts.

The intended access rules are:

- **Administrators** can view and manage editor email addresses and true names.
- **Editors** can change their own fantasy names.
- **Editors** cannot change their registered email addresses or true names.
- **Visitors** can see public fantasy names but not private email addresses or true names.

These rules are architectural requirements. They are not enforced merely by defining the database schema.

Convex functions must enforce the rules before editor records are exposed or modified.

### 4.3 Authentication and Authorization

Civilization of Wonders uses **Clerk for authentication** and **Convex for authorization**.

Clerk verifies the user's Google account and manages authentication sessions.

Convex verifies Clerk-issued tokens and checks whether the authenticated user has permission to edit a world.

The intended login process is:

1. An administrator registers an editor's email, true name, fantasy name and world assignment.
2. The editor receives a private invitation.
3. The editor signs in through Clerk using Google.
4. Convex verifies the Clerk identity.
5. Convex matches the authenticated user to an authorized editor record.
6. The editor receives permission to edit their assigned world.

A fantasy name is a public display name, not a password or authentication credential.

An authenticated Google user is not automatically an authorized editor.

The Clerk–Convex connection has been configured, but editor authorization and the complete Google sign-in flow have not yet been tested end to end.

See [Part 4 — Authentication and Editor Permissions](INSTALLATION-GUIDE-PART-4.md).

## 5. Run Civilization of Wonders Locally

Keep Convex running in the first terminal:

```bash
npx convex dev
```

In another terminal, start Vite:

```bash
npm run dev
```

Open the local address printed by Vite.

### 5.1 Map Gallery

The application opens on the **Map Gallery** homepage.

The gallery contains twelve selectable world cards.

Initially, each card displays:

- `Unedited Map` as its title.
- `Editor 1`, `Editor 2`, etc. as placeholder editor names.

Visitors can select any of the twelve worlds.

The **World Builder** navigation option is disabled until a world has been selected.

### 5.2 World Builder

Selecting a gallery card opens the World Builder for that world.

The application:

1. Identifies the selected Convex world.
2. Subscribes to that world's hexagon records.
3. Renders its SVG hexagonal map.
4. Updates the left panel with the world title.
5. Updates the right panel with the corresponding editor title.

The SVG grid uses Midgard for coordinates and geometry.

Terrain values come from Convex through a real-time subscription.

The selected world determines which database records are displayed.

### 5.3 Twelve Independent Worlds

Each world has its own persistent terrain records.

Changing one world's terrain does not change the terrain of the other eleven worlds.

The world numbers are internal identifiers. Future gallery arrangements will not need to follow numerical order.

## 6. Test Real-Time Terrain Updates (Optional)

The backend includes an internal development mutation named:

```text
hexes:testSetTerrain
```

First, retrieve the world records:

```bash
npx convex run worlds:list
```

Find the document ID for World 1.

With World 1 open in the application, run:

```bash
npx convex run hexes:testSetTerrain '{"worldId":"YOUR_WORLD_1_ID","x":85,"y":27,"terrain":"grass"}'
```

Replace `YOUR_WORLD_1_ID` with the actual Convex document ID.

The hexagon at `(85, 27)` should turn green automatically without refreshing the browser.

The change is stored persistently in Convex.

To restore the original terrain, run the same command using:

```json
"terrain": "ocean"
```

The internal test mutation must not be replaced by an unauthenticated public write operation.

## 7. Shared Data and Real-Time Updates

Convex stores the world data centrally.

Multiple browsers can connect to the same deployment and subscribe to the same world.

When a hexagon record changes in Convex, subscribed clients can receive the updated terrain automatically.

This makes it possible to view the same world from different computers.

On 15 October 2026, Civilization of Wonders was successfully opened from two separate computers using the public Vercel website.

This confirms public access and shared world rendering.

**Important:** Browser-based terrain editing and simultaneous editor permissions have not yet been implemented.

## 8. Development and Production Environments

The first public Vercel deployment was configured with the existing Convex development deployment:

```text
https://youthful-reindeer-241.eu-west-1.convex.cloud
```

This allowed the public application to read the twelve already-initialized worlds.

For the initial deployment, the local development application and public website therefore use the same Convex database.

This is convenient for testing, but it is not the intended long-term production architecture.

A future improvement is to:

1. Create a separate Convex production deployment.
2. Deploy the backend schema and functions to production.
3. Initialize the twelve worlds in the production database.
4. Configure Vercel to use the production Convex URL.
5. Keep development and production data separate.

Deploying Convex functions does not automatically copy the development database records into production.

The production database must be initialized or migrated separately.

Clerk development and production instances must also use matching authentication configuration for their respective environments.

## 9. Installation Checklist

- [ ] npm dependencies are installed.
- [ ] TypeScript compilation succeeds.
- [ ] Your Convex development deployment is connected.
- [ ] Twelve worlds exist.
- [ ] All 14,088 hexagons are initialized.
- [ ] The `editors` table exists.
- [ ] Vite starts the application.
- [ ] The Map Gallery displays twelve world cards.
- [ ] Selecting a card opens the corresponding world.
- [ ] The left and right panel headings update.
- [ ] Optional: a Convex terrain change updates the SVG map automatically.
- [ ] Clerk authentication configuration is deployed.
- [ ] A real Google login is verified by Convex.

The final authentication check remains pending.

## 10. Current Limitations

The following features are not yet complete:

- Browser-based terrain editing.
- Google sign-in interface and authenticated-session verification.
- Administrator and editor permissions.
- Exclusive editing sessions and administrator takeover.
- Separate production Convex deployment.
- Custom domain configuration.

**Vercel hosting is implemented and verified.**

The application is publicly accessible at:

https://civ-8-world-builder.vercel.app

Visitors can view the worlds, but authenticated browser editing is not yet available.

**Continue with [Part 3 — Vercel Deployment](INSTALLATION-GUIDE-PART-3.md).**

---

*Last updated: 19 October 2026*
