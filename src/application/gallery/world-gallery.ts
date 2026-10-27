import type { Id } from '../../../convex/_generated/dataModel.ts'

export interface GalleryWorld {
  _id: Id<'worlds'>
  number: number
  name: string
  fantasyName: string | null
}

export class WorldGallery {
  readonly element: HTMLElement

  readonly #cards: HTMLElement
  readonly #onSelectWorld: (worldId: Id<'worlds'>) => void

  constructor(onSelectWorld: (worldId: Id<'worlds'>) => void) {
    this.#onSelectWorld = onSelectWorld

    const section = document.createElement('section')
    section.className = 'world-gallery'
    section.setAttribute('aria-label', 'Map Gallery')

    const layout = document.createElement('div')
    layout.className = 'world-gallery__layout'

    const welcome = document.createElement('aside')
    welcome.className = 'world-gallery__left-panel'

    const welcomeTitle = document.createElement('h2')
    welcomeTitle.textContent = 'Welcome to Civilization of Wonders'

    const welcomeText = document.createElement('p')
    welcomeText.textContent =
      'Explore twelve living worlds and watch their landscapes evolve in real time.'

    welcome.append(welcomeTitle, welcomeText)

    const center = document.createElement('div')
    center.className = 'world-gallery__center'

    const heading = document.createElement('h1')
    heading.textContent = 'Map Gallery'

    const description = document.createElement('p')
    description.textContent = 'Choose a world to explore.'

    this.#cards = document.createElement('div')
    this.#cards.className = 'world-gallery__grid'

    center.append(heading, description, this.#cards)

    const information = document.createElement('aside')
    information.className = 'world-gallery__right-panel'

    const informationTitle = document.createElement('h2')
    informationTitle.textContent = 'Discover the Worlds'

    const informationText = document.createElement('p')
    informationText.textContent =
      'Each world is created by an editor. Visitors can explore the maps and see changes as they happen.'

    information.append(informationTitle, informationText)

    layout.append(welcome, center, information)
    section.append(layout)

    this.element = section
  }

  setWorlds(worlds: readonly GalleryWorld[]): void {
    this.#cards.replaceChildren()

    const sortedWorlds = [...worlds].sort(
      (first, second) => first.number - second.number
    )

    for (const world of sortedWorlds) {
      this.#cards.append(this.#createWorldCard(world))
    }
  }

  #createWorldCard(world: GalleryWorld): HTMLButtonElement {
    const card = document.createElement('button')
    card.type = 'button'
    card.className = 'world-gallery__card'

    const title = document.createElement('span')
    title.className = 'world-gallery__title'
    title.textContent = 'Unedited Map'

    const editor = document.createElement('span')
    editor.className = 'world-gallery__editor'
    editor.textContent = world.fantasyName ?? 'Unassigned'

    card.append(title, editor)

    card.addEventListener('click', () => {
      this.#onSelectWorld(world._id)
    })

    return card
  }
}