import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const usePreviousError = (errorMessage: string) => {
  const [prevErrorMessage, setPrevErrorMessage] = useState('');

  // Display toast with errors to user if any
  useEffect(() => {
    if (errorMessage && errorMessage !== prevErrorMessage) {
      toast.error(errorMessage);
      setPrevErrorMessage(errorMessage);
    }
    setPrevErrorMessage('');
  }, [errorMessage, prevErrorMessage]);

  return;
};

export default usePreviousError;
