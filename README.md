
## 🧭 Development Phases

### Chapter 1 — Recreate the Experiment

The first development phase focuses on faithfully recreating the existing experimental `civilization-8` application.

The goal is to preserve its appearance, styling, graphics, layout, and existing behavior while improving the internal organization of the code.

- Reproduce the original CSS rules without visual changes.
- Recreate the existing editor, tool panels, buttons, and navigation.
- Recreate the hexagonal map, SVG terrain graphics, and minimap.
- Preserve existing zoom, navigation, and database behavior.
- Organize all reusable SVG graphics in `src/library-svg-graphics/`.
- Keep application logic separate from graphical assets.
- Introduce no additional editor functionality during this phase.

**Completion criterion:** The new application looks and behaves like the original experiment.

### Chapter 2 — Develop the World Builder

Once the experimental application has been successfully recreated, development will focus on implementing new functionality.

Planned features include:

- Selecting different terrain types.
- Painting terrain onto individual hexagons.
- Creating intelligent drawing tools.
- Saving and restoring edited maps.
- Expanding the editor with additional features.

The guiding philosophy remains:

**Create a masterpiece with just a few choices and clicks.**
