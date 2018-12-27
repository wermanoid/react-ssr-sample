import project from '#config/project';
import config from '#config/webpack';
import * as rimraf from 'rimraf';
import webpack from 'webpack';

import { compile, logMessage } from './utils';

const { client, server } = config(process.env.NODE_ENV || 'production');

const execute = async () => {
  rimraf.sync(project.clientBuild);
  rimraf.sync(project.serverBuild);

  const compilers = webpack([client, server]);

  try {
    await Promise.all(compilers.compilers.map((c) => compile(c)));
    logMessage('Compilation finished successfully!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }
};

execute();
