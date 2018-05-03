import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import chalk from 'chalk';

import cors from './cors';

const port = Number(process.env.PORT || 9000);
const host = String(process.env.HOST || 'localhost');
const environment = String(process.env.NODE_ENV || 'development');

const app = express();

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (rq, rs) => { rs.end('data to show')});

app.listen(port, host, () => {
  console.log('Running environment:', chalk.cyan(environment));
  console.log('Server running at:', chalk.cyan(`http://${host}:${port}`));
});
