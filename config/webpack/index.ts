export default (env = 'development') => {
  if (env === 'production') {
    process.env.NODE_ENV = 'production';
    return {
      client: require('./client.prod').default,
      server: require('./server.prod').default,
    };
  }

  process.env.NODE_ENV = 'development';
  return {
    client: require('./client.dev').default,
    server: require('./server.dev').default,
  };
};
