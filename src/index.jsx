// @flow
/* eslint global-require: 0 */
import React from 'react';
import { hydrate } from 'react-dom';

import App from '#components/App';

hydrate(<App />, document.getElementById('react-root'));

if (process.env.NODE_ENV === 'develop' && module.hot) {
  console.warn('hot reload enabled', process.env.NODE_ENV, module.hot);
  module.hot.accept('#components/App', () => {
    const NewApp = require('#components/App').default;
    hydrate(<NewApp />, document.getElementById('react-root'));
  });
}
