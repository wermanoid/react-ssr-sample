module.exports = api => {
  api.cache(true);
  return {
    sourceType: 'unambiguous',
    compact: true,
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: '8.14',
          },
        },
      ],
      '@babel/typescript',
      ['@babel/react', { development: process.env.NODE_ENV !== 'production' }],
      [
        '@emotion/babel-preset-css-prop',
        {
          autoLabel: true,
          labelFormat: '[local]',
        },
      ],
    ],
    plugins: [
      'react-hot-loader/babel',
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
      ['@babel/transform-runtime', { corejs: 3 }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      production: {
        plugins: ['closure-elimination'],
      },
      development: {
        plugins: [['emotion', { sourceMap: true }]],
      },
    },
  };
};
