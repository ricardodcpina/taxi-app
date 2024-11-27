import { useState } from 'react';

import type { Ride } from '../types/rides';

import RideHistoryForm from '../components/RideHistoryForm';
import RideHistoryTable from '../components/RideHistoryTable';
import MainTitle from '../components/styled/MainTitle';

// Ride history screen
const RideHistory = () => {
  const [rideList, setRideList] = useState<Ride[]>([]);

  return (
    <section>
      <MainTitle>Histórico de viagens</MainTitle>
      <RideHistoryForm setRideList={setRideList} />
      <RideHistoryTable rideList={rideList} />
    </section>
  );
};

export default RideHistory;
