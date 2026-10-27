
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Id } from '../convex/_generated/dataModel.ts'
import {
  WorldGallery,
  type GalleryWorld
} from '../src/application/gallery/world-gallery.ts'

const createWorld = (
  number: number,
  fantasyName: string | null = null
): GalleryWorld => ({
  _id: `world-${number}` as Id<'worlds'>,
  number,
  name: `World ${number}`,
  fantasyName
})

describe('WorldGallery', () => {
  let gallery: WorldGallery
  let onSelectWorld: (worldId: Id<'worlds'>) => void

  beforeEach(() => {
    document.body.replaceChildren()
    onSelectWorld = vi.fn<(worldId: Id<'worlds'>) => void>()
    gallery = new WorldGallery(onSelectWorld)
    document.body.append(gallery.element)
  })

  const getCards = (): HTMLButtonElement[] =>
    Array.from(
      document.querySelectorAll<HTMLButtonElement>(
        '.world-gallery__card'
      )
    )

  it('creates a gallery section', () => {
    expect(gallery.element.tagName).toBe('SECTION')
    expect(gallery.element.className).toBe('world-gallery')
  })

  it('creates an accessible gallery section', () => {
    expect(gallery.element.getAttribute('aria-label')).toBe('Map Gallery')
  })

  it('displays the gallery heading', () => {
    expect(gallery.element.querySelector('h1')?.textContent).toBe('Map Gallery')
  })

  it('displays the welcome information', () => {
    expect(gallery.element.textContent).toContain(
      'Welcome to Civilization of Wonders'
    )
  })

  it('displays the information panel', () => {
    expect(gallery.element.textContent).toContain('Discover the Worlds')
  })

  it('initially creates an empty world grid', () => {
    expect(getCards()).toHaveLength(0)
  })

  it('creates one card for each world', () => {
    gallery.setWorlds([createWorld(1), createWorld(2), createWorld(3)])

    expect(getCards()).toHaveLength(3)
  })

  it('creates world cards as buttons', () => {
    gallery.setWorlds([createWorld(1)])

    expect(getCards()[0].tagName).toBe('BUTTON')
    expect(getCards()[0].type).toBe('button')
  })

  it('sorts worlds by their number', () => {
    gallery.setWorlds([
      createWorld(3, 'Third'),
      createWorld(1, 'First'),
      createWorld(2, 'Second')
    ])

    const names = getCards().map(card =>
      card.querySelector('.world-gallery__editor')?.textContent
    )

    expect(names).toEqual(['First', 'Second', 'Third'])
  })

  it('does not modify the original world array', () => {
    const worlds = [
      createWorld(3),
      createWorld(1),
      createWorld(2)
    ]

    gallery.setWorlds(worlds)

    expect(worlds.map(world => world.number)).toEqual([3, 1, 2])
  })

  it('displays the fantasy name of each world', () => {
    gallery.setWorlds([createWorld(1, 'Avaloria')])

    expect(getCards()[0].textContent).toContain('Avaloria')
  })

  it('displays Unassigned when the fantasy name is null', () => {
    gallery.setWorlds([createWorld(1)])

    expect(getCards()[0].textContent).toContain('Unassigned')
  })

  it('displays the existing default map title', () => {
    gallery.setWorlds([createWorld(1)])

    expect(
      getCards()[0].querySelector('.world-gallery__title')?.textContent
    ).toBe('Unedited Map')
  })

  it('invokes the callback with the selected world ID', () => {
    const world = createWorld(5, 'Eldoria')

    gallery.setWorlds([world])
    getCards()[0].click()

    expect(onSelectWorld).toHaveBeenCalledExactlyOnceWith(world._id)
  })

  it('selects the correct world after sorting', () => {
    const first = createWorld(1, 'First')
    const second = createWorld(2, 'Second')

    gallery.setWorlds([second, first])
    getCards()[0].click()

    expect(onSelectWorld).toHaveBeenCalledExactlyOnceWith(first._id)
  })

  it('replaces existing cards when worlds are updated', () => {
    gallery.setWorlds([createWorld(1), createWorld(2)])
    gallery.setWorlds([createWorld(3)])

    expect(getCards()).toHaveLength(1)
  })

  it('removes all cards when given an empty list', () => {
    gallery.setWorlds([createWorld(1)])
    gallery.setWorlds([])

    expect(getCards()).toHaveLength(0)
  })

  it('creates independent gallery elements', () => {
    const anotherGallery = new WorldGallery(vi.fn())

    expect(anotherGallery.element).not.toBe(gallery.element)
  })

  it('does not expose internal fields at runtime', () => {
    expect(Object.hasOwn(gallery, 'cards')).toBe(false)
    expect(Object.hasOwn(gallery, 'onSelectWorld')).toBe(false)
  })

  it('does not expose private building methods at runtime', () => {
    expect('createWorldCard' in gallery).toBe(false)
  })

  it('does not expose private methods through the prototype', () => {
    expect(
      Object.getOwnPropertyNames(WorldGallery.prototype)
    ).not.toContain('createWorldCard')
  })

  it('protects private state from public property shadowing', () => {
    const world = createWorld(1, 'Avaloria')

    Object.assign(gallery, {
      cards: document.createElement('div'),
      onSelectWorld: vi.fn(),
      createWorldCard: vi.fn()
    })

    gallery.setWorlds([world])
    getCards()[0].click()

    expect(getCards()).toHaveLength(1)
    expect(onSelectWorld).toHaveBeenCalledExactlyOnceWith(world._id)
  })
})
