import { CheckerPlugin } from 'awesome-typescript-loader';
import { EnvironmentPlugin, NamedModulesPlugin } from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

const client = [
  new EnvironmentPlugin({
    BABEL_ENV: 'client',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
  new NamedModulesPlugin(),
];

const server = [
  new EnvironmentPlugin({
    BABEL_ENV: 'server',
  }),
];

const shared = [new CheckerPlugin()];

export { client, server, shared };
