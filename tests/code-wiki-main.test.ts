import { beforeEach, describe, expect, it } from 'vitest'
import { CodeWikiMain } from '../src/application/codewiki/code-wiki-main.ts'
import { codeWikiDocument } from '../src/application/codewiki/documentation-data.ts'
import { codeWikiStats } from '../src/application/codewiki/documentation.ts'

describe('CodeWikiMain', () => {
  let wiki: CodeWikiMain

  const fileButtons = (): HTMLButtonElement[] =>
    Array.from(wiki.element.querySelectorAll<HTMLButtonElement>('.code-wiki__file'))

  const content = (): HTMLElement => {
    const element = wiki.element.querySelector<HTMLElement>('.civ-wiki__content')
    if (!element) throw new Error('Missing Code Wiki content')
    return element
  }

  const navigation = (): HTMLElement => {
    const element = wiki.element.querySelector<HTMLElement>('nav')
    if (!element) throw new Error('Missing Code Wiki navigation')
    return element
  }

  beforeEach(() => {
    document.body.innerHTML = ''
    history.replaceState(null, '', '/')
    wiki = new CodeWikiMain()
    document.body.append(wiki.element)
  })

  it('creates the code wiki shell without replacing CoW Wiki styling hooks', () => {
    expect(wiki.element.classList.contains('civ-wiki')).toBe(true)
    expect(wiki.element.classList.contains('code-wiki')).toBe(true)
    expect(wiki.element.querySelector('h1')?.textContent).toBe(
      'Civilization of Wonders Code Wiki',
    )
    expect(wiki.element.querySelector('.civ-wiki__subtitle')?.textContent).toBe(
      'Application architecture and function reference',
    )
  })

  it('shows calculated documentation counts on the home page', () => {
    const stats = codeWikiStats()
    const text = content().textContent ?? ''

    expect(text).toContain('Welcome to Code Wiki')
    expect(text).toContain('documents the Civilization of Wonders source code')
    expect(text).toContain(String(stats.files))
    expect(text).toContain(String(stats.functions))
    expect(text).toContain(String(stats.directories))
  })

  it('keeps the whole documented tree expanded', () => {
    expect(fileButtons()).toHaveLength(codeWikiDocument.files.length)
    expect(wiki.element.querySelector('[aria-expanded]')).toBeNull()
    expect(wiki.element.querySelectorAll('.code-wiki__folder').length).toBeGreaterThan(0)

    const labels = fileButtons().map((button) => button.dataset.page)
    expect(labels).toContain('src/main/navigation.ts')
    expect(labels).toContain('convex/hexes.ts')
    expect(labels).toContain('scripts/initialize-world.mjs')
  })

  it('opens a source file and preserves the sidebar element and scroll position', () => {
    const sidebar = navigation()
    sidebar.scrollTop = 140

    const button = fileButtons().find(
      (candidate) => candidate.dataset.page === 'src/main/application-state.ts',
    )
    button?.click()

    expect(navigation()).toBe(sidebar)
    expect(sidebar.scrollTop).toBe(140)
    expect(content().textContent).toContain('application-state.ts')
    expect(content().textContent).toContain('src/main/application-state.ts')
    expect(content().textContent).toContain('ApplicationState.getSelectedWorldId()')
    expect(content().textContent).toContain('Line 33')
    expect(content().textContent).toContain(
      'Returnerar ID för den värld som användaren för närvarande har valt.',
    )
    expect(button?.classList.contains('is-selected')).toBe(true)
    expect(button?.getAttribute('aria-pressed')).toBe('true')
  })

  it('returns the documentation panel to the top when another file is selected', () => {
    fileButtons().find(
      (button) => button.dataset.page === 'src/main/navigation.ts',
    )?.click()

    content().scrollTop = 240

    fileButtons().find(
      (button) => button.dataset.page === 'convex/worlds.ts',
    )?.click()

    expect(content().scrollTop).toBe(0)
    expect(content().textContent).toContain('worlds.ts')
    expect(content().querySelector('[data-anchor="showView"]')).toBeNull()
  })

  it('scrolls to a function heading from a deep link', () => {
    wiki.showTarget({
      path: 'scripts/initialize-world.mjs',
      anchor: 'waitForWorld',
    })

    const heading = content().querySelector<HTMLElement>(
      '[data-anchor="waitForWorld"]',
    )

    expect(heading).not.toBeNull()
    expect(heading?.querySelector('h3')?.textContent).toContain('waitForWorld()')
    expect(heading?.querySelector('a')?.getAttribute('href')).toBe(
      '#code-wiki/scripts/initialize-world.mjs/waitForWorld',
    )
    expect(
      navigation().querySelector<HTMLButtonElement>(
        '[data-page="scripts/initialize-world.mjs"]',
      )?.classList.contains('is-selected'),
    ).toBe(true)
  })

  it('gives every function on a page its own heading and anchor', () => {
    const file = codeWikiDocument.files.find(
      (entry) => entry.path === 'src/application/map/map-grid.ts',
    )
    if (!file) throw new Error('Missing map-grid documentation')

    wiki.showTarget({ path: file.path, anchor: null })

    const sections = content().querySelectorAll<HTMLElement>('.code-wiki__function')
    const functions = file.blocks.filter((block) => block.kind === 'function')

    expect(sections).toHaveLength(functions.length)

    const ids = new Set<string>()
    sections.forEach((section, index) => {
      const id = section.querySelector('h3')?.id ?? ''
      expect(id).not.toBe('')
      expect(ids.has(id)).toBe(false)
      ids.add(id)
      expect(section.dataset.anchor).toBe(
        functions[index]?.kind === 'function' ? functions[index].anchor : '',
      )
    })
  })
})
