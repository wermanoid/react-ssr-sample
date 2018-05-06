import * as rimraf from 'rimraf';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import config from '#config/webpack';
import paths from '#config/paths';
import runSsr from '#server/server';

import { logMessage, compile } from './utils';

const port = Number(process.env.PORT || 9000);
const environment = String(process.env.NODE_ENV || 'development');

const execute = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const { clientConfig } = config(environment);

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];
  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename =
    'updates/[id].[hash].hot-update.js';
  clientConfig.output.publicPath = [
    `http://localhost:${port}`,
    paths.publicPath,
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  const compiler = webpack(clientConfig);
  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  try {
    await compile(compiler);
    logMessage('Compilation finished successfully!', 'info');

    const app = express();
    app.use(paths.publicPath, express.static(paths.clientBuild));
    app.use('/favicon.ico', (req, res) => {
      res.send('');
    });
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: clientConfig.output.publicPath,
        stats: clientConfig.stats,
        watchOptions,
      })
    );
    app.use(webpackHotMiddleWare(compiler));
    runSsr(app);
  } catch (error) {
    logMessage(error, 'error');
  }
};

execute();
