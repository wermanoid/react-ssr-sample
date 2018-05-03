import { HotModuleReplacementPlugin } from 'webpack';
import baseConfig from './server.base';

export default {
  ...baseConfig,
  plugins: [new HotModuleReplacementPlugin(), ...baseConfig.plugins],
  mode: 'development',
  performance: {
    hints: false,
  },
};
