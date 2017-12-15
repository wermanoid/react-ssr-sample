import path from 'path';
import {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  EnvironmentPlugin,
  optimize,
} from 'webpack';
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
      ...(process.env.NODE_ENV !== 'production' && ['webpack-hot-middleware/client?reload=true']),
      `${SRC_DIR}/index.jsx`,
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
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'develop',
    }),
    new NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    // new optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity,
    // }),
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
