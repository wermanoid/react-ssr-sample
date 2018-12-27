module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/env',
        {
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.12',
          },
        },
      ],
      '@babel/typescript',
      '@babel/react',
    ],
    plugins: [
      [
        'transform-imports',
        {
          '@material-ui/core': {
            transform: '@material-ui/core/${member}',
            preventFullImport: true,
          },
          'lodash/fp': {
            transform: 'lodash/fp/${member}',
            preventFullImport: true,
          },
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true,
          },
        },
      ],
      ['webpack-alias', { config: './config/webpack/resolvers.js' }],
      ['@babel/transform-runtime', { corejs: 2 }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    ignore: ['node_modules'],
    env: {
      production: {
        plugins: ['closure-elimination'],
      },
      server: {
        plugins: ['dynamic-import-node'],
      },
      client: {
        plugins: ['dynamic-import-webpack'],
      },
    },
  };
};
