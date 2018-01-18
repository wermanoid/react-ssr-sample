/* eslint global-require: 0 */
import React from "react";
import { Provider } from "react-redux";
import { hydrate } from "react-dom";
import { ConnectedRouter } from "react-router-redux";
import { AppContainer } from "react-hot-loader";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import BrowserRouter from 'react-router-dom/BrowserRouter';

import createHistory from "history/createBrowserHistory";
import Routes from "#components/Routes";
import env from '#env';

import configureStore from "./store";

const history = createHistory();
const store = configureStore(window['__INITIAL_STATE__'], history);

const client = new ApolloClient({
  link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
  cache: new InMemoryCache().restore(window['__APOLLO_STATE__']),
});

const renderApp = (Component: any) => hydrate(
  <AppContainer>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </ApolloProvider>
    </Provider>
  </AppContainer>,
  document.getElementById("react-root")
);

renderApp(Routes);

if (process.env.NODE_ENV === "develop" && module.hot) {
  module.hot.accept("#components/Routes", () => {
    const NewApp = require("#components/Routes").default;
    renderApp(NewApp);
  });
}
