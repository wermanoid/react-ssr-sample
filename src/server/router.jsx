import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
// import App from '#components/App';
import Routes from '#components/Routes';

export default (req, res) => {
  // console.log(req.url);
  // if (req.url !== '/') {
  //   return res.status(404).end('Not found.');
  // }
  // const html = renderToString(<App />);
  const context = {};
  const content = (
    <StaticRouter location={req.url} context={context}>
      <Routes />
    </StaticRouter>
  );
  const html = renderToString(content);

  const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-root">${html}</div>
        <script type="application/javascript" src="main.bundle.js"></script>
      </body>
    </html>
  `;
  return res.end(HTML);
};
