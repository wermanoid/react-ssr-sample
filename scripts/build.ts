import * as rimraf from 'rimraf';
import webpack, { ICompiler } from 'webpack';
import config from '#config/webpack';
import paths from '#config/paths';
import { logMessage, compilerPromise } from './utils';

const { clientConfig, serverConfig } = config(
  process.env.NODE_ENV || 'production'
);

const watchCompiler = (compiler: ICompiler) =>
  compiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      logMessage(stats.toString(clientConfig.stats), 'info');
      return;
    } else {
      logMessage(stats.toString(clientConfig.stats), 'error');
      logMessage(error.message, 'error');
    }
  });

const execute = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const compilers = webpack([clientConfig, serverConfig]);
  const clientCompiler = compilers.compilers[0];
  const serverCompiler = compilers.compilers[1];

  const clientPromise = compilerPromise(clientCompiler);
  const serverPromise = compilerPromise(serverCompiler);

  watchCompiler(clientCompiler);
  watchCompiler(serverCompiler);

  try {
    await serverPromise;
    await clientPromise;
    logMessage('Compilation finished successfully!', 'info');
    process.exit();
  } catch (error) {
    logMessage(error, 'error');
  }
};

execute();
