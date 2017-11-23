import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { Provider } from 'react-redux';
import App from '#components/App';
import Routes from '#components/Routes';
import configureStore from '#store';

const store = configureStore();

export default (req, res) => {
  const context = {};
  const content = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App>
          <Routes />
        </App>
      </StaticRouter>
    </Provider>
  );
  const html = renderToString(content);

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    return res.end();
  }

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
