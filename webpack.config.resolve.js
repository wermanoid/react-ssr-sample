/**
 * Common config to resolve project path aliases.
 * @module Webpack resolve config.
 */

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '#app': path.join(__dirname, 'src'),
      '#atom': path.join(__dirname, 'src/components/atom'),
      '#components': path.join(__dirname, 'src/components'),
      '#constants': path.join(__dirname, 'src/constants'),
      '#containers': path.join(__dirname, 'src/containers'),
      '#env': path.join(__dirname, 'src/environment'),
      '#hoc': path.join(__dirname, 'src/hoc'),
      '#molecule': path.join(__dirname, 'src/components/molecule'),
      '#organism': path.join(__dirname, 'src/components/organism'),
      '#page': path.join(__dirname, 'src/components/page'),
      '#public': path.join(__dirname, 'public'),
      '#store': path.join(__dirname, 'src/store'),
      '#template': path.join(__dirname, 'src/components/template'),
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
  },
};
