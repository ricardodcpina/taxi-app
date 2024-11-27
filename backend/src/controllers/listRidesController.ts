import { Request, Response, NextFunction } from 'express';

import type { ListResponseBody } from '../types/responseBody';

import listRidesService from '../services/listRidesService';
import { validateBlankFields } from '../utils';

const listRidesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract URL params and query
  const customerId = req.params.customer_id;
  const driverId = req.query.driver_id
    ? parseInt(req.query.driver_id as string)
    : undefined;

  try {
    // Apply basic validation on user input
    validateBlankFields(customerId);

    // Call the listRides service
    const rides = await listRidesService(customerId, driverId);

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
};

export default listRidesController;
