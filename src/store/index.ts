/**
 * provides redux store configuration method with hot reload on DEV env
 * @module 'store/index'
 */
import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '#store/reducers';

const initial = {};

/**
 * create configured redux store
 * @param  initialState object to initialize store with
 * @param  history      redux router history middleware
 * @return              configured store
 */
const configure = (initialState: object = initial, history: History): Store<{}> => {
  let middleware = history && applyMiddleware(routerMiddleware(history), thunk);

  if (middleware && process.env.NODE_ENV === 'develop') {
    middleware = composeWithDevTools(middleware);
  }
  const store = history
    ? createStore(rootReducer, initialState, middleware)
    : createStore(rootReducer, initialState);

  if (process.env.NODE_ENV === 'develop' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default configure;
