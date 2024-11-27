import { useEffect, useState } from 'react';

import type { RideHistoryFormProps } from '../types/reactProps';
import type { ListResponseBody } from '../types/responseBody';
import type { Driver } from '../types/driver';

import Button from './styled/Button';
import Input from './styled/Input';
import Form from './styled/Form';
import Select from './styled/Select';

import useRideHistory from '../hooks/useRideHistory';
import useFetch from '../hooks/useFetch';
import usePreviousError from '../hooks/usePreviousError';

const RideHistoryForm = ({ setRideList }: RideHistoryFormProps) => {
  const [driverList, setDriverList] = useState<Driver[]>([]);

  // Extract states and event handlers
  const {
    data: ridesData,
    formState,
    isLoading,
    errorMessage: errorMessageRides,
    handleChange,
    handleSubmit,
  } = useRideHistory();

  // Update ride history table when form is submitted
  useEffect(() => {
    if (ridesData) {
      setRideList([...(ridesData as ListResponseBody).rides]);
    } else {
      setRideList([]);
    }
  }, [ridesData, setRideList]);

  // Extract drivers and fetch function
  const {
    data,
    errorMessage: errorMessageDriver,
    fetchData,
  } = useFetch('/driver', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  // Populate select options with drivers
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      setDriverList(data);
    } else if (!data && !errorMessageDriver) {
      fetchData();
    }
  }, [data, errorMessageDriver, fetchData]);

  // Display any errors as a toast
  usePreviousError(errorMessageDriver);
  usePreviousError(errorMessageRides);

  return (
    <Form
      title='Escolha as opções de filtro!'
      onSubmit={handleSubmit}
    >
      <label htmlFor='customer_id' hidden>
        ID do usuário
      </label>
      <Input
        type='number'
        name='customer_id'
        id='customer_id'
        value={formState.customer_id}
        onChange={handleChange}
        placeholder='ID do usuário'
        min={'1'}
        width='25%'
        required
      />
      <label htmlFor='driver' hidden>
        Motorista
      </label>
      <Select name='driver_id' id='driver' onChange={handleChange}>
        <option value=''>Todos os motoristas</option>
        {driverList?.length > 0 &&
          driverList.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
      </Select>
      <Button type='submit' disabled={isLoading}>
        {isLoading ? 'Carregando...' : 'Filtrar valor'}
      </Button>
    </Form>
  );
};

export default RideHistoryForm;
