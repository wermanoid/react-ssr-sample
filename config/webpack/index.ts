export default (env = 'development') => {
  if (env === 'development' || env === 'dev') {
    process.env.NODE_ENV = 'development';
    return {
      clientConfig: require('./client.dev').default,
      serverConfig: require('./server.dev').default,
    };
  }
  process.env.NODE_ENV = 'production';
  return {
    clientConfig: require('./client.prod').default,
    serverConfig: require('./server.prod').default,
  }
};
