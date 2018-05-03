import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import manifest from 'express-manifest-helpers';
import paths from '#config/paths';

import cors from './cors';
import router from './router';

const port = Number(process.env.PORT || 9000);
const host = String(process.env.HOST || 'localhost');
const environment = String(process.env.NODE_ENV || 'development');

/**
 * Application SSR server
 */
const app: express.Express = express();

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.get('/static/manifest.json', (req, res) => {
  console.log('here', req.url);
  res.redirect('http://localhost:9000/static/manifest.json');
})
app.use(manifest({ manifestPath: `${paths.clientBuild}/manifest.json` }));
app.get('*', router);

app.listen(port, host, () => {
  console.log('Running environment:', chalk.cyan(environment));
  console.log('Server running at:', chalk.cyan(`http://${host}:${port}`));
});

export default app;
