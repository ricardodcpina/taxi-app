// Third-party imports
import 'dotenv/config.js';
import express from 'express';

// Internal imports
import rideRouter from './controllers';
import { globalErrorHandler } from './middlewares';

// Set up application
const app = express();

// Include middlewares
app.use('/', express.json());
app.use('/ride', rideRouter);
app.use(globalErrorHandler);

export default app;
