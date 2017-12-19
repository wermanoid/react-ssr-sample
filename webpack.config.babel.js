import path from 'path';
import {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
  optimize,
} from 'webpack';
import HardSourcePlugin from 'hard-source-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import resolver from './webpack.config.resolve';

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

export default () => ({
  ...resolver,
  context: SRC_DIR,
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      ...(process.env.NODE_ENV !== 'production' && ['webpack-hot-middleware/client?reload=true']),
      `${SRC_DIR}/index.tsx`,
    ],
  },
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
    publicPath: '/public/',
  },
  module: {
    rules: [
      {
        test: /.(tsx)?$/,
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader',
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'develop',
    }),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new HardSourcePlugin(),
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    ...(process.env.NODE_ENV === 'analyze' && [new BundleAnalyzerPlugin()]),
  ],
});
