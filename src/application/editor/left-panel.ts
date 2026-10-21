
import { ToolSection } from './tool-section'
import { ToolButton } from './tool-button'
import { TerrainButton } from './terrain-button'

import { createGrassFlat } from '../../library-svg-graphics/terrain/grass.ts'
import { createGrassHills } from '../../library-svg-graphics/terrain/grass-hills.ts'
import { createGrassMountains } from '../../library-svg-graphics/terrain/grass-mountains.ts'

import { createPlainsFlat } from '../../library-svg-graphics/terrain/plains.ts'
import { createPlainsHills } from '../../library-svg-graphics/terrain/plains-hills.ts'
import { createPlainsMountains } from '../../library-svg-graphics/terrain/plains-mountains.ts'

import { createDesertFlat } from '../../library-svg-graphics/terrain/desert.ts'
import { createDesertHills } from '../../library-svg-graphics/terrain/desert-hills.ts'
import { createDesertMountains } from '../../library-svg-graphics/terrain/desert-mountains.ts'

import { createTundraFlat } from '../../library-svg-graphics/terrain/tundra.ts'
import { createTundraHills } from '../../library-svg-graphics/terrain/tundra-hills.ts'
import { createTundraMountains } from '../../library-svg-graphics/terrain/tundra-mountains.ts'

import { createSnowFlat } from '../../library-svg-graphics/terrain/snow.ts'
import { createSnowHills } from '../../library-svg-graphics/terrain/snow-hills.ts'
import { createSnowMountains } from '../../library-svg-graphics/terrain/snow-mountains.ts'

import { createCoast } from '../../library-svg-graphics/terrain/coast.ts'
import { createOcean } from '../../library-svg-graphics/terrain/ocean.ts'

export class LeftPanel {
  readonly element: HTMLDivElement
  readonly scroll: HTMLDivElement
  private readonly heading: HTMLHeadingElement
  private selectedTerrain = 'grass'

  constructor() {
    this.element = document.createElement('div')
    this.element.className = 'editor-layout__left-panel'

    this.scroll = document.createElement('div')
    this.scroll.className = 'tool-panel__scroll'

    this.heading = document.createElement('h2')
    this.heading.className = 'tool-section__title'
    this.heading.textContent = 'Unedited Map'

    const headingContainer = document.createElement('div')
    headingContainer.className = 'tool-section world-panel__info'
    headingContainer.append(this.heading)

    const brushSection = new ToolSection('Brush')
    const terrainSection = new ToolSection('Terrain')
    const featuresSection = new ToolSection('Features')
    const resourcesSection = new ToolSection('Resources')
    const riversSection = new ToolSection('Rivers')

    terrainSection.addGridClass('terrain-grid')

    const smallBrushButton = new ToolButton(
      'brush-small',
      'Small brush',
      'brush-small',
      'brush',
    )
    const mediumBrushButton = new ToolButton(
      'brush-medium',
      'Medium brush',
      'brush-medium',
      'brush',
    )
    const largeBrushButton = new ToolButton(
      'brush-large',
      'Large brush',
      'brush-large',
      'brush',
    )
    const undoButton = new ToolButton('undo', 'Undo', 'undo')
    const redoButton = new ToolButton('redo', 'Redo', 'redo')

    // Flat terrain — row 1
    const grassButton = new TerrainButton(
      'grass',
      'Grass',
      createGrassFlat,
    )
    const plainsButton = new TerrainButton(
      'plains',
      'Plains',
      createPlainsFlat,
    )
    const desertButton = new TerrainButton(
      'desert',
      'Desert',
      createDesertFlat,
    )
    const tundraButton = new TerrainButton(
      'tundra',
      'Tundra',
      createTundraFlat,
    )
    const snowButton = new TerrainButton(
      'snow',
      'Snow',
      createSnowFlat,
    )

    // Hills — row 2
    const grassHillsButton = new TerrainButton(
      'grass-hills',
      'Grass Hills',
      createGrassHills,
    )
    const plainsHillsButton = new TerrainButton(
      'plains-hills',
      'Plains Hills',
      createPlainsHills,
    )
    const desertHillsButton = new TerrainButton(
      'desert-hills',
      'Desert Hills',
      createDesertHills,
    )
    const tundraHillsButton = new TerrainButton(
      'tundra-hills',
      'Tundra Hills',
      createTundraHills,
    )
    const snowHillsButton = new TerrainButton(
      'snow-hills',
      'Snow Hills',
      createSnowHills,
    )

    // Mountains — row 3
    const grassMountainsButton = new TerrainButton(
      'grass-mountains',
      'Grass Mountains',
      createGrassMountains,
    )
    const plainsMountainsButton = new TerrainButton(
      'plains-mountains',
      'Plains Mountains',
      createPlainsMountains,
    )
    const desertMountainsButton = new TerrainButton(
      'desert-mountains',
      'Desert Mountains',
      createDesertMountains,
    )
    const tundraMountainsButton = new TerrainButton(
      'tundra-mountains',
      'Tundra Mountains',
      createTundraMountains,
    )
    const snowMountainsButton = new TerrainButton(
      'snow-mountains',
      'Snow Mountains',
      createSnowMountains,
    )

    // Water — column 7
    const coastButton = new TerrainButton(
      'coast',
      'Coast',
      createCoast,
    )
    const oceanButton = new TerrainButton(
      'ocean',
      'Ocean',
      createOcean,
    )

    const woodsButton = new ToolButton(
      'woods',
      'Woods',
      'woods',
      'features',
    )
    const rainforestButton = new ToolButton(
      'rainforest',
      'Rainforest',
      'rainforest',
      'features',
    )
    const marshButton = new ToolButton(
      'marsh',
      'Marsh',
      'marsh',
      'features',
    )
    const oasisButton = new ToolButton(
      'oasis',
      'Oasis',
      'oasis',
      'features',
    )
    const floodplainsButton = new ToolButton(
      'floodplains',
      'Floodplains',
      'floodplains',
      'features',
    )
    const iceButton = new ToolButton(
      'ice',
      'Ice',
      'ice',
      'features',
    )
    const reefButton = new ToolButton(
      'reef',
      'Reef',
      'reef',
      'features',
    )
    const volcanoButton = new ToolButton(
      'volcano',
      'Volcano',
      'volcano',
      'features',
    )

    const wheatButton = new ToolButton(
      'wheat',
      'Wheat',
      'wheat',
      'resources',
    )
    const cattleButton = new ToolButton(
      'cattle',
      'Cattle',
      'cattle',
      'resources',
    )
    const horsesButton = new ToolButton(
      'horses',
      'Horses',
      'horses',
      'resources',
    )
    const deerButton = new ToolButton(
      'deer',
      'Deer',
      'deer',
      'resources',
    )
    const fishButton = new ToolButton(
      'fish',
      'Fish',
      'fish',
      'resources',
    )
    const stoneButton = new ToolButton(
      'stone',
      'Stone',
      'stone',
      'resources',
    )
    const ironButton = new ToolButton(
      'iron',
      'Iron',
      'iron',
      'resources',
    )
    const goldButton = new ToolButton(
      'gold',
      'Gold',
      'gold',
      'resources',
    )

    const riverButton = new ToolButton(
      'river',
      'River',
      'river',
      'rivers',
    )
    const riverSourceButton = new ToolButton(
      'river-source',
      'River source',
      'river-source',
      'rivers',
    )
    const riverMouthButton = new ToolButton(
      'river-mouth',
      'River mouth',
      'river-mouth',
      'rivers',
    )

    brushSection.addButton(smallBrushButton)
    brushSection.addButton(mediumBrushButton)
    brushSection.addButton(largeBrushButton)
    brushSection.addButton(undoButton)
    brushSection.addButton(redoButton)
    mediumBrushButton.setSelected(true)

    terrainSection.addButton(grassButton)
    terrainSection.addButton(plainsButton)
    terrainSection.addButton(desertButton)
    terrainSection.addButton(tundraButton)
    terrainSection.addButton(snowButton)

    terrainSection.addButton(grassHillsButton)
    terrainSection.addButton(plainsHillsButton)
    terrainSection.addButton(desertHillsButton)
    terrainSection.addButton(tundraHillsButton)
    terrainSection.addButton(snowHillsButton)

    terrainSection.addButton(grassMountainsButton)
    terrainSection.addButton(plainsMountainsButton)
    terrainSection.addButton(desertMountainsButton)
    terrainSection.addButton(tundraMountainsButton)
    terrainSection.addButton(snowMountainsButton)

    terrainSection.addButton(coastButton)
    terrainSection.addButton(oceanButton)
    grassButton.setSelected(true)

    const terrainButtons = [
      grassButton, plainsButton, desertButton, tundraButton, snowButton,
      grassHillsButton, plainsHillsButton, desertHillsButton,
      tundraHillsButton, snowHillsButton,
      grassMountainsButton, plainsMountainsButton, desertMountainsButton,
      tundraMountainsButton, snowMountainsButton,
      coastButton, oceanButton,
    ]

    for (const button of terrainButtons) {
      button.element.addEventListener('click', () => {
        this.selectedTerrain = button.id
      })
    }

    featuresSection.addButton(woodsButton)
    featuresSection.addButton(rainforestButton)
    featuresSection.addButton(marshButton)
    featuresSection.addButton(oasisButton)
    featuresSection.addButton(floodplainsButton)
    featuresSection.addButton(iceButton)
    featuresSection.addButton(reefButton)
    featuresSection.addButton(volcanoButton)

    resourcesSection.addButton(wheatButton)
    resourcesSection.addButton(cattleButton)
    resourcesSection.addButton(horsesButton)
    resourcesSection.addButton(deerButton)
    resourcesSection.addButton(fishButton)
    resourcesSection.addButton(stoneButton)
    resourcesSection.addButton(ironButton)
    resourcesSection.addButton(goldButton)

    riversSection.addButton(riverButton)
    riversSection.addButton(riverSourceButton)
    riversSection.addButton(riverMouthButton)

    brushSection.setUnavailable()
    featuresSection.setUnavailable()
    resourcesSection.setUnavailable()
    riversSection.setUnavailable()

    this.scroll.append(
      brushSection.element,
      terrainSection.element,
      featuresSection.element,
      resourcesSection.element,
      riversSection.element,
    )

    this.element.append(headingContainer, this.scroll)
  }

  getSelectedTerrain(): string {
    return this.selectedTerrain
  }

  setWorldTitle(title: string): void {
    this.heading.textContent = title
  }
}
