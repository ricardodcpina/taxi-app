import { RideError } from './errors';

export const isRideError = (result: unknown): result is RideError => {
  // Type Guard for RideError
  return (
    typeof result === 'object' &&
    result !== null &&
    'error_code' in result
  );
};
