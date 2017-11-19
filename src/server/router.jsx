import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../components/App';

export default (req, res) => {
  console.log(req.url);
  if (req.url !== '/') {
    return res.status(404).end('Not found.');
  }
  const html = renderToString(<App />);
  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-view">${html}</div>
        <script type="application/javascript" src="main.bundle.js"></script>
      </body>
    </html>
  `;
  return res.end(HTML);
};
