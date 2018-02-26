/* eslint global-require: 0 */
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { ConnectedRouter } from 'react-router-redux';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createHistory from 'history/createBrowserHistory';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Routes from '#components/Routes';
import App from '#components/App';
import Main from '#components/Root';
import env from '#env';

import configureStore from './store';

const theme = createMuiTheme({});
const history = createHistory();
const store = configureStore(window['__INITIAL_STATE__'], history);
const client = new ApolloClient({
  link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
  cache: new InMemoryCache().restore(window['__APOLLO_STATE__']),
  ssrForceFetchDelay: 100,
});


const renderApp = (Component: any) =>
  hydrate(
    <Main>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Component />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </Main>,
    document.getElementById('react-root'),
  );

renderApp(Routes);

// if (process.env.NODE_ENV === "develop" && module.hot) {
//   module.hot.accept("#components/Routes", () => {
//     const newRoutes = require("#components/Routes").default;
//     renderApp(newRoutes);
//   });
// }
