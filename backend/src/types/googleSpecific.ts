export type Route = {
  legs: Leg[];
  distanceMeters: number;
  duration: string;
};

export type Leg = {
  startLocation: Location;
  endLocation: Location;
  polyline: {
    encodedPolyline: string;
  };
};

export type Location = {
  latLng: {
    latitude: number;
    longitude: number;
  };
};

export type GoogleRouteResponse = {
  routes: Route[];
  geocodingResults: {
    origin: string;
    destination: string;
  };
};

export type GeoCodingResponse = {
  results: [{ place_id: string }] | [];
};
