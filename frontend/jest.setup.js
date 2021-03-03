import "@testing-library/jest-dom/extend-expect";

jest.mock("next/config", () => () => ({ 
    publicRuntimeConfig: {
        APP_NAME: "instaFit",
        API_DEVELOPMENT: `http://localhost:4000/api`,
        API_PRODUCTION: `http://localhost:4000/api`,
        PRODUCTION: false,
    },
}));

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
