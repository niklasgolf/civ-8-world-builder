
import { afterEach, describe, expect, it, vi } from 'vitest'
import { api } from '../convex/_generated/api.js'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../src/application/database/convex-client.ts'
import { ApplicationState } from '../src/main/application-state.ts'
import type { EditingSession, FantasyIdentity } from '../src/main/application-state.ts'
import type { EditingControls } from '../src/main/editing-controls.ts'
import { EditingSessionController } from '../src/main/editing-session.ts'

const world1 = 'world_1' as Id<'worlds'>
const world2 = 'world_2' as Id<'worlds'>

type Role = 'visitor' | 'editor' | 'admin'

type SessionCallback = (session: EditingSession | null) => void
type ErrorCallback = (error: Error) => void

function identity(role: Role): FantasyIdentity {
  return {
    authenticated: true,
    role,
    fantasyName: 'Test User',
    worldId: role === 'editor' ? world1 : null,
  }
}

function session(
  fantasyName: string,
  isMine: boolean,
): EditingSession {
  return {
    worldId: world1,
    fantasyName,
    role: 'editor',
    startedAt: 123,
    isMine,
  }
}

function createController() {
  const state = new ApplicationState()

  state.selectWorld(world1)
  state.setCurrentIdentity(identity('editor'))
  state.setSessionLoaded(true)

  const mutation = vi.fn().mockResolvedValue(undefined)
  const unsubscribe = vi.fn()

  let onSession: SessionCallback = () => { }
  let onError: ErrorCallback = () => { }

  const onUpdate = vi.fn((
    _query: unknown,
    _args: unknown,
    callback: SessionCallback,
    errorCallback: ErrorCallback,
  ) => {
    onSession = callback
    onError = errorCallback
    return unsubscribe
  })

  const convex = {
    client: {
      mutation,
      onUpdate,
    },
  } as unknown as ConvexConnection

  const update = vi.fn()
  const canEditSelectedWorld = vi.fn().mockReturnValue(true)
  const isCurrentEditor = vi.fn().mockReturnValue(false)

  const controls = {
    update,
    canEditSelectedWorld,
    isCurrentEditor,
  } as unknown as EditingControls

  const controller = new EditingSessionController(
    convex,
    state,
    controls,
  )

  return {
    controller,
    state,
    mutation,
    onUpdate,
    unsubscribe,
    update,
    canEditSelectedWorld,
    isCurrentEditor,
    emitSession: (activeSession: EditingSession | null) => {
      onSession(activeSession)
    },
    emitError: (error: Error) => {
      onError(error)
    },
  }
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('EditingSessionController — subscriptions', () => {
  it('subscribes to the selected world', () => {
    const app = createController()

    app.controller.subscribe(world1)

    expect(app.onUpdate).toHaveBeenCalledWith(
      api.editingSessions.getActiveSession,
      { worldId: world1 },
      expect.any(Function),
      expect.any(Function),
    )
  })

  it('clears the previous session when subscribing', () => {
    const app = createController()

    app.state.setActiveSession(session('Previous Editor', true))

    app.controller.subscribe(world1)

    expect(app.state.getActiveSession()).toBeNull()
    expect(app.state.isSessionLoaded()).toBe(false)
    expect(app.update).toHaveBeenCalled()
  })

  it('unsubscribes from the previous subscription', () => {
    const app = createController()
    const previousUnsubscribe = vi.fn()

    app.state.setEditingSessionUnsubscribe(previousUnsubscribe)

    app.controller.subscribe(world1)

    expect(previousUnsubscribe).toHaveBeenCalledOnce()
    expect(app.state.getEditingSessionUnsubscribe()).toBe(app.unsubscribe)
  })

  it('updates the active session when Convex sends data', () => {
    const app = createController()
    const activeSession = session('World Builder', false)

    app.controller.subscribe(world1)
    app.emitSession(activeSession)

    expect(app.state.getActiveSession()).toEqual(activeSession)
    expect(app.state.isSessionLoaded()).toBe(true)
    expect(app.update).toHaveBeenCalledTimes(2)
  })

  it('ignores session data for a world that is no longer selected', () => {
    const app = createController()

    app.controller.subscribe(world1)
    app.state.selectWorld(world2)

    app.emitSession(session('Old World Editor', false))

    expect(app.state.getActiveSession()).toBeNull()
    expect(app.state.isSessionLoaded()).toBe(false)
    expect(app.update).toHaveBeenCalledOnce()
  })

  it('resets session state when the subscription fails', () => {
    const app = createController()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    app.controller.subscribe(world1)
    app.emitError(new Error('Connection failed'))

    expect(app.state.getActiveSession()).toBeNull()
    expect(app.state.isSessionLoaded()).toBe(false)
    expect(consoleSpy).toHaveBeenCalledOnce()
  })

  it('ignores subscription errors for a different selected world', () => {
    const app = createController()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    app.controller.subscribe(world1)
    app.state.selectWorld(world2)

    app.emitError(new Error('Old subscription failed'))

    expect(consoleSpy).not.toHaveBeenCalled()
    expect(app.update).toHaveBeenCalledOnce()
  })
})

describe('EditingSessionController — Edit and Stop Editing', () => {
  it('starts editing when the authorized editor clicks Edit', async () => {
    const app = createController()

    await app.controller.handleEditAction()

    expect(app.mutation).toHaveBeenCalledExactlyOnceWith(
      api.editingSessions.startEditing,
      { worldId: world1 },
    )
    expect(app.state.isEditingActionPending()).toBe(false)
  })

  it('stops editing when the current editor clicks Stop Editing', async () => {
    const app = createController()

    app.state.setActiveSession(session('Current Editor', true))
    app.isCurrentEditor.mockReturnValue(true)

    await app.controller.handleEditAction()

    expect(app.mutation).toHaveBeenCalledExactlyOnceWith(
      api.editingSessions.stopEditing,
      { worldId: world1 },
    )
  })

  it('prevents editing when the user lacks permission', async () => {
    const app = createController()

    app.canEditSelectedWorld.mockReturnValue(false)

    await app.controller.handleEditAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents editing before the session has loaded', async () => {
    const app = createController()

    app.state.setSessionLoaded(false)

    await app.controller.handleEditAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents editing when no world is selected', async () => {
    const app = createController()

    app.state.selectWorld(null)

    await app.controller.handleEditAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents starting a session when another editor is active', async () => {
    const app = createController()

    app.state.setActiveSession(session('Other Editor', false))

    await app.controller.handleEditAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents a second editing action while one is pending', async () => {
    const app = createController()

    app.state.setEditingActionPending(true)

    await app.controller.handleEditAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('sets and clears the pending flag around a mutation', async () => {
    const app = createController()

    let finishMutation: (() => void) | undefined

    app.mutation.mockImplementation(() => new Promise<void>((resolve) => {
      finishMutation = resolve
    }))

    const action = app.controller.handleEditAction()

    expect(app.state.isEditingActionPending()).toBe(true)
    expect(app.update).toHaveBeenCalledOnce()

    expect(finishMutation).toBeDefined()
    finishMutation?.()

    await action

    expect(app.state.isEditingActionPending()).toBe(false)
    expect(app.update).toHaveBeenCalledTimes(2)
  })

  it('clears the pending flag after a failed mutation', async () => {
    const app = createController()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const alertMock = vi.fn()

    vi.stubGlobal('alert', alertMock)

    app.mutation.mockRejectedValue(new Error('Editing failed'))

    await app.controller.handleEditAction()

    expect(app.state.isEditingActionPending()).toBe(false)
    expect(consoleSpy).toHaveBeenCalledOnce()
    expect(alertMock).toHaveBeenCalledWith('Editing failed')
  })
})

describe('EditingSessionController — Take Over', () => {
  it('allows an administrator to take over another editor session', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('admin'))
    app.state.setActiveSession(session('Other Editor', false))

    await app.controller.handleTakeoverAction()

    expect(app.mutation).toHaveBeenCalledExactlyOnceWith(
      api.editingSessions.startEditing,
      {
        worldId: world1,
        takeover: true,
      },
    )
    expect(app.state.isEditingActionPending()).toBe(false)
  })

  it('prevents editors from taking over', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('editor'))
    app.state.setActiveSession(session('Other Editor', false))

    await app.controller.handleTakeoverAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents visitors from taking over', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('visitor'))
    app.state.setActiveSession(session('Other Editor', false))

    await app.controller.handleTakeoverAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents takeover without an active session', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('admin'))

    await app.controller.handleTakeoverAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents takeover of the administrator own session', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('admin'))
    app.state.setActiveSession(session('Administrator', true))
    app.isCurrentEditor.mockReturnValue(true)

    await app.controller.handleTakeoverAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('prevents takeover while another action is pending', async () => {
    const app = createController()

    app.state.setCurrentIdentity(identity('admin'))
    app.state.setActiveSession(session('Other Editor', false))
    app.state.setEditingActionPending(true)

    await app.controller.handleTakeoverAction()

    expect(app.mutation).not.toHaveBeenCalled()
  })

  it('clears the pending flag after a failed takeover', async () => {
    const app = createController()
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    const alertMock = vi.fn()

    vi.stubGlobal('alert', alertMock)

    app.state.setCurrentIdentity(identity('admin'))
    app.state.setActiveSession(session('Other Editor', false))
    app.mutation.mockRejectedValue(new Error('Takeover failed'))

    await app.controller.handleTakeoverAction()

    expect(app.state.isEditingActionPending()).toBe(false)
    expect(consoleSpy).toHaveBeenCalledOnce()
    expect(alertMock).toHaveBeenCalledWith('Takeover failed')
  })
})

describe('EditingSessionController — encapsulation', () => {
  it('does not expose private constructor dependencies', () => {
    const { controller } = createController()

    expect('convex' in controller).toBe(false)
    expect('state' in controller).toBe(false)
    expect('controls' in controller).toBe(false)
  })

  it('preserves the public methods', () => {
    const { controller } = createController()

    expect(controller.subscribe).toBeTypeOf('function')
    expect(controller.handleEditAction).toBeTypeOf('function')
    expect(controller.handleTakeoverAction).toBeTypeOf('function')
  })
})
