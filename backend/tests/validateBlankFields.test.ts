import { validateBlankFields } from '../src/utils';
import { invalidDataError } from '../src/errors';

describe('validateBlankFields', () => {
  describe('when arguments provided are not empty strings', () => {
    it('should return true', () => {
      const validation = validateBlankFields(
        'userId',
        'origin',
        'destination'
      );

      expect(validation).toBe(true);
    });
  });

  describe('when any of the arguments is an empty string', () => {
    it('should return an invalidDataError', () => {
      expect.assertions(1);

      try {
        validateBlankFields('', 'origin', 'destination');
      } catch (err) {
        expect(err).toEqual(invalidDataError);
      }
    });
  });
});
