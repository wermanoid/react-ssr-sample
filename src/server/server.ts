import express from 'express';
import manifest from 'express-manifest-helpers';
import paths from '#config/paths';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import chalk from 'chalk';

import cors from './cors';
import router from './router';

const port = Number(process.env.PORT || 9000);
const host = String(process.env.HOST || 'localhost');
const environment = String(process.env.NODE_ENV || 'development');

export default (app: express.Express) => {
  app.enable('strict routing');
  app.use(cors);
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(manifest({ manifestPath: `${paths.clientBuild}/manifest.json` }));
  app.use(paths.publicPath, express.static(paths.clientBuild));
  app.get('*', router);

  app.listen(port, host, () => {
    console.log('Running environment:', chalk.cyan(environment));
    console.log('Server running at:', chalk.cyan(`http://${host}:${port}`));
  });
}
