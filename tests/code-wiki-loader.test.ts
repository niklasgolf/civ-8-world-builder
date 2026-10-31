import { beforeEach, describe, expect, it } from 'vitest'
import { CodeWiki } from '../src/application/codewiki/code-wiki.ts'

describe('CodeWiki loader', () => {
  let wiki: CodeWiki

  beforeEach(() => {
    document.body.innerHTML = ''
    history.replaceState(null, '', '/')
    wiki = new CodeWiki()
    document.body.append(wiki.element)
  })

  it('keeps the documentation out of the initial view', () => {
    expect(wiki.element.classList.contains('code-wiki')).toBe(true)
    expect(wiki.element.querySelector('.code-wiki__file')).toBeNull()
    expect(wiki.element.textContent).not.toContain('waitForWorld')
  })

  it('loads the file tree once and reuses it', async () => {
    wiki.element.classList.add('is-active')

    await wiki.reveal(null)

    const files = wiki.element.querySelectorAll('.code-wiki__file')
    expect(files).toHaveLength(133)
    expect(wiki.element.textContent).toContain('Welcome to Code Wiki')

    const navigation = wiki.element.querySelector('nav')
    if (!navigation) throw new Error('Missing Code Wiki navigation')

    const selected = wiki.element.querySelector<HTMLButtonElement>(
      '[data-page="convex/worlds.ts"]',
    )
    selected?.click()
    navigation.scrollTop = 80

    await wiki.reveal(null)

    expect(wiki.element.querySelectorAll('nav')).toHaveLength(1)
    expect(navigation.scrollTop).toBe(80)
    expect(selected?.classList.contains('is-selected')).toBe(true)
    expect(wiki.element.textContent).toContain('worlds.ts')
  })

  it('opens a direct function link after the module loads', async () => {
    wiki.element.classList.add('is-active')

    await wiki.reveal('#code-wiki/scripts/initialize-world.mjs/waitForWorld')

    const heading = wiki.element.querySelector<HTMLElement>(
      '[data-anchor="waitForWorld"]',
    )

    expect(heading?.textContent).toContain('waitForWorld()')
    expect(
      wiki.element.querySelector<HTMLButtonElement>(
        '[data-page="scripts/initialize-world.mjs"]',
      )?.classList.contains('is-selected'),
    ).toBe(true)
  })

  it('uses the latest deep link when several opens overlap', async () => {
    wiki.element.classList.add('is-active')

    await Promise.all([
      wiki.reveal('#code-wiki/scripts/initialize-world.mjs/waitForWorld'),
      wiki.reveal('#code-wiki/src/main.ts'),
    ])

    expect(wiki.element.querySelector('[data-anchor="waitForWorld"]')).toBeNull()
    expect(
      wiki.element.querySelector<HTMLButtonElement>(
        '[data-page="src/main.ts"]',
      )?.classList.contains('is-selected'),
    ).toBe(true)
  })

  it('does not open Code Wiki after the view has changed', async () => {
    wiki.element.classList.add('is-active')

    const pending = wiki.reveal(
      '#code-wiki/scripts/initialize-world.mjs/waitForWorld',
    )
    wiki.element.classList.remove('is-active')
    await pending

    expect(wiki.element.classList.contains('is-active')).toBe(false)
    expect(wiki.element.querySelector('.code-wiki__file')).toBeNull()

    wiki.element.classList.add('is-active')
    await wiki.reveal(null)

    expect(wiki.element.textContent).toContain('Welcome to Code Wiki')
    expect(wiki.element.querySelector('[data-anchor="waitForWorld"]')).toBeNull()
  })
})
