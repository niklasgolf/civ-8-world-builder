
import { describe, expect, it, vi } from 'vitest'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../src/application/database/convex-client.ts'
import type { EditorLayout } from '../src/application/editor/editor-layout.ts'
import type { Header } from '../src/application/editor/header.ts'
import type { WorldGallery } from '../src/application/gallery/world-gallery.ts'
import type { WorldMapController } from '../src/application/map/world-map-controller.ts'
import { ApplicationState } from '../src/main/application-state.ts'
import type { AssignedEditor } from '../src/main/assigned-editor.ts'
import type { EditingSessionController } from '../src/main/editing-session.ts'
import type { Navigation } from '../src/main/navigation.ts'
import { WorldSelection } from '../src/main/world-selection.ts'

const world1 = 'world_1' as Id<'worlds'>
const world2 = 'world_2' as Id<'worlds'>

function createWorldSelection() {
  const query = vi.fn()
  const setWorlds = vi.fn()
  const setWorldInformation = vi.fn()
  const setWorldBuilderAvailable = vi.fn()
  const selectMapWorld = vi.fn()
  const subscribe = vi.fn()
  const showView = vi.fn()
  const refresh = vi.fn().mockResolvedValue(undefined)

  const convex = {
    client: { query },
  } as unknown as ConvexConnection

  const gallery = {
    setWorlds,
  } as unknown as WorldGallery

  const editorLayout = {
    setWorldInformation,
  } as unknown as EditorLayout

  const worldMapController = {
    selectWorld: selectMapWorld,
  } as unknown as WorldMapController

  const header = {
    setWorldBuilderAvailable,
  } as unknown as Header

  const state = new ApplicationState()

  const assignedEditor = {
    refresh,
  } as unknown as AssignedEditor

  const editingSession = {
    subscribe,
  } as unknown as EditingSessionController

  const navigation = {
    showView,
  } as unknown as Navigation

  const worldSelection = new WorldSelection(
    convex,
    gallery,
    editorLayout,
    worldMapController,
    header,
    state,
    assignedEditor,
    editingSession,
    navigation,
  )

  return {
    worldSelection,
    state,
    query,
    setWorlds,
    setWorldInformation,
    setWorldBuilderAvailable,
    selectMapWorld,
    subscribe,
    showView,
    refresh,
  }
}

describe('WorldSelection — existing behavior', () => {
  it('loads the worlds from Convex into state and gallery', async () => {
    const app = createWorldSelection()
    const worlds = [
      { _id: world1 },
      { _id: world2 },
    ]

    app.query.mockResolvedValue(worlds)

    await app.worldSelection.initializeGallery()

    expect(app.query).toHaveBeenCalledTimes(1)
    expect(app.state.getWorlds()).toEqual(worlds)
    expect(app.setWorlds).toHaveBeenCalledExactlyOnceWith(worlds)
  })

  it('selects a known world and coordinates the controllers', () => {
    const app = createWorldSelection()
    app.state.setWorlds([{ _id: world1 }] as Parameters<
      ApplicationState['setWorlds']
    >[0])

    app.worldSelection.selectWorld(world1)

    expect(app.state.getSelectedWorldId()).toBe(world1)
    expect(app.setWorldInformation)
      .toHaveBeenCalledExactlyOnceWith('Unedited Map', 'Loading...')
    expect(app.setWorldBuilderAvailable)
      .toHaveBeenCalledExactlyOnceWith(true)
    expect(app.selectMapWorld).toHaveBeenCalledExactlyOnceWith(world1)
    expect(app.subscribe).toHaveBeenCalledExactlyOnceWith(world1)
    expect(app.showView).toHaveBeenCalledExactlyOnceWith('world-builder')
    expect(app.refresh).toHaveBeenCalledExactlyOnceWith(world1)

    expect(app.setWorldInformation.mock.invocationCallOrder[0])
      .toBeLessThan(app.setWorldBuilderAvailable.mock.invocationCallOrder[0])
    expect(app.setWorldBuilderAvailable.mock.invocationCallOrder[0])
      .toBeLessThan(app.selectMapWorld.mock.invocationCallOrder[0])
    expect(app.selectMapWorld.mock.invocationCallOrder[0])
      .toBeLessThan(app.subscribe.mock.invocationCallOrder[0])
    expect(app.subscribe.mock.invocationCallOrder[0])
      .toBeLessThan(app.showView.mock.invocationCallOrder[0])
    expect(app.showView.mock.invocationCallOrder[0])
      .toBeLessThan(app.refresh.mock.invocationCallOrder[0])
  })

  it('does not select or navigate to an unknown world', () => {
    const app = createWorldSelection()
    const error: ReturnType<typeof vi.spyOn> = vi.spyOn(
      console,
      'error',
    ).mockImplementation(() => { })

    try {
      app.state.setWorlds([{ _id: world1 }] as Parameters<
        ApplicationState['setWorlds']
      >[0])

      app.worldSelection.selectWorld(world2)

      expect(app.state.getSelectedWorldId()).toBeNull()
      expect(app.setWorldInformation).not.toHaveBeenCalled()
      expect(app.setWorldBuilderAvailable).not.toHaveBeenCalled()
      expect(app.selectMapWorld).not.toHaveBeenCalled()
      expect(app.subscribe).not.toHaveBeenCalled()
      expect(app.showView).not.toHaveBeenCalled()
      expect(app.refresh).not.toHaveBeenCalled()
      expect(error).toHaveBeenCalledWith(
        'Selected world not found:',
        world2,
      )
    } finally {
      error.mockRestore()
    }
  })

  it('starts refreshing the assigned editor without waiting for it', () => {
    const app = createWorldSelection()
    app.state.setWorlds([{ _id: world1 }] as Parameters<
      ApplicationState['setWorlds']
    >[0])

    app.worldSelection.selectWorld(world1)

    expect(app.showView).toHaveBeenCalledWith('world-builder')
    expect(app.refresh).toHaveBeenCalledWith(world1)
  })
})

describe('WorldSelection — encapsulation', () => {
  it('does not expose its nine internal dependencies', () => {
    const { worldSelection } = createWorldSelection()
    const properties = Object.getOwnPropertyNames(worldSelection)

    for (const field of [
      'convex',
      'gallery',
      'editorLayout',
      'worldMapController',
      'header',
      'state',
      'assignedEditor',
      'editingSession',
      'navigation',
    ]) {
      expect(properties).not.toContain(field)
      expect(field in worldSelection).toBe(false)
    }
  })

  it('preserves its two public methods', () => {
    const { worldSelection } = createWorldSelection()

    expect(worldSelection.initializeGallery).toBeTypeOf('function')
    expect(worldSelection.selectWorld).toBeTypeOf('function')
  })
})
