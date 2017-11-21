// @flow
/* eslint global-require: 0 */
import React from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Routes from '#components/Routes';

const renderApp = (Component: React$Class) =>
  hydrate(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('react-root'),
  );

renderApp(Routes);

if (process.env.NODE_ENV === 'develop' && module.hot) {
  module.hot.accept('#components/Routes', () => {
    const NewApp = require('#components/Routes').default;
    renderApp(NewApp);
  });
}
