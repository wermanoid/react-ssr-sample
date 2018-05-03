import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

/**
 * Define all required path resolutions
 * and re-export some helpers methods
 */
const paths = {
  resolve: path.resolve,
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  config: resolveApp('config'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcShared: resolveApp('src/shared'),
  publicPath: '/static/',
  get resolveModules() {
    return [
      paths.srcClient,
      paths.srcServer,
      paths.srcShared,
      paths.src,
      'node_modules',
    ];
  },
};

export default paths;
