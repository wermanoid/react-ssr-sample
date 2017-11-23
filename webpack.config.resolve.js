/**
* Common config to resolve project path aliases.
* @module Webpack resolve config.
*/

const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '#public': path.join(__dirname, 'public'),
      '#app': path.join(__dirname, 'src'),
      '#store': path.join(__dirname, 'src/store'),
      '#env': path.join(__dirname, 'src/environment'),
      '#containers': path.join(__dirname, 'src/containers'),
      '#components': path.join(__dirname, 'src/components'),
      '#atom': path.join(__dirname, 'src/components/atom'),
      '#molecule': path.join(__dirname, 'src/components/molecule'),
      '#organism': path.join(__dirname, 'src/components/organism'),
      '#page': path.join(__dirname, 'src/components/page'),
      '#template': path.join(__dirname, 'src/components/template'),
      '#constants': path.join(__dirname, 'src/constants'),
    },
  },
};
