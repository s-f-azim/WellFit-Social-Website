import { jest } from '@jest/globals';

import geocoder from './src/utils/geocoder.js';

jest.spyOn(geocoder, 'geocode').mockImplementation(() => [
  {
    latitude: 51.511612,
    longitude: -0.116253,
    formattedAddress: 'London WC2R 2LS, United Kingdom',
    city: 'London',
    zipcode: 'WC2R 2LS',
    countryCode: 'gb',
  },
]);
