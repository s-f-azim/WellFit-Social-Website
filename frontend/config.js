const API = process.env.NEXT_PUBLIC_API_URL;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

const STRIPE_KEY = process.env.STRIPE_KEY;
export { API as default, SOCKET_URL, STRIPE_KEY };
