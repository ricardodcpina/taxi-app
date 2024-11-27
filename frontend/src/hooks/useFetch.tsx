import { useState } from 'react';

import { isRideError } from '../types/typeGuards';

export default function useFetch<T>(
  url: string,
  options: RequestInit,
  responseFormat: 'json' | 'blob' = 'json'
) {
  const [data, setData] = useState<T | Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Define fetch function including states
  const fetchData = async () => {
    try {
      // Reset data, errors ands start loading state
      setData(null);
      setErrorMessage('');
      setIsLoading(true);

      // Fetch ride data from backend
      const response = await fetch(url, options);

      // Format data to JSON or Blob (for image)
      const result: T =
        responseFormat === 'blob'
          ? await response.blob()
          : await response.json();

      // Display backend specific errors if any
      if (isRideError(result)) {
        setErrorMessage(result.error_description);
      }
      // Update data with formatted result
      else {
        setData(result);
      }
    } catch {
      // Display network connection errors or others
      setErrorMessage(
        'Algo deu errado ao tentar processar sua ' +
          'solicitação. Tente novamente mais tarde'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Define submit handler including the fetch function
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetchData();
  }

  return {
    data,
    isLoading,
    errorMessage,
    fetchData,
    handleSubmit,
  };
}
