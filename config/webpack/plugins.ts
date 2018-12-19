import { DefinePlugin, NamedModulesPlugin } from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import ManifestPlugin from 'webpack-manifest-plugin';

const client = [
  new DefinePlugin({
    BABEL_ENV: 'client',
    __SERVER__: 'false',
    __BROWSER__: 'true',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
  new NamedModulesPlugin(),
];

const server = [
  new DefinePlugin({
    BABEL_ENV: 'server',
  }),
];

const shared = [
  new CheckerPlugin(),
];

export { client, server, shared };