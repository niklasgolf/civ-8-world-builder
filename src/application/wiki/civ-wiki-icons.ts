
import { createIcon, type IconName } from '../../library-svg-graphics/icons/icons.ts'
import { iconsFor, iconTitle } from './catalog.ts'

export class CivWikiIcons {
  createGrid(names: readonly IconName[]): HTMLElement {
    const grid = document.createElement('div')
    grid.className = 'civ-wiki__grid'

    for (const name of names) {
      grid.append(this.createCard(name))
    }

    return grid
  }

  createTerrainIcons(): HTMLElement {
    const section = document.createElement('section')
    section.className = 'civ-wiki__icon-section'
    section.setAttribute('aria-labelledby', 'civ-wiki-terrain-icons')

    const heading = document.createElement('h3')
    heading.className = 'civ-wiki__subheading'
    heading.id = 'civ-wiki-terrain-icons'
    heading.textContent = 'Terrain toolbar icons'

    const note = document.createElement('p')
    note.className = 'civ-wiki__note'
    note.textContent =
      'These are the original 24 × 24 toolbar icons, not the full-sized terrain graphics above.'

    section.append(
      heading,
      note,
      this.createGrid(iconsFor('base-terrains')),
    )

    return section
  }

  private createCard(name: IconName): HTMLElement {
    const card = document.createElement('article')
    card.className = 'civ-wiki__card'

    const art = document.createElement('div')
    art.className = 'civ-wiki__card-art'

    const icon = createIcon(name)
    icon.classList.add('civ-wiki__icon')
    art.append(icon)

    const title = document.createElement('h3')
    title.className = 'civ-wiki__card-name'
    title.textContent = iconTitle(name)

    const identifier = document.createElement('p')
    identifier.className = 'civ-wiki__card-id'
    identifier.textContent = name

    card.append(art, title, identifier)
    return card
  }
}
