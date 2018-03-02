/**
 * src/index.ts
 * app client side entry point
 */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ConnectedRouter } from 'react-router-redux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import env from '#env';
import configureStore from '#store';
import Routes from '#components/Routes';

const theme = createMuiTheme({});
const history = createHistory();
const store = configureStore(window.__INITIAL_STATE__, history);
const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({ fetch, uri: env.apolloServerUrl }),
  ssrForceFetchDelay: 100,
});

/**
 * renderApp hydrates application after SSR return page
 * @param  Component root component to render
 */
const renderApp = (Component: React.ComponentType): void => {
  hydrate(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Component />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('react-root'),
  );
};

renderApp(Routes);
