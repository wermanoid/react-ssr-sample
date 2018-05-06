import React from 'react';
import { map } from 'lodash';
import { renderToNodeStream } from 'react-dom/server';

import { Request, Response, NextFunction } from 'express';

import App from '#shared';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (/^\/static\//.test(req.url)) return next();

  const assets = [
    res.locals.assetPath('bundle.js'),
    res.locals.assetPath('vendor.js'),
  ];

  const scripts = map(
    assets,
    (x) => `<script type="application/javascript" src="${x}"></script>`
  ).join('');

  const app = (
    <div id="react-root">
      <App />
    </div>
  );

  res.contentType('text/html');
  res.write(`
     <html lang="en">
       <head></head>
       <body>
   `);

  const stream = renderToNodeStream(app);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.end(`
       ${scripts}
       </body>
     </html>
     `);
  });
};
