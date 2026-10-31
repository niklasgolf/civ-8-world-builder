import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/application/codewiki/code-wiki-main.ts', () => {
  throw new Error('chunk failed')
})

describe('CodeWiki loader failure', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    vi.resetModules()
  })

  it('shows a load error without leaving the Code Wiki view', async () => {
    const { CodeWiki } = await import('../src/application/codewiki/code-wiki.ts')
    const wiki = new CodeWiki()
    wiki.element.classList.add('is-active')
    document.body.append(wiki.element)

    await wiki.reveal(null)

    expect(wiki.element.classList.contains('is-active')).toBe(true)
    expect(wiki.element.textContent).toContain('Code Wiki could not be loaded.')
    expect(wiki.element.querySelector('.code-wiki__file')).toBeNull()
  })
})