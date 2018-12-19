/**
 * Common config to resolve project path aliases.
 * @module Webpack resolve config.
 */

const path = require('path');
const fs = require('fs');
const rootpath = fs.realpathSync(process.cwd());
const src = (dir) => path.join(rootpath, 'src', dir);

module.exports = {
  resolve: {
    alias: {
      '#config': path.join(rootpath, 'config'),
      '#server': src('server'),
      '#shared': src('shared'),
      '#client': src('client'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
};