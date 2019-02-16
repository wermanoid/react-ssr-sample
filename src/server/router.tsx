import { NextFunction, Request, Response } from 'express';
import { join, map, pipe } from 'lodash/fp';
// import React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { renderApp } from './renderer';

const getScriptsTags = pipe(
  map(
    (file) =>
      `<script defer type="application/javascript" src="${file}"></script>`,
  ),
  join(''),
);

export default async (req: Request, res: Response, next: NextFunction) => {
  const assets = [
    res.locals.assetPath('manifest.js'),
    res.locals.assetPath('vendor.js'),
    res.locals.assetPath('client.js'),
  ];

  const scripts = getScriptsTags(assets);

  const { app, css } = renderApp();

  res.contentType('text/html');
  res.write(`
    <html lang="en">
      <head>
        <base href="/" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="react-root">`);

  const stream = renderToNodeStream(app);
  stream.pipe(
    res,
    { end: false },
  );
  stream.on('end', () => {
    res.end(`</div>
        <style id="jss-server-side">${css}</style>
        ${scripts}
      </body>
    </html>
    `);
  });
};
