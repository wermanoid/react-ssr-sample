// @flow
/* eslint global-require: 0 */
import React from 'react';
import { Provider } from 'react-redux';
import { hydrate } from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import Routes from '#components/Routes';

import configureStore from './store';

const history = createHistory();
const store = configureStore({}, history);

const renderApp = (Component: React$Class) =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('react-root'),
  );

renderApp(Routes);

if (process.env.NODE_ENV === 'develop' && module.hot) {
  module.hot.accept('#components/Routes', () => {
    const NewApp = require('#components/Routes').default;
    renderApp(NewApp);
  });
}
