
import { createGrassIcon } from './terrain/icon-grass.ts'
import { createPlainsIcon } from './terrain/icon-plains.ts'
import { createDesertIcon } from './terrain/icon-desert.ts'
import { createTundraIcon } from './terrain/icon-tundra.ts'
import { createSnowIcon } from './terrain/icon-snow.ts'
import { createCoastIcon } from './terrain/icon-coast.ts'
import { createOceanIcon } from './terrain/icon-ocean.ts'

import { createWoodsIcon } from './features/icon-woods.ts'
import { createRainforestIcon } from './features/icon-rainforest.ts'
import { createMarshIcon } from './features/icon-marsh.ts'
import { createOasisIcon } from './features/icon-oasis.ts'
import { createFloodplainsIcon } from './features/icon-floodplains.ts'
import { createIceIcon } from './features/icon-ice.ts'
import { createReefIcon } from './features/icon-reef.ts'
import { createVolcanoIcon } from './features/icon-volcano.ts'

import { createRiverIcon } from './rivers/icon-river.ts'
import { createRiverSourceIcon } from './rivers/icon-river-source.ts'
import { createRiverMouthIcon } from './rivers/icon-river-mouth.ts'

import { createBrushSmallIcon } from './brush/icon-brush-small.ts'
import { createBrushMediumIcon } from './brush/icon-brush-medium.ts'
import { createBrushLargeIcon } from './brush/icon-brush-large.ts'
import { createUndoIcon } from './brush/icon-undo.ts'
import { createRedoIcon } from './brush/icon-redo.ts'

import { createPyramidIcon } from './wonders/icon-pyramid.ts'
import { createColossusIcon } from './wonders/icon-colossus.ts'
import { createLighthouseIcon } from './wonders/icon-lighthouse.ts'
import { createTempleIcon } from './wonders/icon-temple.ts'
import { createGardensIcon } from './wonders/icon-gardens.ts'
import { createObservatoryIcon } from './wonders/icon-observatory.ts'

import { createContinentCrimsonIcon } from './continents/icon-continent-crimson.ts'
import { createContinentBlueIcon } from './continents/icon-continent-blue.ts'
import { createContinentGreenIcon } from './continents/icon-continent-green.ts'
import { createContinentGoldIcon } from './continents/icon-continent-gold.ts'
import { createContinentPurpleIcon } from './continents/icon-continent-purple.ts'
import { createContinentOrangeIcon } from './continents/icon-continent-orange.ts'

import { createWheatIcon } from './resources/icon-wheat.ts'
import { createCattleIcon } from './resources/icon-cattle.ts'
import { createHorsesIcon } from './resources/icon-horses.ts'
import { createDeerIcon } from './resources/icon-deer.ts'
import { createFishIcon } from './resources/icon-fish.ts'
import { createStoneIcon } from './resources/icon-stone.ts'
import { createIronIcon } from './resources/icon-iron.ts'
import { createGoldIcon } from './resources/icon-gold.ts'

import { createFarmIcon } from './improvements/icon-farm.ts'
import { createMineIcon } from './improvements/icon-mine.ts'
import { createQuarryIcon } from './improvements/icon-quarry.ts'
import { createCampIcon } from './improvements/icon-camp.ts'
import { createPastureIcon } from './improvements/icon-pasture.ts'
import { createFishingIcon } from './improvements/icon-fishing.ts'
import { createPlantationIcon } from './improvements/icon-plantation.ts'
import { createFortIcon } from './improvements/icon-fort.ts'

const drawers = {
  grass: createGrassIcon,
  plains: createPlainsIcon,
  desert: createDesertIcon,
  tundra: createTundraIcon,
  snow: createSnowIcon,
  coast: createCoastIcon,
  ocean: createOceanIcon,

  woods: createWoodsIcon,
  rainforest: createRainforestIcon,
  marsh: createMarshIcon,
  oasis: createOasisIcon,
  floodplains: createFloodplainsIcon,
  ice: createIceIcon,
  reef: createReefIcon,
  volcano: createVolcanoIcon,

  river: createRiverIcon,
  'river-source': createRiverSourceIcon,
  'river-mouth': createRiverMouthIcon,

  'brush-small': createBrushSmallIcon,
  'brush-medium': createBrushMediumIcon,
  'brush-large': createBrushLargeIcon,
  undo: createUndoIcon,
  redo: createRedoIcon,

  pyramid: createPyramidIcon,
  colossus: createColossusIcon,
  lighthouse: createLighthouseIcon,
  temple: createTempleIcon,
  gardens: createGardensIcon,
  observatory: createObservatoryIcon,

  'continent-crimson': createContinentCrimsonIcon,
  'continent-blue': createContinentBlueIcon,
  'continent-green': createContinentGreenIcon,
  'continent-gold': createContinentGoldIcon,
  'continent-purple': createContinentPurpleIcon,
  'continent-orange': createContinentOrangeIcon,

  wheat: createWheatIcon,
  cattle: createCattleIcon,
  horses: createHorsesIcon,
  deer: createDeerIcon,
  fish: createFishIcon,
  stone: createStoneIcon,
  iron: createIronIcon,
  gold: createGoldIcon,

  farm: createFarmIcon,
  mine: createMineIcon,
  quarry: createQuarryIcon,
  camp: createCampIcon,
  pasture: createPastureIcon,
  fishing: createFishingIcon,
  plantation: createPlantationIcon,
  fort: createFortIcon,
}

export type IconName = keyof typeof drawers

export function createIcon(name: IconName): SVGSVGElement {
  return drawers[name]()
}
