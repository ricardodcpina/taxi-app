import { useMemo } from 'react';

import { EstimateRequestBody } from '../types/requestBody';
import { EstimateResponseBody } from '../types/responseBody';

import useFormState from './useFormState';
import useFetch from './useFetch';

const useRideRequest = () => {
  const initialFormState = {
    customer_id: '',
    origin: '',
    destination: '',
  };

  // Extract form state and change handler
  const { formState, handleChange } =
    useFormState<EstimateRequestBody>(initialFormState);

  // Format fetch parameters
  const url = '/ride/estimate';
  const requestBody = useMemo(
    () => ({
      customer_id: formState.customer_id,
      origin: formState.origin,
      destination: formState.destination,
    }),
    [formState.customer_id, formState.origin, formState.destination]
  );
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  };

  // Extract states and submit handler
  const { data, isLoading, errorMessage, handleSubmit } =
    useFetch<EstimateResponseBody>(url, fetchOptions);

  return {
    data,
    requestData: requestBody,
    formState,
    isLoading,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};

export default useRideRequest;
