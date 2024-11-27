import { useEffect, useState } from 'react';

import type { EstimateResponseBody } from '../types/responseBody';

import useFetch from './useFetch';

const useGenerateMap = (rideData: EstimateResponseBody) => {
  const [mapURL, setMapURL] = useState('');

  // Extract polyline data for drawing route
  const overviewPolyline =
    rideData?.routeResponse.routes[0].legs[0].polyline
      .encodedPolyline;

  // Concatenate query params
  const queryParams =
    rideData &&
    `overview_polyline=${overviewPolyline}&` +
      `origin=${rideData.origin.latitude},` +
      `${rideData.origin.longitude}` +
      `&destination=${rideData.destination.latitude},` +
      `${rideData.destination.longitude}`;

  // Concatenate url
  const url = `/ride/static_map?${queryParams}`;

  // Format fetch options
  const fetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  // Fetch static map image as a blob
  const { data, isLoading, errorMessage, fetchData } = useFetch<Blob>(
    url,
    fetchOptions,
    'blob'
  );

  useEffect(() => {
    // Fetch static map only once
    if (rideData && !mapURL && !isLoading) {
      fetchData();
    }

    // Update mapURL state only once
    if (data && !mapURL) {
      setMapURL(URL.createObjectURL(data));
    }
  }, [data, rideData, fetchData, isLoading, mapURL]);

  return {
    mapURL,
    isLoading,
    errorMessage,
  };
};

export default useGenerateMap;
