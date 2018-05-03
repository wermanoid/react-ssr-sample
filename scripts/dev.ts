import * as rimraf from 'rimraf';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import config from '#config/webpack';
import paths from '#config/paths';
import app from '#server';

rimraf.sync(paths.clientBuild);
rimraf.sync(paths.serverBuild);

app.use(paths.publicPath, express.static(paths.clientBuild));
app.use('/favicon.ico', (req, res) => {
  res.send('');
});

const { clientConfig } = config(process.env.NODE_ENV || 'development');
const port = Number(process.env.PORT || 9000);

clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
clientConfig.output.hotUpdateChunkFilename =
  'updates/[id].[hash].hot-update.js';
clientConfig.output.publicPath = [`http://localhost:${port}`, paths.publicPath]
  .join('/')
  .replace(/([^:+])\/+/g, '$1/');

const compiler = webpack(clientConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: paths.publicPath,
    stats: clientConfig.stats,
  })
);
app.use(webpackHotMiddleWare(compiler));
