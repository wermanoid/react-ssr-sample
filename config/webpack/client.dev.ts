import { HotModuleReplacementPlugin } from 'webpack';
import baseConfig from './client.base';


export default {
  ...baseConfig,
  plugins: [ new HotModuleReplacementPlugin(), ...baseConfig.plugins],
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
};