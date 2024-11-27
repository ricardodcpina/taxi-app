import prisma from '../server';
import { invalidDriver, noRidesFound } from '../errors';

export default async function listRidesService(
  customer_id: string,
  driver_id?: number
) {
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
