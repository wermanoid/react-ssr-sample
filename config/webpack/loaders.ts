import paths from '#config/paths';

const babelLoader = {
  test: /.js$/,
  loaders: ['babel-loader'],
  exclude: /node_modules/,
};

const typescriptLoader = {
  test: /.tsx?$/,
  loaders: ['awesome-typescript-loader'],
  exclude: /node_modules/,
  include: paths.src,
};

export default {
  oneOf: [
    babelLoader,
    typescriptLoader,
  ]
}
