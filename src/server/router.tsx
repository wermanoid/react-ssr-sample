import React from 'react';
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
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

import env from '#env';
import configureStore from '#store';
import Routes from '#components/Routes';
import App from '#components/App';
import Html from './index.tmpl';

const renderApp = async ({ sheet, sheetsRegistry, store, history, client }): Promise<any> => {
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme({});
  const app = sheet.collectStyles((
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
  ));

  await getDataFromTree(app);

  return ({
    html: renderToString(app),
    sheetsRegistry,
    store,
    sheet,
    client
  });
}

const renderHtml = ({ html, sheet, sheetsRegistry, store, client }) => {
  const page = <Html
    content={html}
    styles={sheet.getStyleElement()}
    mStyles={sheetsRegistry.toString()}
    store={store.getState()}
    state={client.extract()}
  />;
  // return `<!doctype html>\n${renderToStaticMarkup(page)}`;
  return renderToNodeStream(page);
}

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
  try{
    const result = await renderApp({ sheet, sheetsRegistry, store, history, client });
    renderHtml(result).pipe(res);
  } catch(e) {
    console.log(e)
    res.status(500).end(`Something went wrong. Sorry!<br />${e.message}`);
  }
  // res.end(renderHtml(result));
};
