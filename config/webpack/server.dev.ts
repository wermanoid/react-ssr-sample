import { HotModuleReplacementPlugin } from 'webpack';
import WriteFileWebpackPlugin from 'write-file-webpack-plugin';

import baseConfig from './server.base';

export default {
  ...baseConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    ...baseConfig.plugins,
    new HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  performance: {
    hints: false,
  },
};
