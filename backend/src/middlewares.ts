import { Request, Response, NextFunction } from 'express';

import type { RideError } from './types/errors';

// Global error handling middleware
export const globalErrorHandler = async (
  err: RideError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Output default message for generic errors
  if (err instanceof Error) {
    console.error(err.message);
    res
      .status(500)
      .json({ error_description: 'Erro interno do servidor' });
    return;
  }

  // Format message for specific tracked errors
  const formattedError: Omit<RideError, 'status_code'> = {
    error_code: err.error_code,
    error_description: err.error_description,
  };

  // Output formatted error message
  res.status(err.status_code).json(formattedError);
};
