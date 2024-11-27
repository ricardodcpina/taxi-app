import { useState } from 'react';

// Hook for managing form state fields
export default function useFormState<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState);

  // Define function triggered on input change
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Extract respective field and value
    const { name, value } = e.target;

    // Update previous state
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    formState,
    handleChange,
  };
}
