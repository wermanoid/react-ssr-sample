import React from 'react';
import Helmet from 'react-helmet';
import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { push, ConnectedRouter } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { getLoadableState } from 'loadable-components/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

import env from '#env';
import configureStore from '#store';
import Routes from '#components/Routes';
import App from '#components/App';

const stringify = (field, obj) =>
  `window.${field}=${JSON.stringify(obj).replace(/</g, '\\u003c')};`;

const renderApp = async ({ sheet, sheetsRegistry, store, history, client }): Promise<any> => {
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme({});
  const app = sheet.collectStyles(
    <div id="react-root">
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <ConnectedRouter history={history}>
                <Routes />
              </ConnectedRouter>
            </ApolloProvider>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </div>,
  );

  await getDataFromTree(app);

  return app;
};

export default async (req, res) => {
  const client = new ApolloClient({
    link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  store.dispatch(push(req.originalUrl));

  res.contentType('text/html');
  try {
    const app = await renderApp({
      sheet,
      sheetsRegistry,
      store,
      history,
      client,
    });
    const helmet = Helmet.renderStatic();
    res.write(`
     <html lang="en" ${helmet.htmlAttributes}>
       <head>
         ${helmet.title}
         ${helmet.meta}
       </head>
       <body ${helmet.bodyAttributes}>
   `);
   // @ts-ignore
    const stream = sheet.interleaveWithNodeStream(renderToNodeStream(app));
    stream.pipe(res, { end: false });
    stream.on('end', () =>
      res.end(`
         <style id="jss-server-side">${sheetsRegistry}</style>

         <script>${stringify('__APOLLO_STATE__', client.extract())}</script>
         <script>${stringify('__INITIAL_STATE__', store.getState())}</script>
         <script type="application/javascript" src="public/manifest.bundle.js"></script>
         <script type="application/javascript" src="public/vendor.bundle.js"></script>
         <script type="application/javascript" src="public/client.bundle.js"></script>
       </body>
     </html>
   `),
    );
  } catch (e) {
    console.log(e);
    res.status(500).end(`Something went wrong. Sorry!<br />${e.message}`);
  }
};
