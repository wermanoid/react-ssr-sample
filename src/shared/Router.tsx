import React from 'react';
import { hot } from 'react-hot-loader';
import { get } from 'lodash';

const App = () => <div>Router works {get({a:1}, 'a', 2)}</div>;

export default hot(module)(App)
