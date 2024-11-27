import { externalAPIError } from '../errors';

export default async function generateRideMapService(
  origin: string,
  destination: string,
  overviewPoyline: string
) {
  // Format static map URL for route
  const staticMapAPI_URL =
    `https://maps.googleapis.com/maps/api/staticmap?` +
    `size=800x600&path=color:blue|enc:${overviewPoyline}&` +
    `markers=color:red|label:A|${origin}&` +
    `markers=color:red|label:B|${destination}&` +
    `key=${process.env.GOOGLE_API_KEY}`;

  // Fetch data from Google API Route
  const googleResponse = await fetch(staticMapAPI_URL);

  // Validate Google Route API response
  if (!googleResponse.ok) {
    throw externalAPIError;
  }

  // Convert response to buffer
  const arrayBuffer = await googleResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
