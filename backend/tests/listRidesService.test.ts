const mockFindUnique = jest.fn();
const mockFindMany = jest.fn();
const mockDatabase = {
  driver: {
    findUnique: mockFindUnique,
  },
  ride: {
    findMany: mockFindMany,
  },
};

jest.mock('../src/server', () => mockDatabase);

import { invalidDriver, noRidesFound } from '../src/errors';
import listRidesService from '../src/services/listRidesService';

describe('listRidesService', () => {
  describe('when the searched driver has at least one ride', () => {
    it('should return the list of rides', async () => {
      mockFindUnique.mockResolvedValue(true);
      mockFindMany.mockResolvedValue(['ride_1']);

      const ridesList = listRidesService('1', 1);
      await expect(ridesList).resolves.toEqual(['ride_1']);
    });
  });

  describe('when the searched driver does not exist', () => {
    it('should return a driverNotFound error', async () => {
      mockFindUnique.mockResolvedValue(null);

      const error = listRidesService('1', 1);
      await expect(error).rejects.toEqual(invalidDriver);
    });
  });

  describe('when the driver has no rides registered', () => {
    it('should return a ridesFound error', async () => {
      mockFindUnique.mockResolvedValue(true);
      mockFindMany.mockResolvedValue([]);

      const error = listRidesService('1', 1);
      await expect(error).rejects.toEqual(noRidesFound);
    });
  });
});
