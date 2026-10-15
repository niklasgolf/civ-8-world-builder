
import { execFileSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'
import { HexGrid } from 'midgard-hex-grid'

const EXPECTED_WORLD_COUNT = 12
const EXPECTED_HEX_COUNT = 1174
const POLL_INTERVAL_MS = 2000
const MAX_WAIT_MS = 120000

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

function runConvex(functionName, args) {
  const command = ['convex', 'run', functionName]

  if (args !== undefined) {
    command.push(JSON.stringify(args))
  }

  const output = execFileSync('npx', command, {
    encoding: 'utf8',
  })

  return JSON.parse(output)
}

function getWorlds() {
  return runConvex('worlds:list')
}

function getHexCount(worldId) {
  const hexes = runConvex('hexes:listByWorld', { worldId })

  return hexes.length
}

async function waitForWorld(worldId, worldNumber) {
  const deadline = Date.now() + MAX_WAIT_MS

  while (Date.now() < deadline) {
    const world = getWorlds().find(
      (item) => item._id === worldId,
    )

    if (!world) {
      throw new Error(`World ${worldNumber} disappeared`)
    }

    if (world.initializationStatus === 'ready') {
      const count = getHexCount(worldId)

      if (count !== EXPECTED_HEX_COUNT) {
        throw new Error(
          `World ${worldNumber} has ${count} hexagons, expected ${EXPECTED_HEX_COUNT}`,
        )
      }

      console.log(
        `World ${worldNumber} verified: ${count} hexagons.`,
      )

      return
    }

    console.log(
      `Waiting for World ${worldNumber}: ${world.initializationStatus ?? 'empty'}`,
    )

    await sleep(POLL_INTERVAL_MS)
  }

  throw new Error(
    `Timed out waiting for World ${worldNumber} to initialize`,
  )
}

async function main() {
  const worlds = getWorlds()

  if (worlds.length !== EXPECTED_WORLD_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_WORLD_COUNT} worlds, received ${worlds.length}`,
    )
  }

  const worldNumbers = new Set(worlds.map((world) => world.number))

  if (
    worldNumbers.size !== EXPECTED_WORLD_COUNT ||
    !Array.from(
      { length: EXPECTED_WORLD_COUNT },
      (_, index) => index + 1,
    ).every((number) => worldNumbers.has(number))
  ) {
    throw new Error('Expected exactly Worlds 1 through 12')
  }

  const orderedWorlds = [...worlds].sort(
    (a, b) => a.number - b.number,
  )

  for (const world of orderedWorlds) {
    console.log(`\nChecking World ${world.number}...`)

    if (world.initializationStatus === 'ready') {
      console.log(`World ${world.number} is already initialized.`)

      await waitForWorld(world._id, world.number)
      continue
    }

    if (world.initializationStatus === 'initializing') {
      console.log(
        `World ${world.number} is already initializing.`,
      )

      await waitForWorld(world._id, world.number)
      continue
    }

    const existingCount = getHexCount(world._id)

    if (existingCount !== 0) {
      throw new Error(
        `World ${world.number} has ${existingCount} hexagons but is not ready`,
      )
    }

    console.log(`Initializing World ${world.number}...`)

    const result = runConvex('hexes:initializeWorld', {
      worldId: world._id,
      coordinates,
    })

    console.log(result.message)

    await waitForWorld(world._id, world.number)
  }

  console.log('\nAll 12 worlds verified!')
  console.log(`Expected total: ${EXPECTED_WORLD_COUNT * EXPECTED_HEX_COUNT} hexagons.`)
}

await main()
