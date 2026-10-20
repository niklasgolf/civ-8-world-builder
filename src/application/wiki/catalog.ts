
import type { IconName } from '../../library-svg-graphics/icons/icons.ts'

export type WikiCategoryId =
  | 'base-terrains'
  | 'terrain-features'
  | 'rivers-water'
  | 'resources'
  | 'improvements'
  | 'wonders'
  | 'continents'
  | 'builder-buttons'

const ICON_CATEGORY = {
  grass: 'base-terrains',
  plains: 'base-terrains',
  desert: 'base-terrains',
  tundra: 'base-terrains',
  snow: 'base-terrains',
  coast: 'base-terrains',
  ocean: 'base-terrains',

  woods: 'terrain-features',
  rainforest: 'terrain-features',
  marsh: 'terrain-features',
  oasis: 'terrain-features',
  floodplains: 'terrain-features',
  ice: 'terrain-features',
  reef: 'terrain-features',
  volcano: 'terrain-features',

  river: 'rivers-water',
  'river-source': 'rivers-water',
  'river-mouth': 'rivers-water',

  wheat: 'resources',
  cattle: 'resources',
  horses: 'resources',
  deer: 'resources',
  fish: 'resources',
  stone: 'resources',
  iron: 'resources',
  gold: 'resources',

  farm: 'improvements',
  mine: 'improvements',
  quarry: 'improvements',
  camp: 'improvements',
  pasture: 'improvements',
  fishing: 'improvements',
  plantation: 'improvements',
  fort: 'improvements',

  pyramid: 'wonders',
  colossus: 'wonders',
  lighthouse: 'wonders',
  temple: 'wonders',
  gardens: 'wonders',
  observatory: 'wonders',

  'continent-crimson': 'continents',
  'continent-blue': 'continents',
  'continent-green': 'continents',
  'continent-gold': 'continents',
  'continent-purple': 'continents',
  'continent-orange': 'continents',

  'brush-small': 'builder-buttons',
  'brush-medium': 'builder-buttons',
  'brush-large': 'builder-buttons',
  undo: 'builder-buttons',
  redo: 'builder-buttons',
} as const satisfies Record<IconName, WikiCategoryId>

export type WikiCategory = {
  readonly id: WikiCategoryId
  readonly label: string
}

export type WikiGroup = {
  readonly label: string
  readonly categories: readonly WikiCategory[]
}

export const WIKI_GROUPS: readonly WikiGroup[] = [
  {
    label: 'Encyclopedia',
    categories: [
      { id: 'base-terrains', label: 'Base Terrains' },
      { id: 'terrain-features', label: 'Terrain Features' },
      { id: 'rivers-water', label: 'Rivers & Water' },
      { id: 'resources', label: 'Resources' },
      { id: 'improvements', label: 'Improvements' },
      { id: 'wonders', label: 'Wonders' },
      { id: 'continents', label: 'Continents' },
    ],
  },
  {
    label: 'Editor Reference',
    categories: [{ id: 'builder-buttons', label: 'Builder Buttons' }],
  },
]

export function iconsFor(category: WikiCategoryId): readonly IconName[] {
  return (Object.keys(ICON_CATEGORY) as IconName[]).filter(
    (name) => ICON_CATEGORY[name] === category,
  )
}

export function iconTitle(name: IconName): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
