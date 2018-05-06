import nodeExternals from 'webpack-node-externals';
import paths from '#config/paths';

import loaders from './loaders';
import resolvers from './resolvers';
import * as plugins from './plugins';

export default {
  name: 'server',
  target: 'node',
  entry: {
    server: ['@babel/polyfill', paths.resolve(paths.srcServer, 'index.ts')],
  },
  externals: [nodeExternals()],
  output: {
    path: paths.serverBuild,
    filename: 'index.js',
    publicPath: paths.publicPath,
  },
  ...resolvers,
  module: {
    rules: [loaders],
  },
  plugins: [...plugins.shared, ...plugins.server],
  stats: {
    colors: true,
  },
  node: {
    __filename: false,
    __dirname: false,
  },
};
