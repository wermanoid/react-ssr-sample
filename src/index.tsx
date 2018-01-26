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
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Routes from "#components/Routes";
import App from "#components/App";
import env from '#env';

import configureStore from "./store";

const theme = createMuiTheme({});
const history = createHistory();
const store = configureStore(window['__INITIAL_STATE__'], history);
const client = new ApolloClient({
  link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
  cache: new InMemoryCache().restore(window['__APOLLO_STATE__']),
  ssrForceFetchDelay: 100,
});

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      jssStyles.remove();
    }
    delete window['__INITIAL_STATE__'];
    delete window['__APOLLO_STATE__'];
  }

  render() {
    return this.props.children;
  }
}

const renderApp = (Component: any) => hydrate((
  <Main>
    <AppContainer>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Component />
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </AppContainer>
  </Main>),
  document.getElementById("react-root")
);


// <AppContainer>
//   <Provider store={store}>
//     <ApolloProvider client={client}>
//       <ConnectedRouter history={history}>
//         <Component />
//       </ConnectedRouter>
//     </ApolloProvider>
//   </Provider>
// </AppContainer>

renderApp(Routes);

if (process.env.NODE_ENV === "develop" && module.hot) {
  module.hot.accept("#components/Routes", () => {
    const NewApp = require("#components/Routes").default;
    renderApp(NewApp);
  });
}
