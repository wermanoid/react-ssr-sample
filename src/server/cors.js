export default (req, res, next) => {
  const heads =
    'content-type, authorization, content-length, x-requested-with, accept, origin';
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', heads);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};
