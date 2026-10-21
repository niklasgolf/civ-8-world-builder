import { UserAgentParser } from 'visitor-module'

const parser = new UserAgentParser()

export type VisitorDeviceCategory = 'windows' | 'mac' | 'mobile' | 'other'

export function detectVisitorDevice(
  userAgent: string = navigator.userAgent,
): VisitorDeviceCategory {
  const deviceType = parser.parseDeviceType(userAgent)

  if (deviceType === 'Mobile' || deviceType === 'Tablet') {
    return 'mobile'
  }

  const operatingSystem = parser.parseOperatingSystem(userAgent)

  if (operatingSystem === 'Windows') {
    return 'windows'
  }

  if (operatingSystem === 'MacOs') {
    return 'mac'
  }

  return 'other'
}

const LOCATION_URL = '/api/visitor-location'

export type VisitorLocation = {
  latitude: number
  longitude: number
}

function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  )
}

function readLocation(body: unknown): VisitorLocation | undefined {
  if (typeof body !== 'object' || body === null) {
    return undefined
  }

  const record = body as Record<string, unknown>

  if (record.success !== true) {
    return undefined
  }

  if (
    typeof record.latitude !== 'number' ||
    typeof record.longitude !== 'number' ||
    !isValidCoordinate(record.latitude, record.longitude)
  ) {
    return undefined
  }

  return {
    latitude: record.latitude,
    longitude: record.longitude,
  }
}

export async function detectVisitorLocation(): Promise<
  VisitorLocation | undefined
> {
  try {
    const response = await fetch(LOCATION_URL)

    if (!response.ok) {
      return undefined
    }

    return readLocation(await response.json())
  } catch {
    return undefined
  }
}
