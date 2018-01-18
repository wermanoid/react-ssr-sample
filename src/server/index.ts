import server from './server';

const port = process.env.PORT || 9000;

server.listen(port);
console.log(`Server running at: http://localhost:${port}`); // eslint-disable-line
