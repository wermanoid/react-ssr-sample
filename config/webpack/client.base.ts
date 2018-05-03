import paths from '#config/paths';
import loaders from './loaders';
import resolvers from './resolvers';
import * as plugins from './plugins';

export default {
  name: 'client',
  target: 'web',
  entry: {
    bundle: ['@babel/polyfill', paths.resolve(paths.srcClient, 'index.tsx')],
  },
  output: {
    path: paths.clientBuild,
    filename: 'bundle.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: [loaders],
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
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
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
