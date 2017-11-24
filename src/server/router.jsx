import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { Provider } from 'react-redux';
import Routes from '#components/Routes';
import configureStore from '#store';

import indexTemplate from './index.tmpl';

const store = configureStore();

export default (req, res) => {
  const context = {};
  const content = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    return res.end();
  }

  return res.end(indexTemplate(renderToString(content)));
};
