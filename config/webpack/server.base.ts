import path from 'path';
import nodeExternals from 'webpack-node-externals';

import project from '../project';
import loaders from './loaders';
import * as plugins from './plugins';
import resolvers from './resolvers';

export default {
  name: 'server',
  target: 'node',
  entry: {
    server: [path.resolve(project.srcServer, 'index.ts')],
  },
  externals: [nodeExternals()],
  output: {
    path: project.serverBuild,
    filename: 'index.js',
    publicPath: project.publicPath,
  },
  ...resolvers,
  module: {
    rules: [loaders.server],
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
