import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();
const API = config.PRODUCTION ? config.API_PRODUCTION : config.API_DEVELOPMENT;

export { API as default };
