import project from '../project';

const babelLoader = {
  test: /.js$/,
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
  oneOf: [babelLoader, typescriptLoader, fileLoader],
};