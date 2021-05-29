/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const _ = require('lodash');
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const env = require('../env/dev');

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  // Add hot reloading in development
  entry: _.compact([
    'eventsource-polyfill', // Necessary for hot reloading with IE
    null, // process.env.BUILD ? null : 'webpack-hot-middleware/client?reload=true',
    path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
  ]),

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  // Add development plugins
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: 'app/index.ejs',
      templateParameters: env,
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  devServer: {
    stats: 'errors-only',
    historyApiFallback: true,
  },

  performance: {
    hints: false,
  },
});
