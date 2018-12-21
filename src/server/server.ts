import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import manifest from 'express-manifest-helpers';
import helmet from 'helmet';

import project from '#config/project';

import cors from './cors';
import router from './router';

const port = Number(process.env.PORT || 9000);
const host = String(process.env.HOST || 'localhost');
const environment = String(process.env.NODE_ENV || 'development');

export default (app: express.Express, logger: any) => {
  app.use(cors);
  app.use(helmet());
  app.use(bodyParser.json());
  app.get('/healthcheck', (rq, rs) => rs.json({ healthcheck: true }));
  app.use(manifest({ manifestPath: `${project.clientBuild}/manifest.json` }));
  app.use('/static', express.static(project.clientBuild));
  app.get('*', router);

  app.listen(port, host, () => {
    logger.info(`Running environment: ${chalk.cyan(environment)}`);
    logger.info(`Server running at: ${chalk.cyan(`http://${host}:${port}`)}`);
  });
};
