// @flow
/* eslint react/jsx-filename-extension: 0, global-require:0 */

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// TODO: need initializer logic lately
const initial = {};

export default (initialState: Object = initial, history?: Object) => {
  let middleware = applyMiddleware(routerMiddleware(history));

  if (process.env.NODE_ENV === 'develop') {
    middleware = composeWithDevTools(middleware);
  }
  const store = history
    ? createStore(rootReducer, initialState, middleware)
    : createStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
