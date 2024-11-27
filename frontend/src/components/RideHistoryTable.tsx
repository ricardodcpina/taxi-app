import type { RideHistoryTableProps } from '../types/reactProps';

import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from './styled/Table';

import formatBRL from '../utils/formatBRL';

export default function RideHistoryTable({
  rideList,
}: RideHistoryTableProps) {
  return (
    rideList.length > 0 && (
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Data</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Distância</TableCell>
              <TableCell>Tempo</TableCell>
              <TableCell>Valor</TableCell>
            </tr>
          </TableHeader>
          <tbody>
            {rideList?.map((ride) => (
              <tr key={ride.id}>
                <TableCell>{ride.date.toString()}</TableCell>
                <TableCell>{ride.driver.name}</TableCell>
                <TableCell>{ride.origin}</TableCell>
                <TableCell>{ride.destination}</TableCell>
                <TableCell>{ride.distance}m</TableCell>
                <TableCell>{ride.duration}</TableCell>
                <TableCell>{formatBRL(ride.value)}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    )
  );
}
