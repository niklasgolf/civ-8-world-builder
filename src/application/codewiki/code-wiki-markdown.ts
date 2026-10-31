import { unescapeMarkdown } from './handbook-unescape.ts'

export function renderMarkdown(markdown: string, container: HTMLElement): void {
  const lines = unescapeMarkdown(markdown)
    .replaceAll('\\<escape\\>', '')
    .replaceAll('\\</escape\\>', '')
    .split('\n')

  let index = 0

  while (index < lines.length) {
    const line = lines[index]

    if (!line.trim()) {
      index += 1
      continue
    }

    if (/^---+$/.test(line.trim())) {
      container.append(document.createElement('hr'))
      index += 1
      continue
    }

    const heading = /^(#{1,4})\s+(.*)$/.exec(line.trim())
    if (heading) {
      const element = document.createElement('h4')
      element.className = 'code-wiki__markdown-heading'
      appendInline(element, heading[2])
      container.append(element)
      index += 1
      continue
    }

    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index])
        index += 1
      }
      container.append(renderTable(tableLines))
      continue
    }

    if (isListItem(line)) {
      const ordered = /^\s*\d+\./.test(line)
      const list = document.createElement(ordered ? 'ol' : 'ul')

      while (index < lines.length && isListItem(lines[index])) {
        const item = document.createElement('li')
        appendInline(item, lines[index].replace(/^\s*(?:[-*]|\d+\.)\s+/, ''))
        list.append(item)
        index += 1
      }

      container.append(list)
      continue
    }

    const paragraph: string[] = []
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
      paragraph.push(lines[index].trim())
      index += 1
    }

    const element = document.createElement('p')
    appendInline(element, paragraph.join(' '))
    container.append(element)
  }
}

function isBlockStart(line: string): boolean {
  const text = line.trim()
  return text.startsWith('#')
    || text.startsWith('|')
    || /^---+$/.test(text)
    || isListItem(line)
}

function isListItem(line: string): boolean {
  return /^\s*(?:[-*]|\d+\.)\s+/.test(line)
}

function renderTable(lines: string[]): HTMLTableElement {
  const table = document.createElement('table')
  table.className = 'code-wiki__table'

  const rows = lines
    .map((line) => splitRow(line))
    .filter((cells) => !cells.every((cell) => /^:?-+:?$/.test(cell.replaceAll(' ', ''))))

  if (rows.length === 0) return table

  const head = document.createElement('thead')
  const headRow = document.createElement('tr')
  for (const cell of rows[0]) {
    const header = document.createElement('th')
    appendInline(header, cell)
    headRow.append(header)
  }
  head.append(headRow)
  table.append(head)

  const body = document.createElement('tbody')
  for (const cells of rows.slice(1)) {
    const row = document.createElement('tr')
    for (const cell of cells) {
      const data = document.createElement('td')
      appendInline(data, cell)
      row.append(data)
    }
    body.append(row)
  }
  table.append(body)

  return table
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function appendInline(parent: HTMLElement, text: string): void {
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*)/g
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > lastIndex) {
      parent.append(text.slice(lastIndex, index))
    }

    const token = match[0]
    if (token.startsWith('`')) {
      const code = document.createElement('code')
      code.textContent = token.slice(1, -1)
      parent.append(code)
    } else {
      const strong = document.createElement('strong')
      strong.textContent = token.slice(2, -2)
      parent.append(strong)
    }

    lastIndex = index + token.length
  }

  if (lastIndex < text.length) {
    parent.append(text.slice(lastIndex))
  }
}
