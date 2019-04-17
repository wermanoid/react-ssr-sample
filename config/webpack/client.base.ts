import path from 'path';
import project from '../project';
import loaders from './loaders';
import * as plugins from './plugins';
import resolvers from './resolvers';

export default {
  name: 'client',
  target: 'web',
  entry: {
    client: [path.resolve(project.srcClient, 'index.tsx')],
  },
  output: {
    path: project.clientBuild,
    filename: '[name].bundle.js',
    publicPath: project.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [loaders.client],
  },
  ...resolvers,
  plugins: [...plugins.client, ...plugins.shared],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
};
