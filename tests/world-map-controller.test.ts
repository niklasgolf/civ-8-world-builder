import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ConvexClient } from 'convex/browser'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { MapGrid } from '../src/application/map/map-grid.ts'
import { WorldMapController } from '../src/application/map/world-map-controller.ts'

type HexData = {
  x: number
  y: number
  terrain: string
  relief: string
}

type Subscription = {
  worldId: Id<'worlds'>
  onUpdate: (hexes: HexData[]) => void
  onError: (error: Error) => void
  unsubscribe: ReturnType<typeof vi.fn>
  active: boolean
}

function createFakeClient() {
  const subscriptions: Subscription[] = []

  const onUpdate = vi.fn((
    _query: unknown,
    args: { worldId: Id<'worlds'> },
    callback: (hexes: HexData[]) => void,
    errorCallback: (error: Error) => void
  ) => {
    const subscription: Subscription = {
      worldId: args.worldId,
      onUpdate: callback,
      onError: errorCallback,
      unsubscribe: vi.fn(() => {
        subscription.active = false
      }),
      active: true
    }

    subscriptions.push(subscription)

    return subscription.unsubscribe
  })

  return {
    client: { onUpdate } as unknown as ConvexClient,
    onUpdate,
    subscriptions,
    emit(index: number, hexes: HexData[]): void {
      const subscription = subscriptions[index]

      if (!subscription) {
        throw new Error(`Subscription ${index} does not exist`)
      }

      if (subscription.active) {
        subscription.onUpdate(hexes)
      }
    }
  }
}

function createFakeMapGrid() {
  const setHexGraphic = vi.fn()

  return {
    mapGrid: { setHexGraphic } as unknown as MapGrid,
    setHexGraphic
  }
}

const WORLD_A = 'world-a' as Id<'worlds'>
const WORLD_B = 'world-b' as Id<'worlds'>

describe('WorldMapController — existing behavior', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('does not subscribe before a world is selected', () => {
    const { client, onUpdate } = createFakeClient()
    const { mapGrid } = createFakeMapGrid()

    new WorldMapController(client, mapGrid)

    expect(onUpdate).not.toHaveBeenCalled()
  })

  it('subscribes when a world is selected', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)

    expect(fake.onUpdate).toHaveBeenCalledOnce()
    expect(fake.subscriptions[0].worldId).toBe(WORLD_A)
    expect(fake.subscriptions[0].active).toBe(true)
  })

  it('renders grass terrain from a subscription update', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)

    fake.emit(0, [
      { x: 2, y: 3, terrain: 'grass', relief: 'flat' }
    ])

    expect(setHexGraphic).toHaveBeenCalledOnce()

    const [coordinate, graphic] = setHexGraphic.mock.calls[0]

    expect(coordinate).toEqual({ x: 2, y: 3 })
    expect(graphic).toBeInstanceOf(SVGSVGElement)
  })

  it('renders multiple hexagons from one update', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)

    fake.emit(0, [
      { x: 1, y: 2, terrain: 'grass', relief: 'flat' },
      { x: 3, y: 4, terrain: 'plains', relief: 'hills' },
      { x: 5, y: 6, terrain: 'ocean', relief: 'flat' }
    ])

    expect(setHexGraphic).toHaveBeenCalledTimes(3)

    expect(setHexGraphic.mock.calls.map(([coordinate]) => coordinate))
      .toEqual([
        { x: 1, y: 2 },
        { x: 3, y: 4 },
        { x: 5, y: 6 }
      ])
  })

  it('supports all 17 terrain and relief combinations', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    const hexes: HexData[] = []

    for (const terrain of [
      'grass',
      'plains',
      'desert',
      'tundra',
      'snow'
    ]) {
      for (const relief of ['flat', 'hills', 'mountain']) {
        hexes.push({
          x: hexes.length,
          y: 0,
          terrain,
          relief
        })
      }
    }

    hexes.push(
      { x: 15, y: 0, terrain: 'coast', relief: 'flat' },
      { x: 16, y: 0, terrain: 'ocean', relief: 'flat' }
    )

    controller.selectWorld(WORLD_A)
    fake.emit(0, hexes)

    expect(setHexGraphic).toHaveBeenCalledTimes(17)

    for (const [, graphic] of setHexGraphic.mock.calls) {
      expect(graphic).toBeInstanceOf(SVGSVGElement)
    }
  })

  it('skips unsupported terrain without stopping the update', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    controller.selectWorld(WORLD_A)

    fake.emit(0, [
      { x: 1, y: 1, terrain: 'unknown', relief: 'flat' },
      { x: 2, y: 2, terrain: 'grass', relief: 'flat' }
    ])

    expect(errorSpy).toHaveBeenCalledWith(
      'Unsupported terrain: unknown-flat',
      { x: 1, y: 1 }
    )

    expect(setHexGraphic).toHaveBeenCalledOnce()
    expect(setHexGraphic.mock.calls[0][0]).toEqual({ x: 2, y: 2 })
  })

  it('unsubscribes from the previous world before selecting another', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)

    const previous = fake.subscriptions[0]

    controller.selectWorld(WORLD_B)

    expect(previous.unsubscribe).toHaveBeenCalledOnce()
    expect(previous.active).toBe(false)
    expect(fake.subscriptions[1].worldId).toBe(WORLD_B)
    expect(fake.subscriptions[1].active).toBe(true)
  })

  it('does not render updates from an unsubscribed world', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)
    controller.selectWorld(WORLD_B)

    fake.emit(0, [
      { x: 1, y: 1, terrain: 'grass', relief: 'flat' }
    ])

    expect(setHexGraphic).not.toHaveBeenCalled()

    fake.emit(1, [
      { x: 2, y: 2, terrain: 'desert', relief: 'flat' }
    ])

    expect(setHexGraphic).toHaveBeenCalledOnce()
    expect(setHexGraphic.mock.calls[0][0]).toEqual({ x: 2, y: 2 })
  })

  it('unsubscribes when stopped', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)
    controller.stop()

    expect(fake.subscriptions[0].unsubscribe).toHaveBeenCalledOnce()
    expect(fake.subscriptions[0].active).toBe(false)
  })

  it('can be stopped repeatedly without duplicate unsubscriptions', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)

    controller.stop()
    controller.stop()
    controller.stop()

    expect(fake.subscriptions[0].unsubscribe).toHaveBeenCalledOnce()
  })

  it('can stop before any world is selected', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    expect(() => controller.stop()).not.toThrow()
    expect(fake.onUpdate).not.toHaveBeenCalled()
  })

  it('can subscribe again after stopping', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    controller.selectWorld(WORLD_A)
    controller.stop()
    controller.selectWorld(WORLD_B)

    expect(fake.onUpdate).toHaveBeenCalledTimes(2)
    expect(fake.subscriptions[0].active).toBe(false)
    expect(fake.subscriptions[1].active).toBe(true)
  })

  it('reports subscription errors', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const error = new Error('Connection failed')

    controller.selectWorld(WORLD_A)
    fake.subscriptions[0].onError(error)

    expect(errorSpy).toHaveBeenCalledWith(
      'World map subscription failed:',
      error
    )
  })
})

describe('WorldMapController — encapsulation', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('does not expose its private fields as ordinary properties', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    for (const name of ['client', 'mapGrid', 'unsubscribe']) {
      expect(Object.hasOwn(controller, name)).toBe(false)
      expect(Reflect.get(controller, name)).toBeUndefined()
      expect(Reflect.get(controller, `#${name}`)).toBeUndefined()
    }
  })

  it('keeps selectWorld and stop as public methods', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    expect(typeof controller.selectWorld).toBe('function')
    expect(typeof controller.stop).toBe('function')

    expect(Object.hasOwn(controller, 'selectWorld')).toBe(false)
    expect(Object.hasOwn(controller, 'stop')).toBe(false)

    expect(Object.getPrototypeOf(controller)).toBe(
      WorldMapController.prototype
    )
  })

  it('protects its client and map against shadow properties', () => {
    const fake = createFakeClient()
    const { mapGrid, setHexGraphic } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)

    const fakeOnUpdate = vi.fn()
    const fakeSetHexGraphic = vi.fn()

    Object.defineProperty(controller, 'client', {
      value: { onUpdate: fakeOnUpdate },
      configurable: true
    })

    Object.defineProperty(controller, 'mapGrid', {
      value: { setHexGraphic: fakeSetHexGraphic },
      configurable: true
    })

    controller.selectWorld(WORLD_A)

    expect(fake.onUpdate).toHaveBeenCalledOnce()
    expect(fakeOnUpdate).not.toHaveBeenCalled()

    fake.emit(0, [
      { x: 2, y: 3, terrain: 'grass', relief: 'flat' }
    ])

    expect(setHexGraphic).toHaveBeenCalledOnce()
    expect(fakeSetHexGraphic).not.toHaveBeenCalled()
  })

  it('protects subscription cleanup against shadow properties', () => {
    const fake = createFakeClient()
    const { mapGrid } = createFakeMapGrid()
    const controller = new WorldMapController(fake.client, mapGrid)
    const fakeUnsubscribe = vi.fn()

    controller.selectWorld(WORLD_A)

    Object.defineProperty(controller, 'unsubscribe', {
      value: fakeUnsubscribe,
      writable: true,
      configurable: true
    })

    controller.stop()

    expect(fake.subscriptions[0].unsubscribe).toHaveBeenCalledOnce()
    expect(fake.subscriptions[0].active).toBe(false)
    expect(fakeUnsubscribe).not.toHaveBeenCalled()

    controller.stop()

    expect(fake.subscriptions[0].unsubscribe).toHaveBeenCalledOnce()
  })
})