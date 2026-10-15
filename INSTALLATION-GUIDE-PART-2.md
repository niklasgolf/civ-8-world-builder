
# 📗 Civilization of Wonders — Part 2: Convex Database

[← Installation Guide](INSTALLATION-GUIDE.md) | [← Part 1](INSTALLATION-GUIDE-PART-1.md)

## 1. Create Your Convex Deployment

Create a free account at [Convex](https://www.convex.dev/).

From the application directory, run:

```bash
npx convex dev
```

Follow the setup prompts:

1. Sign in to your Convex account.
2. Create a new project, for example `civilization-of-wonders`.
3. Select a **cloud development deployment**.
4. Skip optional AI development files unless you want them.

Convex creates `.env.local` with values similar to:

```dotenv
CONVEX_DEPLOYMENT=dev:your-deployment
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_CONVEX_SITE_URL=https://your-deployment.convex.site
```

Use the values generated for **your own project**.

Keep `npx convex dev` running in this terminal. It deploys the backend schema and functions as needed.

**Security:** `.env.local` must remain excluded from Git. Never put secrets in `VITE_` variables because those values are accessible to browser code.

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

Run this command only once per new deployment. It rejects initialization if world records already exist.

## 3. Initialize the Hexagons

The repository includes:

```text
scripts/initialize-world.mjs
```

Run:

```bash
node scripts/initialize-world.mjs
```

The script uses Midgard to generate the coordinates and Convex to populate each world.

It initializes or verifies:

- 12 worlds
- 1,174 hexagons per world
- 14,088 hexagons in total
- Initial terrain: `ocean`
- Initial relief: `flat`

Initialization runs in batches. Wait for completion.

Expected final confirmation:

```text
All 12 worlds verified! Expected total: 14088 hexagons.
```

The script skips worlds that are already initialized and verifies their record counts. Do not delete existing data to repeat installation.

## 4. Verify the Database

Open the [Convex dashboard](https://dashboard.convex.dev/) and select your development deployment.

Under **Data**, verify:

| Table | Expected records |
|---|---:|
| `worlds` | 12 |
| `hexes` | 14,088 |

Each world should have `initializationStatus: "ready"`.

The world records and hexagons are stored in your Convex deployment, not in GitHub.

## 5. Run Civilization of Wonders

Keep Convex running in the first terminal:

```bash
npx convex dev
```

In the second terminal, start Vite:

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

The world numbers are internal identifiers. Future gallery arrangements will not need to follow their numerical order.

## 6. Test Real-Time Terrain Updates (Optional)

The backend includes a development-only internal mutation named `hexes:testSetTerrain`.

First, find your World 1 document ID:

```bash
npx convex run worlds:list
```

Then, with the application open and World 1 selected, run the following command using your own World 1 ID:

```bash
npx convex run hexes:testSetTerrain '{"worldId":"YOUR_WORLD_1_ID","x":85,"y":27,"terrain":"grass"}'
```

The hexagon at `(85, 27)` should turn green automatically, without refreshing the browser.

This change is stored persistently in Convex.

To restore the ocean terrain, run the same command with `"terrain":"ocean"`.

The test mutation is internal and must not be exposed as an unauthenticated public write operation.

## 7. Installation Checklist

- [ ] npm dependencies are installed.
- [ ] TypeScript compilation succeeds.
- [ ] Your own Convex cloud deployment is connected.
- [ ] Twelve worlds exist.
- [ ] All 14,088 hexagons are initialized.
- [ ] Vite starts the application.
- [ ] The Map Gallery displays twelve world cards.
- [ ] Selecting a card opens the corresponding world.
- [ ] The left and right panel headings update for the selected world.
- [ ] Optional: a Convex terrain change updates the SVG map automatically.

## 8. Current Limitations

The following features are not yet complete:

- Browser-based terrain editing.
- Clerk authentication and Google sign-in.
- Administrator and editor permissions.
- Exclusive editing sessions and administrator takeover.
- Production hosting with Vercel.
- Custom domain configuration.

The Map Gallery and world selection are implemented.

Visitors can view the worlds, but database mutations are not yet connected to authenticated browser editing.

Production deployment will be documented separately when the Vercel setup has been tested.

---

*Last updated: 15 October 2026*
