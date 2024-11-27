import { Request, Response, NextFunction } from 'express';

import generateRideMapService from '../services/generateMapRideService';
import { validateBlankFields } from '../utils';

const generateMapController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract URL query data
  const { origin } = req.query as { origin: string };
  const { destination } = req.query as { destination: string };
  const { overview_polyline } = req.query as {
    overview_polyline: string;
  };

  try {
    validateBlankFields(origin, destination, overview_polyline);
    // Call generateRideMap service
    const mapImage = await generateRideMapService(
      origin,
      destination,
      overview_polyline
    );

    // Send the static map image for the ride
    res.set('Content-Type', 'image/png');
    res.status(200).send(mapImage);
  } catch (error) {
    // Redirect to global error handling middleware
    next(error);
  }
};

export default generateMapController;
