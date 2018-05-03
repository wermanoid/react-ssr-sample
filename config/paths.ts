import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const paths = {
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
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

// paths.resolveModules = [
//     paths.srcClient,
//     paths.srcServer,
//     paths.srcShared,
//     paths.src,
//     'node_modules',
// ];

export default paths;
