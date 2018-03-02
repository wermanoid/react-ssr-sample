// tslint:disable: no-console
import server from './server';

const port = process.env.PORT || 9000;

server.listen(port);
console.log('Running environment:', process.env.NODE_ENV);
console.log(`Server running at: http://localhost:${port}`);
