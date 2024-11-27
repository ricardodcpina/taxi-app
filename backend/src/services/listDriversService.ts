import prisma from '../server';

export default async function listDriversService() {
  const drivers = await prisma.driver.findMany();
  return drivers;
}
