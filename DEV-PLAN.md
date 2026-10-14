# 🌍 Civilization of Wonders — World Builder

## ✨ Phase 2: The Connected World

*Simple code. Beautiful worlds. Real-time magic.*

---

# 🎯 Part 1 — Project Vision & Technology

## 🌎 Our Vision

Build a beautiful, real-time, multi-user world-building website where twelve approved creators each have their own permanent Civilization-style map.

🌍 **Everyone in the world** can watch the maps evolve live.

🔐 **Only the map owners** can edit their respective worlds.

⚡ **Every change appears in real time**, without saving or refreshing.

## 💡 Our Guiding Principle

**Simple to build. Beautiful to experience.**

Keep the implementation as simple as possible while making the experience feel extraordinary.

Prefer existing libraries, reusable object-oriented classes and managed services over complicated custom infrastructure.

## 🛠️ Our Technology

### 🎨 Application & Graphics

💻 **TypeScript + Vite** — Application foundation.

🧩 **Object-Oriented Programming** — Clean, reusable classes.

⬡ **midgard-hex-grid** — Hexagonal world geometry.

🖼️ **SVG** — Maps, icons and graphical elements.

### ☁️ Database & Authentication

⚡ **Convex** — Our only database, including real-time synchronization.

🔐 **Clerk + Google** — Authentication for approved creators.

### 🌐 Hosting & Website

🚀 **Vercel** — Hosting and deployment.

🌍 **mindchess.se** — Public domain, managed through Loopia.

### 👥 Visitor Technology

🖥️ **Felix's VisitorModule** — Visitor and device information.

📍 **IP-based Geolocation** — Approximate city and regional locations.

## 🚫 What We Will Not Build

❌ No IndexedDB.

❌ No separate synchronization server.

❌ No complicated map management system.

**One database. Twelve worlds. Real-time magic.**

## 📚 Reference Projects

📖 **Bokcirkel — Convex & Clerk**

[https://github.com/niklasgolf/bokcirkel](https://github.com/niklasgolf/bokcirkel)

🌍 **Felix's VisitorModule**

[https://github.com/FelixJrB/VisitorModule](https://github.com/FelixJrB/VisitorModule)

## 🐄 Mascot and Favicon

**Civilization of Wonders (CoW)** has a cheerful calf mascot.

👀 The calf has bright blue eyes, golden horns, a pink smiling muzzle, and a decorative dark-green leafy wreath.

🌊 The dark ocean-blue background connects the mascot visually with the game's world-building theme.

🤖 The original illustration was generated using ChatGPT.

✏️ We converted the original PNG illustration into genuine SVG vector artwork using [Vectorizely](https://vectorizely.com/).

📁 The finished SVG is already stored at `public/favicon-cow-vectorizely.svg`.

🖼️ SVG was chosen because our game uses SVG graphics.

![Civilization of Wonders mascot](public/favicon-cow-vectorizely.svg)

### 🐄 Cattle — An Early-Game Mega-Tile

This is a planned gameplay concept. It is not an implemented feature yet.

🥩 Cattle will be one of the most valuable resources during the early stages of Civilization of Wonders.

🏛️ Cattle represents the historical importance of domesticated animals in the development of civilization.

🌾 It provides a powerful combination of food production, agricultural development, and economic value.

🥛 Milk and other animal products help support growing populations.

🏘️ Cattle also contributes to production and the development of early settlements.

✨ Finding cattle should be an exciting discovery for players during the early game.

🧭 Cattle should be relatively rare, making its location strategically important.

🐄 The cheerful cow mascot is therefore not just decorative: it represents one of the game's important early resources.

---

# 🏛️ Part 2 — Website Structure & Navigation

*Four pages. One connected experience.*

## 🧭 Our Four Main Pages

The website has four navigation buttons, in exactly this order:

🌍 **1. World Builder** — Civilization-style hexagonal map editor and viewer.

📖 **2. CoW Wiki** — Existing Civilization of Wonders encyclopedia and reference page.

🗺️ **3. Map Gallery** — Public collection of twelve permanent, evolving worlds.

👥 **4. Visitors and Login** — Living visitor map and secure creator authentication.

## 🎨 One Consistent Visual Identity

All four pages share the same Civilization of Wonders design.

🏛️ **Shared navigation** — The same header and four navigation buttons.

🎨 **Consistent appearance** — Matching colors, typography, borders, icons and graphical details.

📐 **Three-column architecture** — Left and right panels are 600px wide on the desktop layout, with main content in the center.

🧩 **Reusable OOP components** — Reuse existing layout classes and visual components wherever practical.

**Goal:** Moving between pages should feel like exploring different rooms in the same application.

## 🌍 Page 1 — World Builder

⬡ Hexagonal maps rendered with midgard-hex-grid and SVG.

🛠️ 51 toolbar buttons organized into eight sections.

👁️ Read-only viewing mode.

✏️ Owner-authorized editing mode.

⚡ Real-time synchronization through Convex.

Only the authenticated map owner may edit their world.

## 📖 Page 2 — CoW Wiki

📚 Existing Civilization of Wonders reference material.

🎨 Matching visual design.

🔗 Shared navigation with the other pages.

## 🗺️ Page 3 — Map Gallery

🌎 Twelve permanent maps, one per creator.

🖼️ Four columns and three rows.

🏷️ Personal map titles.

👁️ Public viewing of every map.

🔐 Owner-only editing options.

## 👥 Page 4 — Visitors and Login

📊 **Left panel:** Visitor statistics.

🌍 **Center:** Real-world visitor map.

🔐 **Right panel:** Approved creator list and Google login.

The page is publicly accessible even to visitors who never log in.

---

# 🗺️ Part 3 — The Twelve Worlds & Map Gallery

## ✨ Our Gallery Motto

> **12 worlds · 1,144 hexagons per world · Infinite possibilities**

Display this subtitle prominently beneath the Map Gallery heading.

The number **1,144** is an important part of the project's identity.

## 🌍 Fixed World Dimensions

| Property | Value |
| --- | --- |
| ↔️ Width | 44 hexagons |
| ↕️ Height | 26 rows |
| ⬡ Hexagons per map | **1,144** |
| 🌎 Number of maps | **12** |
| ✨ Total hexagons | **13,728** |
| 🌊 Initial terrain | Ocean |
| 📐 Resizing | Not supported |

Every creator receives exactly one permanent map.

All twelve maps use the same geometry and coordinate system.

## 🌊 Every World Begins as Ocean

All twelve maps are initialized in Convex before their owners begin editing.

🌊 **Initial terrain:** Every hexagon is ocean.

👤 **One creator, one world:** Each approved creator owns exactly one map.

🚫 **No Create Map button:** Maps already exist.

🚫 **No resizing:** Every map stays 44 × 26.

🚫 **No additional maps:** Exactly twelve permanent worlds.

**A creator's first task is simply to transform their ocean into a world.**

## 🏷️ Personal Map Names

✏️ **Default title:** Unedited Map.

🔤 **Maximum length:** 40 characters.

👤 **Creator name:** Matches the approved login list.

⚡ **Automatic synchronization:** Renaming updates Convex.

🔐 **Ownership:** Only the owner may rename their map.

The editable title field appears above the map in the World Builder editor.

## 🖼️ Gallery Layout

The gallery displays twelve miniature maps in:

**4 columns × 3 rows**

Each gallery entry displays:

🏷️ **First:** The personal map title.

👤 **Second:** The creator's name.

⬡ **Third:** A miniature rendering of the actual hexagonal map.

The minimaps are **not** screenshots or static pictures.

They are real miniature renderings created from map data stored in Convex.

## 🕐 Simple Gallery Caching

📦 **Cached previews:** Preview data can be up to one hour old.

🔄 **Opening or reloading:** Retrieve the cached preview data.

⏳ **Refresh limit:** Regenerate cached preview data when necessary, at most once per hour.

🚫 **No continuous subscriptions:** The gallery does not subscribe to twelve live maps.

🚫 **No hourly browser timers:** Opening or reloading is sufficient.

The gallery should remain fast, simple and inexpensive.

## 👁️ Opening a Map

Clicking a gallery minimap opens the full-size map in read-only mode.

🌍 Anyone can view any map.

⚡ The full-size viewer subscribes to real-time Convex updates.

✏️ Only the owner sees the Edit option.

🔐 Other approved creators can watch but cannot edit.

## 🌎 Public from the Beginning

Every map is publicly visible immediately, including untouched ocean maps.

There is no publishing process, private draft system or map approval workflow.

**The entire world can watch twelve new civilizations emerge from the ocean.**

---

# ⚡ Part 4 — Real-Time Editing & Security

*Change one hexagon. Change the world.*

## 🎯 Our Main Feature

A creator changes a hexagon on one laptop, and everyone watching that map sees the change automatically.

No refreshing.

No manual saving.

No separate synchronization server.

Convex handles real-time communication.

## ✏️ Editing Workflow

### 🔐 Step 1 — Authenticate

An approved creator signs in using Clerk and Google.

### 👤 Step 2 — Open Their World

The creator opens their permanent map from the gallery.

### 👁️ Step 3 — View Mode

The map initially opens in read-only mode.

### ✏️ Step 4 — Activate Editing

The owner clicks Edit to activate the editing tools.

### ⬡ Step 5 — Change a Hexagon

The creator selects a terrain tool and modifies the map.

### ⚡ Step 6 — Automatic Convex Saving

The editing action is sent to Convex and stored automatically.

### 🌍 Step 7 — Everyone Sees the Change

Other connected browsers receive the updated map through real-time subscriptions.

## 🚫 No Save Button

Every completed editing action is automatically saved.

❌ No manual Save button.

❌ No publishing workflow.

❌ No complicated map version system.

❌ No separate synchronization service.

Convex contains the latest successfully saved state.

## ↩️ Undo & Redo

Our existing Brush toolbar contains Undo and Redo buttons.

↩️ **Undo:** Reverse the most recent editing action.

↪️ **Redo:** Reapply an undone action.

⚡ **Real-time corrections:** Undo and Redo also update Convex.

🧩 **Simple implementation:** Editing history exists only during the current editing session.

No permanent database history of every edit is required.

## 👥 Twelve Approved Creators

A maximum of twelve authorized creators, including the project owner.

📋 **Preapproved list:** Creators are configured in advance.

👤 **Visible names:** The names appear on the Visitors and Login page.

🖱️ **Name selection:** Clicking a name begins the login process.

🔐 **Google authentication:** Clerk verifies the Google identity.

🛡️ **Convex authorization:** The authenticated identity must match the selected approved creator.

Unapproved Google accounts receive no editing permissions.

## 🔒 Ownership & Security

👁️ **Ordinary visitors:** View every map.

👥 **Other approved creators:** View each other's maps.

✏️ **Map owner:** Edit terrain and rename their map.

🛡️ **Server-side validation:** Every protected Convex mutation verifies ownership.

Hiding editing buttons is **not** sufficient security.

Convex must enforce authorization independently of the UI.

## 🎓 Real-Time University Demonstration

💻 **Laptop A:** Teacher changes an ocean hexagon into grass.

☁️ **Convex:** Saves and distributes the update.

💻 **Laptop B:** Student sees the grass appear without refreshing.

🌍 **Public visitors:** Anyone viewing that world sees the same update.

**One action. One database. A world that changes everywhere.**

---

# 🌍 Part 5 — Visitors, World Map & Statistics

*A living map of our visitors around the world.*

## ✨ The Idea

The Visitors and Login page is more than an authentication screen.

It features a real-world map showing the approximate geographic distribution of website visitors.

Colorful dots reveal device type and activity.

The map should feel alive, elegant and fascinating to explore.

## 🏛️ Three-Column Layout

Reuse the World Builder architecture.

📊 **Left panel — Statistics**

600px wide, displaying visitor counts and interesting statistics.

🌍 **Center — Visitor world map**

A real geographical map in the same central position as the hexagonal World Builder map.

🔐 **Right panel — Login**

600px wide, displaying the twelve approved creators and login functionality.

## 👥 Who Counts as a Visitor?

Anyone visiting any part of the Civilization of Wonders website.

🌍 Public visitors count.

📖 CoW Wiki readers count.

🗺️ Map Gallery visitors count.

✏️ Approved creators count.

🔄 Returning visits may contribute to statistics.

We count visits and sessions without claiming that every record represents a unique human being.

## 🎨 Device Colors

Color identifies the visitor's device category.

🟢 **Mac:** Green.

🔴 **Windows PC:** Red.

🔵 **Mobile:** Blue.

🟡 **Other:** Gold.

These colors are proposed and may be refined.

**Important:** Device colors stay the same across all activity categories.

## 💓 Three Activity Categories

### 💚 1. Online Now — Pulsing Dots

Currently active visitors appear as large animated dots.

💓 The dots expand and contract gently, like a heartbeat.

✨ Movement makes the map feel alive.

### 🟠 2. Last Seven Days — Large Dots

Visitors active within the last seven days, but no longer online, appear as large stationary dots.

🎨 Their original device colors remain unchanged.

### 🔹 3. Historical Visitors — Tiny Dots

Visitors whose last activity was more than seven days ago appear as very small stationary dots.

🎨 Their original device colors remain unchanged.

🌍 Over time, the map fills with colorful points.

## 📊 Subtle Visitor Statistics

The left panel displays:

🌎 **Total Visits:** Recorded visits throughout the website's history.

📅 **Visits This Week:** Visits during the last seven days.

💓 **Visitors Online Now:** Currently active visitor sessions.

🎨 **Visual style:** Elegant typography in soft, faded grey.

Statistics should complement the map, not compete with it.

Additional statistics are optional if they remain easy to implement.

## 📍 Approximate Geolocation

Use a simple IP-based geolocation solution.

🌍 Approximate city or regional accuracy.

🚫 No GPS permissions.

🧩 Minimal custom code.

🔒 Avoid retaining raw IP addresses longer than necessary.

Use suitable privacy and retention safeguards.

## 🧩 Felix's VisitorModule

Reference:

[https://github.com/FelixJrB/VisitorModule](https://github.com/FelixJrB/VisitorModule)

Reuse the module wherever practical.

🖥️ Device and operating system information.

📱 Desktop, tablet and mobile categories.

☁️ Store relevant visitor information in Convex.

📍 Supplement the module with approximate IP-based geolocation.

Confirm the simplest way to integrate its Node-based functionality into our Vite, Convex and Vercel architecture.

## ⚡ Real-Time Presence

Use a simple heartbeat and timeout mechanism.

💓 **Heartbeat:** Active visitor sessions periodically report their presence.

⏳ **Timeout:** A visitor who stops reporting activity is no longer considered online.

🌍 **Visual transition:** Pulsing dot becomes a stationary recent-visitor dot.

📅 **After seven days:** The dot becomes very small.

☁️ **Convex:** Stores visitor records and supports live updates.

## 🔐 Login Panel

The right panel displays the twelve approved creators.

👤 Click your own name.

🔐 Authenticate through Clerk and Google.

🛡️ Convex verifies the authenticated identity.

🗺️ Authorized creators can access editing of their own map.

Ordinary visitors can enjoy the visitor map without logging in.

## ❤️ Visual Goal

**A world map that grows more beautiful as people visit.**

Color reveals the device.

Size reveals the age of the visit.

Movement reveals who is here right now.

---

# 🧭 Part 6 — Development Roadmap

*Build simply. Test carefully. Make it beautiful.*

## 🎯 Development Strategy

Build incrementally through small, manageable exercises.

🧩 Reuse existing OOP classes and graphics.

🎓 Understand the implementation.

⚡ Prioritize real-time functionality.

🎨 Preserve the Civilization of Wonders appearance.

🚫 Avoid unnecessary complexity.

## 🏗️ Step 1 — Convex Foundation

☁️ Connect the existing Vite/TypeScript application to Convex.

📚 Study the Bokcirkel reference project.

👥 Define twelve approved creator records.

🗺️ Define map and hexagon data structures.

🌊 Initialize twelve permanent 44 × 26 ocean maps.

**Milestone:** All twelve worlds exist in Convex.

## 🔐 Step 2 — Clerk Authentication

👤 Configure approved creators.

🔐 Integrate Clerk and Google sign-in.

🛡️ Connect Clerk authentication to Convex authorization.

🔒 Restrict editing to each map's owner.

🧪 Test unauthorized access.

**Milestone:** Only approved owners can edit their worlds.

## ⬡ Step 3 — Hexagonal World Rendering

🧩 Reuse midgard-hex-grid.

🎨 Render the world with SVG.

🌊 Display all 1,144 ocean hexagons.

📐 Preserve 44 × 26 dimensions.

🖥️ Integrate with the existing OOP World Builder layout.

**Milestone:** A complete ocean world appears.

## ⚡ Step 4 — Real-Time Terrain Editing

🌱 Start with Grass, Plains, Desert, Tundra, Snow, Coast and Ocean.

🖱️ Select terrain tools and edit hexagons.

☁️ Automatically save actions to Convex.

🌍 Subscribe to updates in other browsers.

↩️ Implement Undo and Redo.

🧪 Test simultaneous editing and viewing on two laptops.

**Milestone:** A change on one laptop appears on another.

## 🗺️ Step 5 — Map Gallery

🏛️ Create the Map Gallery page.

📐 Arrange twelve maps in four columns and three rows.

🏷️ Display titles and creator names.

⬡ Render real miniature hexagonal maps.

🕐 Cache previews for up to one hour.

👁️ Add full-size read-only viewing.

✏️ Show Edit only to the owner.

**Milestone:** Everyone can explore twelve public worlds.

## 🌍 Step 6 — Visitors and Login

📊 Create visitor statistics.

🌎 Display a real geographical world map.

🖥️ Integrate Felix's VisitorModule where practical.

📍 Add approximate IP-based geolocation.

☁️ Store visitor records in Convex.

💓 Implement heartbeat-based online presence.

🎨 Render colored dots with three activity appearances.

🔐 Display approved creators and Google login.

**Milestone:** Visitors appear on a living world map.

## 🚀 Step 7 — Public Deployment

🌐 Deploy through Vercel.

🔗 Connect mindchess.se using Loopia DNS.

☁️ Configure production Convex.

🔐 Configure production Clerk.

🛡️ Verify authorization.

💻 Test real-time updates on multiple laptops.

📱 Check smaller-screen usability.

**Milestone:** Civilization of Wonders is publicly accessible at mindchess.se.

## 🧪 Final Acceptance Checklist

### 🌊 Maps

- [ ] Twelve permanent maps exist.
- [ ] Each map contains exactly 1,144 hexagons.
- [ ] All maps begin as ocean.
- [ ] Each creator owns one map.

### ⚡ Editing

- [ ] Only the owner can edit.
- [ ] Edits save automatically.
- [ ] Other browsers update in real time.
- [ ] Undo and Redo work.
- [ ] Owners can rename maps.

### 🗺️ Gallery

- [ ] Twelve maps appear in a 4 × 3 layout.
- [ ] Titles and creator names are visible.
- [ ] Miniature maps render actual hex-grid data.
- [ ] Gallery previews use hourly caching.
- [ ] Full-size maps update live.

### 🌍 Visitors

- [ ] Visitor records are stored in Convex.
- [ ] Approximate locations appear on the world map.
- [ ] Device categories have distinct colors.
- [ ] Online visitors pulse.
- [ ] Recent and historical visitors have different sizes.
- [ ] Visitor statistics are displayed.

### 🔐 Security & Deployment

- [ ] Clerk authenticates approved creators.
- [ ] Convex enforces map ownership.
- [ ] Public visitors cannot modify maps.
- [ ] The site works through Vercel and mindchess.se.

## ❓ Details to Finalize During Implementation

🔧 Precise Convex data model and OOP responsibilities.

🎨 Terrain tools and graphical assets to complete first.

🧩 Simplest VisitorModule integration.

📍 Geolocation provider.

🔒 Visitor privacy and retention rules.

🕐 Gallery cache implementation.

📱 Responsive behavior.

These decisions should not complicate our initial implementation.

---

# ❤️ Our Development Philosophy

## Simple code.

## Clear OOP responsibilities.

## Beautiful SVG graphics.

## Real-time magic.

**🌍 Twelve worlds. 13,728 hexagons. Infinite possibilities.**
