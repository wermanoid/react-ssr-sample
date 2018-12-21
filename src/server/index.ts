import express from 'express';

import server from './server';

const app = express();

const { log } = console;

server(app, {
  info: (...args: object[]) => log(...args),
});
