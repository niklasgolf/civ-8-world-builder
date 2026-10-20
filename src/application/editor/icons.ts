
import { createGrassIcon } from '../../library-svg-graphics/icons/terrain/icon-grass.ts'
import { createPlainsIcon } from '../../library-svg-graphics/icons/terrain/icon-plains.ts'
import { createDesertIcon } from '../../library-svg-graphics/icons/terrain/icon-desert.ts'
import { createTundraIcon } from '../../library-svg-graphics/icons/terrain/icon-tundra.ts'
import { createSnowIcon } from '../../library-svg-graphics/icons/terrain/icon-snow.ts'
import { createCoastIcon } from '../../library-svg-graphics/icons/terrain/icon-coast.ts'
import { createOceanIcon } from '../../library-svg-graphics/icons/terrain/icon-ocean.ts'

import { createWoodsIcon } from '../../library-svg-graphics/icons/features/icon-woods.ts'
import { createRainforestIcon } from '../../library-svg-graphics/icons/features/icon-rainforest.ts'
import { createMarshIcon } from '../../library-svg-graphics/icons/features/icon-marsh.ts'
import { createOasisIcon } from '../../library-svg-graphics/icons/features/icon-oasis.ts'
import { createFloodplainsIcon } from '../../library-svg-graphics/icons/features/icon-floodplains.ts'
import { createIceIcon } from '../../library-svg-graphics/icons/features/icon-ice.ts'
import { createReefIcon } from '../../library-svg-graphics/icons/features/icon-reef.ts'
import { createVolcanoIcon } from '../../library-svg-graphics/icons/features/icon-volcano.ts'

import { createRiverIcon } from '../../library-svg-graphics/icons/rivers/icon-river.ts'
import { createRiverSourceIcon } from '../../library-svg-graphics/icons/rivers/icon-river-source.ts'
import { createRiverMouthIcon } from '../../library-svg-graphics/icons/rivers/icon-river-mouth.ts'

import { createBrushSmallIcon } from '../../library-svg-graphics/icons/brush/icon-brush-small.ts'
import { createBrushMediumIcon } from '../../library-svg-graphics/icons/brush/icon-brush-medium.ts'
import { createBrushLargeIcon } from '../../library-svg-graphics/icons/brush/icon-brush-large.ts'
import { createUndoIcon } from '../../library-svg-graphics/icons/brush/icon-undo.ts'
import { createRedoIcon } from '../../library-svg-graphics/icons/brush/icon-redo.ts'

import { createPyramidIcon } from '../../library-svg-graphics/icons/wonders/icon-pyramid.ts'
import { createColossusIcon } from '../../library-svg-graphics/icons/wonders/icon-colossus.ts'
import { createLighthouseIcon } from '../../library-svg-graphics/icons/wonders/icon-lighthouse.ts'
import { createTempleIcon } from '../../library-svg-graphics/icons/wonders/icon-temple.ts'
import { createGardensIcon } from '../../library-svg-graphics/icons/wonders/icon-gardens.ts'
import { createObservatoryIcon } from '../../library-svg-graphics/icons/wonders/icon-observatory.ts'

import { createContinentCrimsonIcon } from '../../library-svg-graphics/icons/continents/icon-continent-crimson.ts'
import { createContinentBlueIcon } from '../../library-svg-graphics/icons/continents/icon-continent-blue.ts'
import { createContinentGreenIcon } from '../../library-svg-graphics/icons/continents/icon-continent-green.ts'
import { createContinentGoldIcon } from '../../library-svg-graphics/icons/continents/icon-continent-gold.ts'
import { createContinentPurpleIcon } from '../../library-svg-graphics/icons/continents/icon-continent-purple.ts'
import { createContinentOrangeIcon } from '../../library-svg-graphics/icons/continents/icon-continent-orange.ts'

import { createWheatIcon } from '../../library-svg-graphics/icons/resources/icon-wheat.ts'
import { createCattleIcon } from '../../library-svg-graphics/icons/resources/icon-cattle.ts'
import { createHorsesIcon } from '../../library-svg-graphics/icons/resources/icon-horses.ts'
import { createDeerIcon } from '../../library-svg-graphics/icons/resources/icon-deer.ts'
import { createFishIcon } from '../../library-svg-graphics/icons/resources/icon-fish.ts'
import { createStoneIcon } from '../../library-svg-graphics/icons/resources/icon-stone.ts'
import { createIronIcon } from '../../library-svg-graphics/icons/resources/icon-iron.ts'
import { createGoldIcon } from '../../library-svg-graphics/icons/resources/icon-gold.ts'

import { createFarmIcon } from '../../library-svg-graphics/icons/improvements/icon-farm.ts'
import { createMineIcon } from '../../library-svg-graphics/icons/improvements/icon-mine.ts'
import { createQuarryIcon } from '../../library-svg-graphics/icons/improvements/icon-quarry.ts'
import { createCampIcon } from '../../library-svg-graphics/icons/improvements/icon-camp.ts'
import { createPastureIcon } from '../../library-svg-graphics/icons/improvements/icon-pasture.ts'
import { createFishingIcon } from '../../library-svg-graphics/icons/improvements/icon-fishing.ts'
import { createPlantationIcon } from '../../library-svg-graphics/icons/improvements/icon-plantation.ts'
import { createFortIcon } from '../../library-svg-graphics/icons/improvements/icon-fort.ts'

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
