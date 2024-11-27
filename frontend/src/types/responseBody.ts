import type { GoogleRouteResponse } from './googleSpecific';
import type { Ride, RideOption } from './rides';

export type EstimateResponseBody = {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  distance: number;
  duration: string;
  options: RideOption[];
  routeResponse: GoogleRouteResponse;
};

export type ConfirmResponseBody = {
  success: true;
};

export type ListResponseBody = {
  customer_id: string;
  rides: Ride[];
};
