import * as rimraf from 'rimraf';
import webpack, { Compiler } from 'webpack';
import config from '#config/webpack';
import paths from '#config/paths';
import { logMessage, compilerPromise } from './utils';

const { clientConfig } = config(process.env.NODE_ENV || 'production');

const execute = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const compilers = webpack([clientConfig]);
  const clientCompiler = compilers.compilers[0] as Compiler;

  const clientPromise = compilerPromise(clientCompiler);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      logMessage(stats.toString(clientConfig.stats), 'info');
      return;
    }
  });

  try {
    await clientPromise;
    logMessage('Done!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

execute();
