import type { GoogleRouteResponse } from '../types/googleSpecific';

import { externalAPIError } from '../errors';

export default async function generateRouteService(
  origin: string,
  destination: string
) {
  // Define Google Route API URL
  const googleMapsURL =
    'https://routes.googleapis.com/directions/v2:computeRoutes';

  // Configure headers with API key and field mask
  const requestHeaders = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': `${process.env.GOOGLE_API_KEY}`,
    'x-Goog-FieldMask':
      'routes.duration,routes.distanceMeters,' +
      'routes.legs.start_location,' +
      'routes.legs.end_location,' +
      'routes.legs.polyline.encoded_polyline,' +
      'geocodingResults.origin.placeId,' +
      'geocodingResults.destination.placeId,',
  };

  // Attach origin/destination to request body
  const requestBody = JSON.stringify({
    origin: { address: origin },
    destination: { address: destination },
  });

  // Fetch data from Google API Route
  const googleResponse = await fetch(googleMapsURL, {
    method: 'POST',
    headers: requestHeaders,
    body: requestBody,
  });

  // Validate Google Route API response
  if (!googleResponse.ok) {
    throw externalAPIError;
  }

  // Retrieves route data in JSON format
  const rideData =
    (await googleResponse.json()) as GoogleRouteResponse;

  return rideData;
}
