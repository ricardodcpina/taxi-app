import { Request, Response, NextFunction } from 'express';

import type { ConfirmRequestBody } from '../types/requestBody';
import type { ConfirmResponseBody } from '../types/responseBody';

import { validateAddresses, validateBlankFields } from '../utils';

import confirmRideService from '../services/confirmRideService';

const confirmRideController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    // Apply basic validation on user input
    validateBlankFields(origin, destination, customer_id);
    validateAddresses(origin, destination);

    // Call the confirmRide service
    await confirmRideService(
      origin,
      destination,
      customer_id,
      distance,
      duration,
      driver.id,
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
};

export default confirmRideController;
