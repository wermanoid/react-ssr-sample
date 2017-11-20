import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import cors from './cors';
import router from './router';
import config from '../../webpack.config.babel';

const webapckConfig = config();
const compiler = webpack(webapckConfig);
const app = express();

app.use(cors);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webapckConfig.output.publicPath,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
}));
app.use(express.static(path.resolve(__dirname, 'src')));
app.use(webpackHotMiddleWare(compiler));
app.get('*', router);

export default app;
