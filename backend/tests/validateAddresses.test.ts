import { validateAddresses } from '../src/utils';
import { invalidDataError } from '../src/errors';

describe('validateAddresses', () => {
  describe('when addresses provided are not equal after processing', () => {
    it('should return true', () => {
      const validation = validateAddresses('address_1', 'address_2');
      expect(validation).toBe(true);
    });
  });

  // Note: The processing involves removing white spaces, accents and case
  describe('when addresses provided are equal after processing', () => {
    it('should return an invalidDataError', () => {
      expect.assertions(1);

      try {
        validateAddresses('address_1', 'ÁDDR ESS_1');
      } catch (err) {
        expect(err).toEqual(invalidDataError);
      }
    });
  });
});
