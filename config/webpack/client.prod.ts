import baseConfig from './client.base';

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: '[name].bundle.[hash:8].js',
  },
  mode: 'production',
  devtool: false,
};
