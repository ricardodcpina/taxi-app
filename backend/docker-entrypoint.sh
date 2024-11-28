echo "Running Prisma migrations..."
npx prisma migrate dev

echo "Running seed script..."
npm run seed

echo "Starting backend server..."
npm run start:prod
