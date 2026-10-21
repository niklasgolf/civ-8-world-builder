import type { ConvexClient } from 'convex/browser'
import { api } from '../../../convex/_generated/api.js'
import {
  VISITOR_COLORS,
  type VisitorMarkerDevice,
} from './visitor-marker.ts'

const PLACEHOLDER = '—'

const DEVICES = ['mac', 'mobile', 'windows', 'other'] as const

const DEVICE_LABELS: Record<VisitorMarkerDevice, string> = {
  windows: 'Windows',
  mac: 'Mac',
  mobile: 'Mobile',
  other: 'Other',
}

let statsRequested = false

export function createVisitorStatistics(client: ConvexClient): HTMLElement {
  const statistics = document.createElement('div')
  statistics.className = 'visitors-layout__statistics'

  const totalValue = document.createElement('strong')
  totalValue.textContent = PLACEHOLDER

  const devices = createDeviceCounters()

  statistics.append(
    createTotal(totalValue),
    devices.element,
  )

  loadVisitorStats(client, totalValue, devices.values)

  return statistics
}

function createTotal(value: HTMLElement): HTMLElement {
  const total = document.createElement('div')
  total.className = 'visitors-layout__statistic visitors-layout__statistic--total'

  const label = document.createElement('span')
  label.textContent = 'Total visitors'

  total.append(label, value)

  return total
}

function createDeviceCounters(): {
  element: HTMLElement
  values: Record<VisitorMarkerDevice, HTMLElement>
} {
  const list = document.createElement('ul')
  list.className = 'visitors-layout__devices'

  const values = {} as Record<VisitorMarkerDevice, HTMLElement>

  for (const device of DEVICES) {
    const item = document.createElement('li')
    item.className = 'visitors-layout__device'

    const swatch = document.createElement('span')
    swatch.className = 'visitors-layout__device-swatch'
    swatch.style.backgroundColor = VISITOR_COLORS[device]
    swatch.setAttribute('aria-hidden', 'true')

    const label = document.createElement('span')
    label.textContent = DEVICE_LABELS[device]

    const value = document.createElement('strong')
    value.textContent = PLACEHOLDER
    values[device] = value

    item.append(swatch, label, value)
    list.append(item)
  }

  return { element: list, values }
}

function loadVisitorStats(
  client: ConvexClient,
  totalValue: HTMLElement,
  deviceValues: Record<VisitorMarkerDevice, HTMLElement>,
): void {
  if (statsRequested) {
    return
  }

  statsRequested = true
  void requestVisitorStats(client, totalValue, deviceValues)
}

async function requestVisitorStats(
  client: ConvexClient,
  totalValue: HTMLElement,
  deviceValues: Record<VisitorMarkerDevice, HTMLElement>,
): Promise<void> {
  try {
    const stats = await client.query(api.visitors.getVisitorStats, {})

    totalValue.textContent = String(stats.total)

    for (const device of DEVICES) {
      deviceValues[device].textContent = String(stats[device])
    }
  } catch (error: unknown) {
    console.error('Failed to load visitor statistics:', error)
  }
}
