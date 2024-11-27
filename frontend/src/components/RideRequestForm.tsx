import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Button from './styled/Button';
import Form from './styled/Form';
import Input from './styled/Input';

import useRideRequest from '../hooks/useRideRequest';
import usePreviousError from '../hooks/usePreviousError';

const RideRequestForm = () => {
  // Extract states and event handlers from hook
  const {
    data,
    requestData,
    formState,
    isLoading,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useRideRequest();

  // Navigate user when data returns successfully
  const navigate = useNavigate();

  // Redirect user to ride options page
  useEffect(() => {
    if (data) {
      navigate('/options', {
        state: { rideData: data, requestData },
      });
    }
  }, [data, requestData, navigate]);

  // Display errors as a toast
  usePreviousError(errorMessage);

  return (
    <Form
      title='Preencha os dados da viagem!'
      onSubmit={handleSubmit}
    >
      <label htmlFor='customer_id' hidden>
        ID do usuário
      </label>
      <Input
        type='number'
        onChange={handleChange}
        name='customer_id'
        id='customer_id'
        value={formState.customer_id}
        placeholder='ID do usuário'
        min={'1'}
        width='115px'
        required
      />
      <label htmlFor='origin' hidden>
        Endereço de origem
      </label>
      <Input
        type='text'
        onChange={handleChange}
        name='origin'
        id='origin'
        value={formState.origin}
        placeholder='Endereço de partida'
        required
      />
      <label htmlFor='destination' hidden>
        Endereço de destino
      </label>
      <Input
        type='text'
        onChange={handleChange}
        name='destination'
        id='destination'
        value={formState.destination}
        placeholder='Endereço de destino'
        required
      />
      <Button type='submit' disabled={isLoading} aria-live='polite'>
        {isLoading ? 'Carregando...' : 'Estimar valor'}
      </Button>
    </Form>
  );
};

export default RideRequestForm;
