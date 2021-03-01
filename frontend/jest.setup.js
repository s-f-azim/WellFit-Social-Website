import "@testing-library/jest-dom/extend-expect";

jest.mock("next/config", () => () => ({ 
    publicRuntimeConfig: {
        APP_NAME: "instaFit",
        API_DEVELOPMENT: `http://localhost:4000/api`,
        API_PRODUCTION: `http://localhost:4000/api`,
        PRODUCTION: false,
    },
}));
