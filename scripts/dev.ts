import config from 'config';
import express from 'express';
import { find } from 'lodash/fp';
import nodemon from 'nodemon';
import * as rimraf from 'rimraf';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import webpackConfig from '#config/webpack';
import cors from '#server/cors';
import { compileAndWatch, compilerPromise, logMessage } from './utils';

// console.log(config);
const { build, public: publicPath } = config.get<App.Config['paths']>('paths');
const host = config.get('host');
const port = config.get('port');
const webpackPort = Number(port) + 1;

const app = express();
app.use(cors);

const start = async () => {
  rimraf.sync(build.client);
  rimraf.sync(build.server);

  const { client, server } = webpackConfig(
    config.get<'development' | 'production'>('env'),
  );

  try {
    const clientConfig = {
      ...client,
      entry: {
        ...client.entry,
        client: [
          `webpack-hot-middleware/client?path=${host}:${webpackPort}/__webpack_hmr&timeout=20000`,
          ...client.entry.client,
        ],
      },
    };

    clientConfig.output.hotUpdateMainFilename =
      'updates/[hash].hot-update.json';
    clientConfig.output.hotUpdateChunkFilename =
      'updates/[id].[hash].hot-update.js';

    clientConfig.output.publicPath = [`${host}:${webpackPort}`, publicPath]
      .join('/')
      .replace(/([^:+])\/+/g, '$1/');

    server.output.publicPath = [`${host}:${webpackPort}`, publicPath]
      .join('/')
      .replace(/([^:+])\/+/g, '$1/');

    const multi = webpack([clientConfig, server]);
    const clientCompiler = find({ name: 'client' }, multi.compilers)!;
    const serverCompiler = find({ name: 'server' }, multi.compilers)!;

    const watchOptions = {
      // poll: true,
      ignored: /node_modules/,
      stats: clientConfig.stats,
    };

    app.use(
      webpackDevMiddleware(clientCompiler, {
        watchOptions,
        stats: clientConfig.stats,
        publicPath: clientConfig.output.publicPath,
      }),
    );

    app.use(
      webpackHotMiddleWare(clientCompiler, {
        log: logMessage,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      }),
    );

    app.use(publicPath, express.static(build.client));

    app.listen(webpackPort);

    compileAndWatch(serverCompiler, watchOptions);

    await Promise.all([
      compilerPromise('client', clientCompiler),
      compilerPromise('server', serverCompiler),
    ]);
  } catch (e) {
    logMessage(e, 'error');
  }

  const script = nodemon({
    ...require('../nodemon.json'),
    script: `${build.server}/index.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'dist/client'],
    watch: [`${build.server}/index.js`],
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    logMessage('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });

  logMessage('Finished');
};

start();
