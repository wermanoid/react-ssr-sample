import project from './project';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config: App.Config = {
  api: '/graphql',
  port: process.env.PORT || 9000,
  host: process.env.PORT || 'http://localhost',
  env: process.env.NODE_ENV,
  paths: {
    build: {
      client: project.clientBuild,
      server: project.serverBuild,
    },
    source: {
      client: project.srcClient,
      server: project.srcServer,
    },
    public: project.publicPath,
  },
};

export default config;
