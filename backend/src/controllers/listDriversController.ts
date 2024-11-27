import { Request, Response, NextFunction } from 'express';

import { Driver } from '../types/driver';

import listDriversService from '../services/listDriversService';

const listDriversController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Call listDrivers service
    const drivers: Driver[] = await listDriversService();

    // Output drivers list
    res.status(200).json(drivers);
  } catch (error) {
    // Redirect to global error handling middleware
    next(error);
  }
};

export default listDriversController;
