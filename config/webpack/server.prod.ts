import baseConfig from './server.dev';

export default {
  ...baseConfig,
  mode: 'production',
  devtool: false,
};
