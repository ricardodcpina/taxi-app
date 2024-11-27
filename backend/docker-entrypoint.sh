echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Running seed script..."
npm run seed

echo "Starting backend server..."
npm run start:prod
