import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { Request, Response, NextFunction } from 'express';

import App from '#shared';

export default async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url)
  if (/^\/static\//.test(req.url)) return next();

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
       ${[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]
         .map(
           (x) => `<script type="application/javascript" src="${x}"></script>`
         )
         .join('')}
       </body>
     </html>
     `);
  });
};
