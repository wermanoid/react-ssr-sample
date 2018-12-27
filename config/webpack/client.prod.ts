import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import baseConfig from './client.base';

const analyze = process.env!.ANALYZE ? [new BundleAnalyzerPlugin()] : [];

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: '[name].bundle.[hash:8].js',
  },
  mode: 'production',
  plugins: [...baseConfig.plugins, ...analyze],
  devtool: false,
  optimization: {
    ...baseConfig.optimization,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
    usedExports: true,
    sideEffects: true,
  },
};
