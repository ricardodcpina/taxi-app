import prisma from './server';
import {
  driverNotFound,
  externalAPIError,
  invalidDistance,
  invalidDriver,
  noRidesFound,
} from './errors';
import { GoogleMapsResponseBody, RideOption } from './types';

export async function estimateRide(
  origin: string,
  destination: string,
  customer_id: string
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
      'routes.legs.end_location',
  };

  // Attaches origin/destination to request body
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

  // Check if API fetch was not successfull
  if (!googleResponse.ok) {
    throw externalAPIError;
  }

  // Retrieves route data in JSON format
  const rideData =
    (await googleResponse.json()) as GoogleMapsResponseBody;

  // Extract relevant data to variables
  const route = rideData.routes[0];
  const routeLeg = route.legs[0];
  const distance = route.distanceMeters;

  // Retrieve list of drivers based on their min_km
  const drivers = await prisma.driver.findMany({
    where: { min_km: { lte: distance / 1000 } },
    orderBy: { cost_per_km: 'asc' },
  });

  // Creates an array of ride options
  const options: RideOption[] = [];
  drivers.forEach((driver) => {
    options.push({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: driver.rating,
        comment: driver.comment,
      },
      value: parseFloat(
        (driver.cost_per_km * (distance / 1000)).toFixed(2)
      ),
    });
  });

  return {
    originLat: routeLeg.startLocation.latLng.latitude,
    originLong: routeLeg.startLocation.latLng.longitude,
    destLat: routeLeg.endLocation.latLng.latitude,
    destLong: routeLeg.endLocation.latLng.longitude,
    distance: route.distanceMeters,
    duration: route.duration,
    options,
    googleData: rideData,
  };
}

export async function confirmRide(
  origin: string,
  destination: string,
  customer_id: string,
  distance: number,
  duration: string,
  driverId: number,
  driverName: string,
  value: number
) {
  // Retrieve driver data from database
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  // Validate if driver entry exists
  if (!driver) throw driverNotFound;

  // Validate if driver name and id matches
  if (driverName !== driver.name) throw driverNotFound;

  // Validate if distance input is allowed
  if (distance / 1000 < driver.cost_per_km) throw invalidDistance;

  // Persist ride data on database
  const ride = await prisma.ride.create({
    data: {
      customer_id,
      driver_id: driver.id,
      origin,
      destination,
      distance,
      duration,
      date: new Date(),
      value,
    },
  });

  return true;
}

export async function listRides(
  customer_id: string,
  driver_id?: number
) {
  // Validate driver id if provided
  if (driver_id) {
    // Retrieve driver data from database
    const driver = await prisma.driver.findUnique({
      where: { id: driver_id },
    });

    // Validate if driver entry exists
    if (!driver) throw invalidDriver;
  }

  // Retrieve rides data from database
  const rides = await prisma.ride.findMany({
    where: { customer_id, ...(driver_id && { driver_id }) },
    orderBy: { date: 'desc' },
    select: {
      id: true,
      date: true,
      origin: true,
      destination: true,
      distance: true,
      duration: true,
      value: true,
      driver: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  // Validate if there are any rides
  if (rides.length === 0) throw noRidesFound;

  // Return list of rides
  return rides;
}
