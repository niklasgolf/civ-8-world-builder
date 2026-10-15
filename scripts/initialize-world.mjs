
import { execFileSync } from 'node:child_process'
import { HexGrid } from 'midgard-hex-grid'

const WORLD_NUMBER = 1
const EXPECTED_HEX_COUNT = 1174

const grid = new HexGrid('x-dominated')

const hexagons = grid.createGrid({
  hexDiameter: 260,
  skeletonWidth: 42,
  skeletonHeight: 13,
})

const coordinates = hexagons.map((hexagon) => ({
  x: hexagon.coordinate.x,
  y: hexagon.coordinate.y,
}))

if (coordinates.length !== EXPECTED_HEX_COUNT) {
  throw new Error(
    `Expected ${EXPECTED_HEX_COUNT} hexagons, received ${coordinates.length}`,
  )
}

const coordinateKeys = new Set(
  coordinates.map(({ x, y }) => `${x},${y}`),
)

if (coordinateKeys.size !== EXPECTED_HEX_COUNT) {
  throw new Error('Midgard returned duplicate coordinates')
}

console.log(`Midgard generated ${coordinates.length} unique coordinates.`)

const worldsJson = execFileSync(
  'npx',
  ['convex', 'run', 'worlds:list'],
  { encoding: 'utf8' },
)

const worlds = JSON.parse(worldsJson)
const world = worlds.find((item) => item.number === WORLD_NUMBER)

if (!world) {
  throw new Error(`World ${WORLD_NUMBER} does not exist in Convex`)
}

console.log(`Found World ${WORLD_NUMBER}: ${world._id}`)

const args = JSON.stringify({
  worldId: world._id,
  coordinates,
})

console.log('Scheduling world initialization in Convex...')

const result = execFileSync(
  'npx',
  ['convex', 'run', 'hexes:initializeWorld', args],
  { encoding: 'utf8' },
)

console.log(result)
