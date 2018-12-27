import { HotModuleReplacementPlugin } from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';

import baseConfig from './client.base';

export default {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    ...baseConfig.plugins,
  ],
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
};
