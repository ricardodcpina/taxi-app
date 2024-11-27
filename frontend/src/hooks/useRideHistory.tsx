import type { ListResponseBody } from '../types/responseBody';

import useFetch from './useFetch';
import useFormState from './useFormState';

export default function useRideHistory() {
  const initialState = { customer_id: '', driver_id: 0 };

  // Extract form state and change handler
  const { formState, handleChange } = useFormState<{
    customer_id: string;
    driver_id: number;
  }>(initialState);

  // Format query params
  const queryParams = `driver_id=${formState.driver_id}`;
  const url = `/ride/${formState.customer_id}?${queryParams}`;

  // Format fetch options
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  // Extract states and submit handler
  const { data, isLoading, errorMessage, handleSubmit } =
    useFetch<ListResponseBody>(url, fetchOptions);

  return {
    data,
    formState,
    isLoading,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
