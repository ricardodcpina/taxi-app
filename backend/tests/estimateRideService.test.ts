const mockFindMany = jest.fn();

import { invalidDataError } from '../src/errors';

import estimateRideService from '../src/services/estimateRideService';
import generateRouteService from '../src/services/generateRouteService';
import geoCodingService from '../src/services/geoCodingService';

jest.mock('../src/services/geoCodingService');
jest.mock('../src/services/generateRouteService');
jest.mock('../src/server', () => ({
  driver: {
    findMany: mockFindMany,
  },
}));

describe('estimateRideService', () => {
  describe('when place data from origin and destination are equal', () => {
    it('should return an invalidDataError', async () => {
      (geoCodingService as jest.Mock).mockResolvedValue(
        'somePlaceId'
      );
      const error = estimateRideService('address_1', 'address_1');

      await expect(error).rejects.toEqual(invalidDataError);
    });
  });
});
