import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// TODO: need initializer logic lately
const initial = {};

export default (initialState: any = initial, history?: any) => {
  let middleware = history && applyMiddleware(routerMiddleware(history));

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
