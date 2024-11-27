import { Request, Response, NextFunction } from 'express';

import type { EstimateRequestBody } from '../types/requestBody';
import type { EstimateResponseBody } from '../types/responseBody';

import estimateRideService from '../services/estimateRideService';
import { validateBlankFields } from '../utils';

const estimateRideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract relevant user input from body
  const { origin, destination, customer_id }: EstimateRequestBody =
    req.body;

  try {
    // Apply basic validation on user input
    validateBlankFields(origin, destination, customer_id);

    // Call estimateRide service
    const rideData = await estimateRideService(origin, destination);

    // Format response body
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

    // Output response
    res.status(200).json(responseBody);
  } catch (error) {
    // Redirect to error handling middleware
    next(error);
  }
};

export default estimateRideController;
