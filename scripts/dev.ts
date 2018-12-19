import * as rimraf from 'rimraf';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import webpackConfig from '#config/webpack';
import project from '#config/project';
import server from '#server/server';

import { logMessage, compile } from './utils';

// const port = Number(process.env.PORT || 9000);

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
        ...client.entry.client
      ]
    }
  }
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
      }
    }),
  );

  app.use(webpackHotMiddleWare(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  server(app, {
    info: (...args: object[]) => console.log(...args),
  })
}


execute();