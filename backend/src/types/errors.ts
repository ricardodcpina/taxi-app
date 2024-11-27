export type RideError = {
    status_code: number;
    error_code:
      | 'INVALID_DATA'
      | 'INVALID_DISTANCE'
      | 'INVALID_DRIVER'
      | 'DRIVER_NOT_FOUND'
      | 'NO_RIDES_FOUND'
      | 'INVALID_ADDRESS'
      | 'EXTERNAL_API_ERROR';
    error_description: string;
  };