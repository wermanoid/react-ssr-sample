import { DefinePlugin } from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import ManifestPlugin from 'webpack-manifest-plugin';

const client = [
  new DefinePlugin({
    __SERVER__: 'false',
    __CLIENT__: 'true',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
];

const server = [
  new DefinePlugin({
        __SERVER__: 'true',
        __CLIENT__: 'false',
    }),
];

const shared = [
  new CheckerPlugin(),
];

export { client, server, shared };
