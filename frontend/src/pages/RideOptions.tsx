import { useLocation } from 'react-router-dom';

import type { RequestPagePayload } from '../types/reactProps';

import ErrorPage from './ErrorPage';

import RideOptionCard from '../components/RideOptionCard';
import MainTitle from '../components/styled/MainTitle';
import {
  MapContainerWrapper,
  MapImage,
} from '../components/styled/Map';
import Spinner from '../components/styled/Spinner';

import useGenerateMap from '../hooks/useGenerateMap';
import usePreviousError from '../hooks/usePreviousError';

// Ride options screen
const RideOptions = () => {
  // Extract state sent from last page
  const { state }: RequestPagePayload = useLocation();

  // Extract data stored in state
  const rideData = state?.rideData;
  const requestData = state?.requestData;

  // Extract states from hook
  const { mapURL, isLoading, errorMessage } =
    useGenerateMap(rideData);

  // Display errors as a toast
  usePreviousError(errorMessage);

  return (
    <>
      {!rideData || !requestData ? (
        // Accessing without requesting ride renders error
        <ErrorPage
          title='Viagem inválida!'
          message='Os dados da viagem não foram fornecidos!'
        />
      ) : (
        <>
          <MainTitle>Opções de viagem</MainTitle>
          <MapContainerWrapper>
            {isLoading ? (
              // Render spinner while loading
              <Spinner />
            ) : (
              // And static map when ready
              rideData &&
              mapURL && (
                <MapImage
                  src={mapURL}
                  alt='Mapa da rota entre origem e destino'
                />
              )
            )}
          </MapContainerWrapper>
          {rideData?.options.map((option) => (
            // Render each driver option
            <div key={option.id}>
              <RideOptionCard
                option={option}
                requestData={requestData}
                rideData={rideData}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default RideOptions;
