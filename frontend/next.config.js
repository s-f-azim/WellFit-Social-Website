/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
// const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const withLess = require('@zeit/next-less');
const withSass = require('@zeit/next-sass');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(fs.readFileSync('./styles/antd-custom.less', 'utf8'));

const plugins = [
  [
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
      webpack: (config, { isServer }) => {
        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === 'function') {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === 'function' ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: 'null-loader',
          });
        }

        // const builtInLoader = config.module.rules.find((rule) => {
        //   if (rule.oneOf) {
        //     return (
        //       rule.oneOf.find((deepRule) => {
        //         return deepRule.test && deepRule.test.toString().includes('/a^/');
        //       }) !== undefined
        //     );
        //   }
        //   return false;
        // });

        // if (typeof builtInLoader !== 'undefined') {
        //   config.module.rules.push({
        //     oneOf: [
        //       ...builtInLoader.oneOf.filter((rule) => {
        //         return (rule.test && rule.test.toString().includes('/a^/')) !== true;
        //       }),
        //     ],
        //   });
        // }

        config.resolve.alias['@'] = path.resolve(__dirname);
        return config;
      },
    }),
  ],
  withImages,
  withCSS,
  withSass,
];
module.exports = withPlugins(plugins);
