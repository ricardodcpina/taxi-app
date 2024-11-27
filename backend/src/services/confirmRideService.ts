import prisma from '../server';
import { driverNotFound, invalidDistance } from '../errors';

export default async function confirmRideService(
  origin: string,
  destination: string,
  customer_id: string,
  distance: number,
  duration: string,
  driverId: number,
  value: number
) {
  // Retrieve driver data from database
  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  // Validate if driver entry exists
  if (!driver) throw driverNotFound;

  // Validate if distance provided is allowed by driver
  if (distance / 1000 < driver.min_km) throw invalidDistance;

  // Persist ride data on database
  await prisma.ride.create({
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
