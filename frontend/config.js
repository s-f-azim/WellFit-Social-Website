const API =
  process.env.ENVIRONMENT === 'Production'
    ? process.env.API_PRODUCTION
    : process.env.API_DEVELOPMENT;
const SOCKET_URL = 'ws://localhost:4000';
// process.env.ENVIRONMENT === 'Production'
//   ? process.env.SOCKET_URL_PRODUCTION
//   : process.env.NEXT_PUBLIC_SOCKET_URL_DEV;

const STRIPE_KEY = process.env.STRIPE_KEY;
export { API as default, SOCKET_URL, STRIPE_KEY };
