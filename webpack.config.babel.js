import path from 'path';
import {
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  EnvironmentPlugin,
} from 'webpack';
import resolver from './webpack.config.resolve';

const DIST_DIR = path.resolve(__dirname, 'dist');

export default () => ({
  ...resolver,
  entry: [
    // 'webpack-dev-server/client?http://127.0.0.1:8080/',
    // 'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?reload=true',
    './src/index.jsx',
  ],
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
    publicPath: '/',
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
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
  ],
});
