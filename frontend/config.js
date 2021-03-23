import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();
const API = config.PRODUCTION ? config.API_PRODUCTION : config.API_DEVELOPMENT;
const SOCKET_URL = config.PRODUCTION ? config.SOCKET_URL_PRODUCTION : config.SOCKET_URL_DEV;
const env = config.PRODUCTION;
const STRIPE_KEY = config.STRIPE_KEY;
export { API as default, env, SOCKET_URL, STRIPE_KEY };
