// Third-party imports
import { Request, Response, NextFunction, Router } from 'express';

// Internal imports
import { validateUserInput } from './utils';
import {
  ConfirmRequestBody,
  ConfirmResponseBody,
  EstimateRequestBody,
  EstimateResponseBody,
  ListResponseBody,
} from './types';
import { confirmRide, estimateRide, listRides } from './services';

// Create a router instance
const rideRouter = Router();

rideRouter.post(
  '/estimate',
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract relevant user input from body
    const { origin, destination, customer_id }: EstimateRequestBody =
      req.body;

    try {
      // Apply formatting validation on user input
      validateUserInput(origin, destination, customer_id);

      // Call the estimateRide service
      const rideData = await estimateRide(
        origin,
        destination,
        customer_id
      );

      // Format the response body
      const responseBody: EstimateResponseBody = {
        origin: {
          latitude: rideData.originLat,
          longitude: rideData.originLong,
        },
        destination: {
          latitude: rideData.destLat,
          longitude: rideData.destLong,
        },
        distance: rideData.distance,
        duration: rideData.duration,
        options: rideData.options,
        routeResponse: rideData.googleData,
      };

      // Output result to user
      res.status(200).json(responseBody);
    } catch (error) {
      // Redirect to error handling middleware
      next(error);
    }
  }
);

rideRouter.patch(
  '/confirm',
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract relevant user input from body
    const {
      origin,
      destination,
      customer_id,
      distance,
      duration,
      driver,
      value,
    }: ConfirmRequestBody = req.body;

    try {
      // Apply formatting validation on user input
      validateUserInput(origin, destination, customer_id);

      // Call the confirmRide service
      await confirmRide(
        origin,
        destination,
        customer_id,
        distance,
        duration,
        driver.id,
        driver.name,
        value
      );

      // Format the response body
      const responseBody: ConfirmResponseBody = { success: true };

      // Output result message to user
      res.status(200).json(responseBody);
    } catch (error) {
      // Redirect to global error handling middleware
      next(error);
    }
  }
);

rideRouter.get(
  '/:customer_id',
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract relevant user input from URL params and query
    const customerId = req.params.customer_id;
    const driverId = req.query.driver_id
      ? parseInt(req.query.driver_id as string)
      : undefined;

    try {
      // Apply formatting validation on user input
      if (!customerId) return;

      // Call the listRides service
      const rides = await listRides(customerId, driverId);

      // Format the response body
      const responseBody: ListResponseBody = {
        customer_id: customerId,
        rides,
      };

      // Output rides list
      res.status(200).json(responseBody);
    } catch (error) {
      // Redirect to global error handling middleware
      next(error);
    }
  }
);

export default rideRouter;
