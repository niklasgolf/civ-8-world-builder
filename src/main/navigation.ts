
import type { AppView, Header } from '../application/editor/header.ts'
import type { WorldGallery } from '../application/gallery/world-gallery.ts'
import type { CivWiki } from '../application/wiki/civ-wiki.ts'
import type { VisitorsLayout } from '../application/visitors/visitors-layout.ts'
import type { ApplicationState } from './application-state.ts'

export class Navigation {
  private readonly header: Header
  private readonly gallery: WorldGallery
  private readonly worldBuilder: HTMLElement
  private readonly visitors: VisitorsLayout
  private readonly wiki: CivWiki
  private readonly state: ApplicationState

  constructor(
    header: Header,
    gallery: WorldGallery,
    worldBuilder: HTMLElement,
    visitors: VisitorsLayout,
    wiki: CivWiki,
    state: ApplicationState,
  ) {
    this.header = header
    this.gallery = gallery
    this.worldBuilder = worldBuilder
    this.visitors = visitors
    this.wiki = wiki
    this.state = state
  }

  public showView(view: AppView): void {
    if (view === 'world-builder' && this.state.selectedWorldId === null) {
      view = 'map-gallery'
    }

    this.gallery.element.classList.toggle(
      'is-active',
      view === 'map-gallery',
    )

    this.worldBuilder.classList.toggle(
      'is-active',
      view === 'world-builder',
    )

    this.visitors.element.classList.toggle(
      'is-active',
      view === 'visitors-login',
    )

    this.wiki.element.classList.toggle(
      'is-active',
      view === 'civ-wiki',
    )

    this.header.setView(view)
  }
}
