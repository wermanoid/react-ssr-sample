import fs from 'fs';
import path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const project = {
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  // dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  config: resolveApp('config'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  // srcShared: resolveApp('src/shared'),
  publicPath: '/static/',
};

export default project;
