import type { EstimateRequestBody } from '../types/requestBody';
import type { EstimateResponseBody } from '../types/responseBody';
import type { RideOption } from '../types/rides';

import useFetch from './useFetch';

const useRideOption = (
  option: RideOption,
  requestData: EstimateRequestBody,
  rideData: EstimateResponseBody
) => {
  // Format fetch parameters
  const url = 'ride/confirm';
  const fetchOptions = {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      customer_id: requestData.customer_id,
      origin: requestData.origin,
      destination: requestData.destination,
      distance: rideData.distance,
      duration: rideData.duration,
      driver: {
        id: option.id,
        name: option.name,
      },
      value: option.value,
    }),
  };

  // Extract states and submit handler from hook
  const { data, errorMessage, isLoading, handleSubmit } = useFetch(
    url,
    fetchOptions
  );

  return {
    data,
    isLoading,
    errorMessage,
    handleSubmit,
  };
};

export default useRideOption;
