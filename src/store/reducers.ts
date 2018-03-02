/**
 * reducers.ts
 * prepare reducers to allow create store
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * prepared reducers
 * @type {Reducer<{}>}
 */
export default combineReducers({ router: routerReducer });
