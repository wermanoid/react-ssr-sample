import path from 'path';
import {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
  optimize,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyPlugin from 'uglifyjs-webpack-plugin';
import resolver from './webpack.config.resolve';

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

export default () => ({
  ...resolver,
  context: SRC_DIR,
  target: 'web',
  devtool: process.env.NODE_ENV !== 'production' ? 'cheap-module-eval-source-map' : '',
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
    ...(process.env.NODE_ENV === 'production' && [new UglifyPlugin()]),
  ],
});
