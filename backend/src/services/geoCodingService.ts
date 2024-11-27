import type { GeoCodingResponse } from '../types/googleSpecific';

import { addressNotFound, externalAPIError } from '../errors';

export default async function geoCodingService(address: string) {
  // Define Google Geocoding API URL
  const googleMapsURL =
    `https://maps.googleapis.com/maps/api/geocode/json?` +
    `address=${address}&key=${process.env.GOOGLE_API_KEY}`;

  // Configure headers
  const requestHeaders = {
    'Content-Type': 'application/json',
  };

  // Fetch data from Google GeoCoding API
  const googleResponse = await fetch(googleMapsURL, {
    method: 'GET',
    headers: requestHeaders,
  });

  // Validate Google GeoCoding response
  if (!googleResponse.ok) {
    throw externalAPIError;
  }

  // Retrieves place_id data in JSON format
  const placeData =
    (await googleResponse.json()) as GeoCodingResponse;

  // Validate if address was found
  if (placeData.results.length === 0) {
    throw addressNotFound;
  }

  return placeData.results[0].place_id;
}
