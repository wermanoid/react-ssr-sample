import server from './server';

const port = process.env.PORT || 8080;

server.listen(port);
console.log(`Server running at: http://localhost:${port}`);
