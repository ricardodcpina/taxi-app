// ------------MAIN TYPES-----------

export type Route = {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
};

export type Leg = {
  startLocation: RideOrigin;
  endLocation: RideDestination;
};

export type RideOrigin = {
  latLng: {
    latitude: number;
    longitude: number;
  };
};

export type RideDestination = {
  latLng: {
    latitude: number;
    longitude: number;
  };
};

export type RideOption = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

export type Ride = {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

// ----------REQUEST BODIES----------

export type EstimateRequestBody = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type ConfirmRequestBody = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

// ----------RESPONSE BODIES----------

export type GoogleMapsResponseBody = {
  routes: Route[];
};

export type EstimateResponseBody = {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: GoogleMapsResponseBody;
};

export type ConfirmResponseBody = {
  success: true;
};

export type ListResponseBody = {
  customer_id: string;
  rides: Ride[];
};

// -------------ERRORS----------------

export type RideError = {
  status_code: number;
  error_code:
    | 'INVALID_DATA'
    | 'INVALID_DISTANCE'
    | 'INVALID_DRIVER'
    | 'DRIVER_NOT_FOUND'
    | 'NO_RIDES_FOUND';
  error_description: string;
};

export type APIError = {
  status_code: number;
  error_code: 'EXTERNAL_API_ERROR';
  error_description: string;
};
