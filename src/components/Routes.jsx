// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from '#page/Home';
import Sample from '#page/Sample';
import NotFound from '#page/NotFound';

const ConnectedSwitch = connect(state => ({ location: state.location }))(Switch);

const Routes = () => (
  <ConnectedSwitch>
    <Route exact path="/" component={Home} />
    <Route path="/home" component={Home} />
    <Route path="/sample" component={Sample} />
    <Route path="*" component={NotFound} />
  </ConnectedSwitch>
);

export default Routes;
