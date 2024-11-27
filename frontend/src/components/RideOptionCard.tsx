import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import type { RideOptionCardProps } from '../types/reactProps';

import Button from './styled/Button';
import {
  CardContainer,
  CardDescription,
  CardTitle,
  CardValue,
} from './styled/Card';

import useRideOption from '../hooks/useRideOption';
import formatBRL from '../utils/formatBRL';
import usePreviousError from '../hooks/usePreviousError';

const RideOptionCard = ({
  option,
  requestData,
  rideData,
}: RideOptionCardProps) => {
  // Extract states and handlers from hook
  const { data, isLoading, errorMessage, handleSubmit } =
    useRideOption(option, requestData, rideData);

  // Navigate user when data returns successfully
  const navigate = useNavigate();

  // Redirect user to ride history page
  useEffect(() => {
    if (data) {
      navigate('/history');
    }
  }, [data, navigate]);

  // Display errors as a toast
  usePreviousError(errorMessage);

  return (
    <CardContainer>
      <form onSubmit={handleSubmit}>
        <CardTitle>{option.name}</CardTitle>
        <CardDescription>Veículo: {option.vehicle}</CardDescription>
        <CardDescription>
          Descrição: {option.description}
        </CardDescription>
        <CardDescription>
          Avaliação: {option.review.rating}/5 -{' '}
          {option.review.comment}{' '}
        </CardDescription>
        <CardValue>
          Valor da corrida: {formatBRL(option.value)}
        </CardValue>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Escolher'}
        </Button>
      </form>
    </CardContainer>
  );
};

export default RideOptionCard;
