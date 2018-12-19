
import React from 'react';
import { map, pipe, join } from 'lodash/fp';
import { renderToNodeStream } from 'react-dom/server';
import { Request, Response, NextFunction } from 'express';

import Application from '#shared/Router';

export default async (req: Request, res: Response, next: NextFunction) => {
  const assets = [
    res.locals.assetPath('manifest.js'),
    res.locals.assetPath('client.js'),
    res.locals.assetPath('vendor.js'),
  ];

  const scripts = pipe(
    map(file => `<script type="application/javascript" src="${file}"></script>`),
    join('')
  )(assets);

  const app = (
    <div id="react-root">
      <Application />
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