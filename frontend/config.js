import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();
const API = config.PRODUCTION ? config.API_PRODUCTION : config.API_DEVELOPMENT;
const env = config.PRODUCTION;
export { API as default, env };
