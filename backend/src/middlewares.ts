// Third-party imports
import { Request, Response, NextFunction } from 'express';

// Internal imports
import { APIError, RideError } from './types';

// Global error handling middleware
export const globalErrorHandler = async (
  err: RideError | APIError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Output default message for generic errors
  if (err instanceof Error) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }

  // Format message for specific tracked errors
  const formattedError: Omit<RideError | APIError, 'status_code'> = {
    error_code: err.error_code,
    error_description: err.error_description,
  };

  // Output formatted message
  res.status(err.status_code).json(formattedError);
};
