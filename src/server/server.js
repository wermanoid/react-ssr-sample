import express from 'express';

import cors from './cors';
import router from './router';

const app = express();

app.use(cors);
app.get('*', router);

export default app;
