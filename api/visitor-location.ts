const RESPONSE_HEADERS = {
  'Cache-Control': 'private, no-store',
}

function readCoordinate(value: string | null): number | undefined {
  if (value === null || value.trim() === '') {
    return undefined
  }

  const coordinate = Number(value)

  if (!Number.isFinite(coordinate)) {
    return undefined
  }

  return coordinate
}

export function GET(request: Request): Response {
  const latitude = readCoordinate(
    request.headers.get('x-vercel-ip-latitude'),
  )
  const longitude = readCoordinate(
    request.headers.get('x-vercel-ip-longitude'),
  )

  if (
    latitude === undefined ||
    longitude === undefined ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return Response.json(
      { success: false },
      { headers: RESPONSE_HEADERS },
    )
  }

  return Response.json(
    {
      success: true,
      latitude,
      longitude,
    },
    { headers: RESPONSE_HEADERS },
  )
}
