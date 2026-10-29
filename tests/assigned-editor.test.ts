
import { afterEach, describe, expect, it, vi } from 'vitest'
import { api } from '../convex/_generated/api.js'
import type { Id } from '../convex/_generated/dataModel.ts'
import type { ConvexConnection } from '../src/application/database/convex-client.ts'
import type { EditorLayout } from '../src/application/editor/editor-layout.ts'
import type { ApplicationState } from '../src/main/application-state.ts'
import { AssignedEditor } from '../src/main/assigned-editor.ts'

const world1 = 'world_1' as Id<'worlds'>
const world2 = 'world_2' as Id<'worlds'>

type TestState = {
  selectedWorldId: Id<'worlds'> | null
  assignedEditorRequest: number
}

type AssignedEditorResult = {
  fantasyName: string | null
} | null

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: Error) => void

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise
    reject = rejectPromise
  })

  return { promise, resolve, reject }
}

function createAssignedEditor() {
  const state: TestState = {
    selectedWorldId: world1,
    assignedEditorRequest: 0,
  }

  const query = vi.fn().mockResolvedValue({
    fantasyName: 'Test Editor',
  })

  const setEditorTitle = vi.fn()

  const convex = {
    client: { query },
  } as unknown as ConvexConnection

  const editorLayout = {
    rightPanel: { setEditorTitle },
  } as unknown as EditorLayout

  const assignedEditor = new AssignedEditor(
    convex,
    editorLayout,
    state as unknown as ApplicationState,
  )

  return {
    assignedEditor,
    state,
    query,
    setEditorTitle,
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('AssignedEditor — existing behavior', () => {
  it('queries the assigned editor for the requested world', async () => {
    const app = createAssignedEditor()

    await app.assignedEditor.refresh(world1)

    expect(app.query).toHaveBeenCalledExactlyOnceWith(
      api.worlds.getAssignedEditor,
      { worldId: world1 },
    )
  })

  it('displays the assigned editor fantasy name', async () => {
    const app = createAssignedEditor()

    app.query.mockResolvedValue({
      fantasyName: 'Forest Keeper',
    })

    await app.assignedEditor.refresh(world1)

    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'Forest Keeper',
    )
  })

  it('displays Unassigned when no editor is assigned', async () => {
    const app = createAssignedEditor()

    app.query.mockResolvedValue(null)

    await app.assignedEditor.refresh(world1)

    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'Unassigned',
    )
  })

  it('displays Unassigned when the fantasy name is null', async () => {
    const app = createAssignedEditor()

    app.query.mockResolvedValue({
      fantasyName: null,
    })

    await app.assignedEditor.refresh(world1)

    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'Unassigned',
    )
  })

  it('increments the request counter for each refresh', async () => {
    const app = createAssignedEditor()

    expect(app.state.assignedEditorRequest).toBe(0)

    await app.assignedEditor.refresh(world1)

    expect(app.state.assignedEditorRequest).toBe(1)

    await app.assignedEditor.refresh(world1)

    expect(app.state.assignedEditorRequest).toBe(2)
  })

  it('ignores a response when another world is selected', async () => {
    const app = createAssignedEditor()
    const request = deferred<AssignedEditorResult>()

    app.query.mockReturnValue(request.promise)

    const refresh = app.assignedEditor.refresh(world1)

    app.state.selectedWorldId = world2

    request.resolve({ fantasyName: 'Old World Editor' })
    await refresh

    expect(app.setEditorTitle).not.toHaveBeenCalled()
  })

  it('ignores an older response after a newer refresh', async () => {
    const app = createAssignedEditor()
    const first = deferred<AssignedEditorResult>()
    const second = deferred<AssignedEditorResult>()

    app.query
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)

    const firstRefresh = app.assignedEditor.refresh(world1)
    const secondRefresh = app.assignedEditor.refresh(world1)

    second.resolve({ fantasyName: 'New Editor' })
    await secondRefresh

    first.resolve({ fantasyName: 'Old Editor' })
    await firstRefresh

    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'New Editor',
    )
    expect(app.state.assignedEditorRequest).toBe(2)
  })

  it('displays Unassigned when the query fails', async () => {
    const app = createAssignedEditor()
    const consoleSpy = vi.spyOn(console, 'error')
      .mockImplementation(() => { })

    const error = new Error('Convex query failed')
    app.query.mockRejectedValue(error)

    await app.assignedEditor.refresh(world1)

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to load assigned editor:',
      error,
    )
    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'Unassigned',
    )
  })

  it('ignores a query error after switching worlds', async () => {
    const app = createAssignedEditor()
    const consoleSpy = vi.spyOn(console, 'error')
      .mockImplementation(() => { })
    const request = deferred<AssignedEditorResult>()

    app.query.mockReturnValue(request.promise)

    const refresh = app.assignedEditor.refresh(world1)

    app.state.selectedWorldId = world2

    request.reject(new Error('Old world query failed'))
    await refresh

    expect(consoleSpy).not.toHaveBeenCalled()
    expect(app.setEditorTitle).not.toHaveBeenCalled()
  })

  it('ignores an outdated query error after a newer refresh', async () => {
    const app = createAssignedEditor()
    const consoleSpy = vi.spyOn(console, 'error')
      .mockImplementation(() => { })
    const first = deferred<AssignedEditorResult>()
    const second = deferred<AssignedEditorResult>()

    app.query
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)

    const firstRefresh = app.assignedEditor.refresh(world1)
    const secondRefresh = app.assignedEditor.refresh(world1)

    second.resolve({ fantasyName: 'Current Editor' })
    await secondRefresh

    first.reject(new Error('Outdated query failed'))
    await firstRefresh

    expect(consoleSpy).not.toHaveBeenCalled()
    expect(app.setEditorTitle).toHaveBeenCalledExactlyOnceWith(
      'Current Editor',
    )
  })

  it('does not update the title when no world remains selected', async () => {
    const app = createAssignedEditor()
    const request = deferred<AssignedEditorResult>()

    app.query.mockReturnValue(request.promise)

    const refresh = app.assignedEditor.refresh(world1)

    app.state.selectedWorldId = null

    request.resolve({ fantasyName: 'Former Editor' })
    await refresh

    expect(app.setEditorTitle).not.toHaveBeenCalled()
  })
})

describe('AssignedEditor — encapsulation', () => {
  it('does not expose private constructor dependencies', () => {
    const { assignedEditor } = createAssignedEditor()

    expect('convex' in assignedEditor).toBe(false)
    expect('editorLayout' in assignedEditor).toBe(false)
    expect('state' in assignedEditor).toBe(false)
  })

  it('preserves refresh as the public interface', () => {
    const { assignedEditor } = createAssignedEditor()

    expect(assignedEditor.refresh).toBeTypeOf('function')
  })
})
