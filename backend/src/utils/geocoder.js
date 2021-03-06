import geocoder from 'node-geocoder';

// geocoder config
const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_KEY,
  formatter: null,
};
export default geocoder(options);
