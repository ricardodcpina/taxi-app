import type { RideOption } from '../types/rides';
import type { Driver } from '../types/driver';

import prisma from '../server';
import generateRouteService from './generateRouteService';
import geoCodingService from './geoCodingService';
import { invalidDataError } from '../errors';

export default async function estimateRideService(
  origin: string,
  destination: string
) {
  // Call geocoding Service
  const origin_id = await geoCodingService(origin);
  const destination_id = await geoCodingService(destination);

  // Validate if addresses are the same
  if (origin_id === destination_id) {
    throw invalidDataError;
  }

  // Call generateRoute Service
  const rideData = await generateRouteService(origin, destination);

  // Extract relevant data to variables
  const route = rideData.routes[0];
  const routeLeg = route.legs[0];
  const distance = route.distanceMeters;

  // Retrieve list of drivers based on their min_km
  const drivers = await prisma.driver.findMany({
    where: { min_km: { lte: distance / 1000 } },
    orderBy: { cost_per_km: 'asc' },
  });

  // Create array with ride options
  const options: RideOption[] = [];
  drivers.forEach((driver: Driver) => {
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
