const mockFindUnique = jest.fn();
const mockCreate = jest.fn();
const mockDatabase = {
  driver: {
    findUnique: mockFindUnique,
  },
  ride: {
    create: mockCreate,
  },
};

jest.mock('../src/server', () => mockDatabase);

import { driverNotFound, invalidDistance } from '../src/errors';
import confirmRideService from '../src/services/confirmRideService';

describe('confirmRideService', () => {
  describe('when provided data is valid', () => {
    it('should return true', async () => {
      mockFindUnique.mockResolvedValue({ min_km: 5 });

      const error = confirmRideService(
        'origin',
        'destination',
        '1',
        10000,
        '10s',
        2,
        40.0
      );
      await expect(error).resolves.toEqual(true);
    });
  });

  describe('when driver is not found', () => {
    it('should return a driverNotFound error', async () => {
      mockFindUnique.mockResolvedValue(null);

      const error = confirmRideService(
        'origin',
        'destination',
        '1',
        4000,
        '10s',
        2,
        40.0
      );
      await expect(error).rejects.toEqual(driverNotFound);
    });
  });

  describe('when distance(m) is lesser than drivers min_km', () => {
    it('should return a invalidDistance error', async () => {
      mockFindUnique.mockResolvedValue({ min_km: 5 });

      const error = confirmRideService(
        'origin',
        'destination',
        '1',
        4000,
        '10s',
        2,
        40.0
      );
      await expect(error).rejects.toEqual(invalidDistance);
    });
  });
});
