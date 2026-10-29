
import { describe, expect, it, vi } from 'vitest'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { EditorLayout } from '../src/application/editor/editor-layout.ts'
import { ApplicationState } from '../src/main/application-state.ts'
import type { FantasyIdentity, EditingSession } from '../src/main/application-state.ts'
import { EditingControls } from '../src/main/editing-controls.ts'

type Role = 'visitor' | 'editor' | 'admin'

const world1 = 'world_1' as Id<'worlds'>
const world2 = 'world_2' as Id<'worlds'>

function createControls() {
  const state = new ApplicationState()

  state.selectWorld(world1)
  state.setSessionLoaded(true)

  const panel = {
    setEditingStatus: vi.fn(),
    setEditing: vi.fn(),
    setEditButtonVisible: vi.fn(),
    setTakeoverButtonVisible: vi.fn(),
    setEditingButtonsDisabled: vi.fn(),
  }

  const editorLayout = {
    rightPanel: panel,
  } as unknown as EditorLayout

  const controls = new EditingControls(
    editorLayout,
    state,
  )

  return { controls, state, panel }
}

function identity(
  role: Role,
  worldId: Id<'worlds'> | null = null,
): FantasyIdentity {
  return {
    authenticated: true,
    role,
    fantasyName: 'Test User',
    worldId,
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

describe('EditingControls — permissions', () => {
  it('prevents unauthenticated visitors from editing', () => {
    const { controls } = createControls()

    expect(controls.canEditSelectedWorld()).toBe(false)
  })

  it('prevents signed-in visitors from editing', () => {
    const { controls, state } = createControls()

    state.setCurrentIdentity(identity('visitor'))

    expect(controls.canEditSelectedWorld()).toBe(false)
  })

  it('allows editors to edit their assigned world', () => {
    const { controls, state } = createControls()

    state.setCurrentIdentity(identity('editor', world1))

    expect(controls.canEditSelectedWorld()).toBe(true)
  })

  it('prevents editors from editing other worlds', () => {
    const { controls, state } = createControls()

    state.setCurrentIdentity(identity('editor', world2))

    expect(controls.canEditSelectedWorld()).toBe(false)
  })

  it('allows administrators to edit any selected world', () => {
    const { controls, state } = createControls()

    state.setCurrentIdentity(identity('admin'))

    expect(controls.canEditSelectedWorld()).toBe(true)
  })

  it('prevents editing when no world is selected', () => {
    const { controls, state } = createControls()

    state.setCurrentIdentity(identity('admin'))
    state.selectWorld(null)

    expect(controls.canEditSelectedWorld()).toBe(false)
  })
})

describe('EditingControls — session ownership', () => {
  it('reports false when no editing session exists', () => {
    const { controls } = createControls()

    expect(controls.isCurrentEditor()).toBe(false)
  })

  it('recognizes the current session owner', () => {
    const { controls, state } = createControls()

    state.setActiveSession(session('Test Editor', true))

    expect(controls.isCurrentEditor()).toBe(true)
  })

  it('recognizes a session owned by someone else', () => {
    const { controls, state } = createControls()

    state.setActiveSession(session('Other Editor', false))

    expect(controls.isCurrentEditor()).toBe(false)
  })
})

describe('EditingControls — button states', () => {
  it('shows loading status before session data arrives', () => {
    const { controls, state, panel } = createControls()

    state.setSessionLoaded(false)
    controls.update()

    expect(panel.setEditingStatus).toHaveBeenCalledWith('Loading status...')
    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(false)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(false)
  })

  it('shows viewing mode without an active session', () => {
    const { controls, panel } = createControls()

    controls.update()

    expect(panel.setEditingStatus).toHaveBeenCalledWith('Viewing mode')
    expect(panel.setEditing).toHaveBeenCalledWith(false)
  })

  it('shows Edit for an eligible editor without an active session', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('editor', world1))
    controls.update()

    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(true)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(false)
  })

  it('hides Edit from visitors', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('visitor'))
    controls.update()

    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(false)
  })

  it('shows the editing session owner', () => {
    const { controls, state, panel } = createControls()

    state.setActiveSession(session('World Builder', false))
    controls.update()

    expect(panel.setEditingStatus).toHaveBeenCalledWith(
      'Editing: World Builder',
    )
  })

  it('shows Stop Editing for the current authorized editor', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('editor', world1))
    state.setActiveSession(session('Test Editor', true))

    controls.update()

    expect(panel.setEditing).toHaveBeenCalledWith(true)
    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(true)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(false)
  })

  it('hides Edit when someone else owns the session', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('editor', world1))
    state.setActiveSession(session('Other Editor', false))

    controls.update()

    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(false)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(false)
  })

  it('shows Take Over to an administrator when another editor owns the session', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('admin'))
    state.setActiveSession(session('Other Editor', false))

    controls.update()

    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(false)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(true)
  })

  it('hides Take Over when the administrator owns the session', () => {
    const { controls, state, panel } = createControls()

    state.setCurrentIdentity(identity('admin'))
    state.setActiveSession(session('Administrator', true))

    controls.update()

    expect(panel.setEditButtonVisible).toHaveBeenCalledWith(true)
    expect(panel.setTakeoverButtonVisible).toHaveBeenCalledWith(false)
  })

  it('disables editing buttons while an action is pending', () => {
    const { controls, state, panel } = createControls()

    state.setEditingActionPending(true)
    controls.update()

    expect(panel.setEditingButtonsDisabled).toHaveBeenCalledWith(true)
  })
})

describe('EditingControls — encapsulation', () => {
  it('does not expose private constructor dependencies', () => {
    const { controls } = createControls()

    expect('editorLayout' in controls).toBe(false)
    expect('state' in controls).toBe(false)
  })

  it('preserves the public methods', () => {
    const { controls } = createControls()

    expect(controls.isCurrentEditor).toBeTypeOf('function')
    expect(controls.canEditSelectedWorld).toBeTypeOf('function')
    expect(controls.update).toBeTypeOf('function')
  })
})
