
import { describe, expect, it } from 'vitest'
import { ApplicationState } from '../src/main/application-state.ts'
import type { FantasyIdentity, EditingSession } from '../src/main/application-state.ts'
import type { Id } from '../convex/_generated/dataModel.ts'

describe('ApplicationState — encapsulated behavior', () => {
  it('starts with no selected world', () => {
    const state = new ApplicationState()

    expect(state.getSelectedWorldId()).toBeNull()
  })

  it('selects a world', () => {
    const state = new ApplicationState()
    const worldId = 'world_1' as Id<'worlds'>

    state.selectWorld(worldId)

    expect(state.getSelectedWorldId()).toBe(worldId)
  })

  it('clears the selected world', () => {
    const state = new ApplicationState()

    state.selectWorld('world_1' as Id<'worlds'>)
    state.selectWorld(null)

    expect(state.getSelectedWorldId()).toBeNull()
  })

  it('starts with an empty world gallery', () => {
    const state = new ApplicationState()

    expect(state.getWorlds()).toEqual([])
  })

  it('stores the world gallery', () => {
    const state = new ApplicationState()
    const worlds = state.getWorlds()

    state.setWorlds(worlds)

    expect(state.getWorlds()).toBe(worlds)
  })

  it('starts with zero request counters', () => {
    const state = new ApplicationState()

    expect(state.getAuthenticationRequest()).toBe(0)
    expect(state.getAssignedEditorRequest()).toBe(0)
  })

  it('tracks authentication requests', () => {
    const state = new ApplicationState()

    expect(state.nextAuthenticationRequest()).toBe(1)
    expect(state.nextAuthenticationRequest()).toBe(2)

    expect(state.getAuthenticationRequest()).toBe(2)
  })

  it('tracks assigned editor requests', () => {
    const state = new ApplicationState()

    expect(state.nextAssignedEditorRequest()).toBe(1)

    expect(state.getAssignedEditorRequest()).toBe(1)
  })

  it('starts without a fantasy identity', () => {
    const state = new ApplicationState()

    expect(state.getCurrentIdentity()).toBeNull()
  })

  it('stores the current fantasy identity', () => {
    const state = new ApplicationState()
    const identity: FantasyIdentity = {
      authenticated: true,
      role: 'editor',
      fantasyName: 'Test Editor',
      worldId: 'world_1' as Id<'worlds'>,
    }

    state.setCurrentIdentity(identity)

    expect(state.getCurrentIdentity()).toBe(identity)
  })

  it('starts without an editing session', () => {
    const state = new ApplicationState()

    expect(state.getActiveSession()).toBeNull()
    expect(state.isSessionLoaded()).toBe(false)
  })

  it('stores an active editing session', () => {
    const state = new ApplicationState()
    const session: EditingSession = {
      worldId: 'world_1' as Id<'worlds'>,
      fantasyName: 'Test Editor',
      role: 'editor',
      startedAt: 123,
      isMine: true,
    }

    state.setActiveSession(session)
    state.setSessionLoaded(true)

    expect(state.getActiveSession()).toBe(session)
    expect(state.isSessionLoaded()).toBe(true)
  })

  it('tracks pending editing actions', () => {
    const state = new ApplicationState()

    expect(state.isEditingActionPending()).toBe(false)

    state.setEditingActionPending(true)

    expect(state.isEditingActionPending()).toBe(true)

    state.setEditingActionPending(false)

    expect(state.isEditingActionPending()).toBe(false)
  })

  it('stores and clears the editing session unsubscribe callback', () => {
    const state = new ApplicationState()
    const unsubscribe = () => { }

    expect(state.getEditingSessionUnsubscribe()).toBeNull()

    state.setEditingSessionUnsubscribe(unsubscribe)

    expect(state.getEditingSessionUnsubscribe()).toBe(unsubscribe)

    state.setEditingSessionUnsubscribe(null)

    expect(state.getEditingSessionUnsubscribe()).toBeNull()
  })

  it('keeps separate ApplicationState instances independent', () => {
    const first = new ApplicationState()
    const second = new ApplicationState()

    first.selectWorld('world_1' as Id<'worlds'>)
    first.nextAuthenticationRequest()

    expect(second.getSelectedWorldId()).toBeNull()
    expect(second.getAuthenticationRequest()).toBe(0)
  })

  it('does not expose internal state as public properties', () => {
    const state = new ApplicationState()

    const privateFields = [
      'selectedWorldId',
      'worlds',
      'authenticationRequest',
      'assignedEditorRequest',
      'currentIdentity',
      'activeSession',
      'sessionLoaded',
      'editingActionPending',
      'unsubscribeEditingSession',
    ]

    for (const field of privateFields) {
      expect(Object.hasOwn(state, field)).toBe(false)
    }
  })
})
