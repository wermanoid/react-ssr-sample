import cors from 'cors';

const corsOptions: cors.CorsOptions = {
  allowedHeaders: [
    'content-type',
    'authorization',
    'content-length',
    'x-requested-with',
    'accept',
    'origin',
  ],
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
};

export default cors(corsOptions);
