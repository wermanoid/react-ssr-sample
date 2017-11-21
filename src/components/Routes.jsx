// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '#page/Home';
import Sample from '#page/Sample';
import NotFound from '#page/NotFound';
import App from './App';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/sample" component={Sample} />
      <Route component={NotFound} />
    </Switch>
  </App>
);

export default Routes;
