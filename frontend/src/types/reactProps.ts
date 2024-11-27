import { ReactNode } from 'react';

import type { EstimateRequestBody } from './requestBody';
import type { EstimateResponseBody } from './responseBody';
import type { Ride, RideOption } from './rides';

export type RideOptionCardProps = {
  option: RideOption;
  requestData: EstimateRequestBody;
  rideData: EstimateResponseBody;
};

export type RideHistoryFormProps = {
  setRideList: React.Dispatch<React.SetStateAction<Ride[]>>;
};

export type RideHistoryTableProps = {
  rideList: Ride[];
};

export type InputProps = {
  width?: string;
};

export type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  title?: string;
};

export type RequestPagePayload = {
  state: {
    rideData: EstimateResponseBody;
    requestData: EstimateRequestBody;
  };
};
