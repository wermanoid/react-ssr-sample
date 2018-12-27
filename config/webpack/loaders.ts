import project from '../project';

const babelLoader = {
  test: /.jsx?$/,
  loaders: ['babel-loader'],
  exclude: /node_modules/,
  include: [project.src, project.config],
};

const typescriptLoader = {
  test: /.tsx?$/,
  loaders: ['awesome-typescript-loader'],
  exclude: /node_modules/,
  include: [project.src, project.config],
};

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoader = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile: false,
      },
    },
  ],
};

export default {
  client: {
    oneOf: [babelLoader, typescriptLoader, fileLoader, urlLoaderClient],
  },
  server: {
    oneOf: [babelLoader, typescriptLoader, fileLoader, urlLoaderServer],
  },
};
