import 'reflect-metadata';
import express from 'express';
import runSsr from './server';

/**
 * Application SSR server
 */
const app: express.Express = express();
runSsr(app);
