// Third-party imports
import { PrismaClient } from '@prisma/client';

// Set up a prisma instance
const prisma = new PrismaClient();

async function seedDrivers() {
  await prisma.driver.create({
    data: {
      name: 'Homer Simpson',
      description:
        'Olá! Sou o Homer, seu motorista camarada! ' +
        'Relaxe e aproveite o passeio, com direito ' +
        'a rosquinhas e boas risadas (e talvez alguns desvios).',
      vehicle: 'Plymouth Valiant 1978 rosa e enferrujado',
      rating: 2,
      comment:
        'Motorista simpático, mas errou o caminho' +
        ' 3 vezes. O carro cheira a donuts.',
      cost_per_km: 2.5,
      min_km: 1,
    },
  });
  await prisma.driver.create({
    data: {
      name: 'Dominic Toretto',
      description:
        'Ei, aqui é o Dom. Pode entrar, vou te levar ' +
        'com segurança e rapidez ao seu destino. Só ' +
        'não mexa no rádio, a playlist é sagrada.',
      vehicle: 'Dodge Charger R/T 1970 modificado',
      rating: 4,
      comment:
        'Que viagem incrível! O carro é um show ' +
        'à parte e o motorista, apesar de ter uma cara de ' +
        'poucos amigos, foi super gente boa! Recomendo!',
      cost_per_km: 5.0,
      min_km: 5,
    },
  });
  await prisma.driver.create({
    data: {
      name: 'James Bond',
      description:
        'Boa noite, sou James Bond. À seu dispor ' +
        'para um passeio suave e discreto. Aperte ' +
        'o cinto e aproveite a viagem.',
      vehicle: 'Astom Martin DB5 clássico',
      rating: 4,
      comment:
        'Serviço impecável! O motorista é a própria ' +
        'definição de classe e o carro é simplemente ' +
        'magnífico. Uma experiência digna de um ' +
        'agente secreto.',
      cost_per_km: 10.0,
      min_km: 10,
    },
  });
}

// Insert default drivers into database
seedDrivers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
