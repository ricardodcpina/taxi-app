import express from 'express';

import rideRouter from './routes/rideRoutes';
import driverRouter from './routes/driverRoutes';
import { globalErrorHandler } from './middlewares';

// Set up application
const app = express();

// Include middlewares
app.use('/', express.json());
app.use('/ride', rideRouter);
app.use('/driver', driverRouter);
app.use(globalErrorHandler);

export default app;
