import * as path from 'path';
import express from 'express';
import webpack from 'webpack';
import helmet from 'helmet';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';

import cors from './cors';
import router from './router';
import config from '../../webpack.config.babel';

const app = express();

app.use(cors);
app.use(helmet());

if (process.env.NODE_ENV === 'develop') {
  const [webapckConfig] = config();
  const compiler = webpack(webapckConfig);
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
  app.use(webpackHotMiddleWare(compiler));
}

app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.get('*', router);

export default app;
