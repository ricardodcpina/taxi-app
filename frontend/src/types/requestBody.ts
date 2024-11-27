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
