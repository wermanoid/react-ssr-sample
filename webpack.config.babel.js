import path from 'path';
import resolver from './webpack.config.resolve';

const DIST_DIR = path.resolve(__dirname, 'dist');

export default () => ({
  ...resolver,
  entry: {
    app: ['./src/index.jsx']
  },
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
});
