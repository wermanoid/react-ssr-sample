/**
* Common config to resolve project path aliases.
* @module Webpack resolve config.
*/

const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@public': path.join(__dirname, 'public'),
      '@app': path.join(__dirname, 'src'),
      '@env': path.join(__dirname, 'src/environment'),
      '@cnt': path.join(__dirname, 'src/containers'),
      '@cmp': path.join(__dirname, 'src/components'),
      '@atom': path.join(__dirname, 'src/components/atom'),
      '@mol': path.join(__dirname, 'src/components/molecule'),
      '@org': path.join(__dirname, 'src/components/organism'),
      '@page': path.join(__dirname, 'src/components/page'),
      '@tmpl': path.join(__dirname, 'src/components/template'),
    },
  },
};
