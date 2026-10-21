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
