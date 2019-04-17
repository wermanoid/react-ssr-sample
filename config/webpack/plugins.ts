import { CheckerPlugin } from 'awesome-typescript-loader';
import { EnvironmentPlugin, NamedModulesPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ManifestPlugin from 'webpack-manifest-plugin';

const client = [
  new EnvironmentPlugin({
    BABEL_ENV: 'client',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
  new NamedModulesPlugin(),
  ...(process.env!.ANALYZE
    ? [new BundleAnalyzerPlugin({ analyzerPort: 4000 })]
    : []),
];

const server = [
  new EnvironmentPlugin({
    BABEL_ENV: 'server',
  }),
];

const shared = [new CheckerPlugin()];

export { client, server, shared };
