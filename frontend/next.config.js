const withLess = require("@zeit/next-less");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js");
var fs = require("fs");
const path = require("path");

const variables = "./styles/variables.scss";
const antVars = fs.readFileSync(variables, "utf8");
const sass = antVars.replace(/\$/gi, "@");
const sassVars = lessToJS(sass);

const nextConfig = {
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: sassVars,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader",
      });
    }

    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["store"] = path.join(__dirname, "redux");
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["containers"] = path.join(__dirname, "containers");
    return config;
  },
  publicRuntimeConfig: {
    APP_NAME: "instaFit",
    API_DEVELOPMENT: `http://localhost:4000/api`,
    API_PRODUCTION: `http://localhost:4000/api`,
    PRODUCTION: false,
  },
};
module.exports = withPlugins(
  [withSass, withImages, withLess, withCss],
  nextConfig
);