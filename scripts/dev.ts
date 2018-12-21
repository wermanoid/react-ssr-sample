import express from 'express';
import * as rimraf from 'rimraf';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import project from '#config/project';
import webpackConfig from '#config/webpack';
import server from '#server/server';

import { compile, logMessage } from './utils';

const { log } = console;

const execute = async () => {
  rimraf.sync(project.clientBuild);
  rimraf.sync(project.serverBuild);

  const { client } = webpackConfig(process.env.NODE_ENV);

  const clientConfig = {
    ...client,
    entry: {
      ...client.entry,
      client: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        '@babel/polyfill',
        ...client.entry.client,
      ],
    },
  };
  const compiler = webpack(clientConfig);

  await compile(compiler);
  logMessage('Compilation finished successfully!', 'info');

  const app = express();

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: project.publicPath,
      stats: clientConfig.stats,
      watchOptions: {
        ignored: /node_modules/,
      },
    }),
  );

  app.use(
    webpackHotMiddleWare(compiler, {
      log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    }),
  );

  server(app, {
    info: (...args: object[]) => log(...args),
  });
};

execute();
