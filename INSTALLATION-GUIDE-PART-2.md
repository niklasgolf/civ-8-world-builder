
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

Each world should have:

```text
initializationStatus: "ready"
```

World records and hexagons are stored in Convex, not in GitHub or Vercel.

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

## 9. Installation Checklist

- [ ] npm dependencies are installed.
- [ ] TypeScript compilation succeeds.
- [ ] Your Convex development deployment is connected.
- [ ] Twelve worlds exist.
- [ ] All 14,088 hexagons are initialized.
- [ ] Vite starts the application.
- [ ] The Map Gallery displays twelve world cards.
- [ ] Selecting a card opens the corresponding world.
- [ ] The left and right panel headings update.
- [ ] Optional: a Convex terrain change updates the SVG map automatically.

## 10. Current Limitations

The following features are not yet complete:

- Browser-based terrain editing.
- Clerk authentication and Google sign-in.
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

*Last updated: 15 October 2026*
