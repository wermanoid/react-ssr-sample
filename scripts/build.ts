import * as rimraf from 'rimraf';
import webpack from 'webpack';
import config from '#config/webpack';
import paths from '#config/paths';
import { logMessage, compile } from './utils';

const { clientConfig, serverConfig } = config(
  process.env.NODE_ENV || 'production'
);

const execute = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  const compilers = webpack([clientConfig, serverConfig]);
  // const clientCompiler = compilers.compilers[0];
  // const serverCompiler = compilers.compilers[1];

  // const clientPromise = compile(clientCompiler);
  // const serverPromise = compile(serverCompiler);

  try {
    await Promise.all(compilers.compilers.map(compile))
    // await serverPromise;
    // await clientPromise;
    logMessage('Compilation finished successfully!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }
};

execute();
