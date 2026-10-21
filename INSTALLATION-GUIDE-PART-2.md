
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

The editor fields are:

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

These rules must be enforced by Convex functions, not merely by defining the database schema.

### 4.3 Authentication and Authorization

Civilization of Wonders uses **Clerk for authentication** and **Convex for authorization**.

Clerk verifies the user's Google account and manages authentication sessions.

Convex verifies Clerk-issued tokens and checks whether the authenticated user has permission to edit a world.

The login process is:

1. An administrator registers an editor's email, true name, fantasy name and world assignment.
2. The editor receives a private invitation.
3. The editor signs in through Clerk using Google.
4. Convex verifies the Clerk identity.
5. Convex matches the authenticated user to an authorized editor record.
6. The editor receives permission to edit their assigned world.

A fantasy name is a public display name, not a password or authentication credential.

An authenticated Google user is not automatically an authorized editor.

**21 October 2026 update:** Authentication and editor-controlled painting were demonstrated successfully using separate Legolas and Frodo accounts.

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
npx convex run hexes:testSetTerrain '{"worldId":"YOUR_WORLD_1_ID","x":85,"y":27,"terrain":"grass","relief":"flat"}'
```

Replace `YOUR_WORLD_1_ID` with the actual Convex document ID.

The hexagon at `(85, 27)` should turn green automatically without refreshing the browser, provided the coordinate exists in that world.

The change is stored persistently in Convex.

To restore the original terrain, run the same command using:

```json
"terrain": "ocean"
```

Keep `"relief": "flat"`.

The internal test mutation must not be replaced by an unauthenticated public write operation.

**21 October update:** This terminal-based test is no longer required for ordinary terrain painting. Authorized editors can now paint directly in the browser.

## 7. Shared Data and Real-Time Updates

Convex stores the world data centrally.

Multiple browsers can connect to the same deployment and subscribe to the same world.

When a hexagon record changes in Convex, subscribed clients receive the updated terrain automatically.

This makes it possible to view the same world from different computers.

On 15 October 2026, Civilization of Wonders was successfully opened from two separate computers using the public Vercel website.

### 7.1 Interactive Terrain Painting — 21 October 2026

Interactive terrain painting is now implemented.

The World Builder supports **17 terrain and relief combinations**:

| Terrain | Flat | Hills | Mountains |
|---|---|---|---|
| Grass | Yes | Yes | Yes |
| Plains | Yes | Yes | Yes |
| Desert | Yes | Yes | Yes |
| Tundra | Yes | Yes | Yes |
| Snow | Yes | Yes | Yes |
| Coast | Yes | — | — |
| Ocean | Yes | — | — |

The database stores terrain and relief separately.

Terrain values:

```ts
type Terrain =
  | 'ocean'
  | 'coast'
  | 'grass'
  | 'plains'
  | 'desert'
  | 'tundra'
  | 'snow'
```

Relief values:

```ts
type Relief = 'flat' | 'hills' | 'mountain'
```

Note that the database uses the singular value `mountain`, even though some graphic filenames and terrain-button identifiers use `mountains`.

### 7.2 Painting Workflow

When an authorized editor paints a hexagon:

1. The editor selects a terrain button in the left panel.
2. The editor clicks a hexagon on the SVG map.
3. `MapGrid` reports the clicked coordinates through `onHexClick()`.
4. The application verifies that the current user controls the editing session.
5. The selected terrain is converted into database terrain and relief values.
6. The frontend calls `api.hexes.setTerrain`.
7. Convex verifies the authenticated user's editing permissions.
8. Convex updates the corresponding hexagon record.
9. The reactive `api.hexes.listByWorld` subscription receives the updated world data.
10. `WorldMapController` renders the corresponding SVG terrain graphic.

The authoritative terrain state is stored in Convex.

The SVG map is a reactive representation of that database state.

### 7.3 Backend Authorization

The `hexes.setTerrain` mutation checks:

- The authenticated Clerk identity.
- The user's registered editor or administrator role.
- Authorization to edit the selected world.
- Ownership of the active editing session.
- World initialization status.
- Valid hexagon coordinates.
- Existence of the corresponding hexagon record.

The frontend also checks whether the current user controls the editing session.

However, **the backend authorization is the security boundary**. A disabled frontend button alone does not prevent unauthorized database modifications.

### 7.4 Real-Time Collaboration Test

On **21 October 2026**, the following workflow was demonstrated:

1. Legolas opened and edited a world.
2. Terrain painting was saved successfully to Convex.
3. Frodo accessed the application using a separate account.
4. Frodo created a terrain map.
5. Legolas could view Frodo's world from another browser.

This demonstrated persistent terrain storage and synchronization between different authenticated users.

The first demonstration worlds included a smiling face and a world displaying the name **FRODO**.

### 7.5 Convex Backend Synchronization

During testing, a terrain mutation initially failed because the running Convex backend still used an older terrain validator.

The browser console reported an `ArgumentValidationError` when painting Plains.

The updated backend was deployed using:

```bash
npx convex dev --once
```

The terminal confirmed that Convex functions were ready.

After refreshing the browser, terrain painting worked successfully.

**Important:** Updating TypeScript frontend code does not automatically deploy changed Convex functions unless the Convex development process is running or the backend is deployed explicitly.

When the schema or backend mutations change, ensure the correct Convex deployment receives the updates.

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

**Status on 21 October 2026:** The public Vercel application still uses the Convex development deployment and Clerk development instance.

## 9. Installation Checklist

- [x] npm dependencies are installed.
- [x] TypeScript compilation succeeds.
- [x] Convex development deployment is connected.
- [x] Twelve worlds exist.
- [x] All 14,088 hexagons are initialized.
- [x] The `editors` table exists.
- [x] Vite starts the application.
- [x] The Map Gallery displays twelve world cards.
- [x] Selecting a card opens the corresponding world.
- [x] The left and right panel headings update.
- [x] Convex terrain changes update the SVG map automatically.
- [x] Clerk authentication configuration is deployed.
- [x] Google-authenticated users can access the application.
- [x] Authorized editors can paint terrain.
- [x] Terrain changes persist in Convex.
- [x] Changes appear in another connected browser.
- [ ] A separate production Convex deployment is configured.
- [ ] A matching Clerk production instance is configured.
- [ ] Public invitation and access-control testing is completed.

## 10. Current Limitations

The following features are not yet complete:

- Additional brush sizes and brush actions.
- Features, resources, and river painting.
- Separate production Convex deployment.
- Matching Clerk production configuration.
- Custom domain configuration.
- Final production hardening and broader invitation testing.

**Vercel hosting and interactive terrain painting are implemented and verified.**

The application is publicly accessible at:

https://civ-8-world-builder.vercel.app

Visitors can view worlds, while authorized editors can paint their assigned worlds through an active editing session.

**Continue with [Part 3 — Vercel Deployment](INSTALLATION-GUIDE-PART-3.md).**

---

*Original guide last updated: 19 October 2026; collaborative editing milestone: 21 October 2026*
