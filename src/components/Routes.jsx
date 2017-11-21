// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import App from '#components/App';
import Home from '#page/Home';
import Sample from '#page/Sample';

const Routes = () => (
  <App>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/sample" component={Sample} />
  </App>
);

export default Routes;
