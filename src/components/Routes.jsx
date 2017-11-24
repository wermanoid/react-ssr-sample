// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from '#page/Home';
import Sample from '#page/Sample';
import NotFound from '#page/NotFound';
import App from '#components/App';

const switchMapState = ({ location }) => ({ location });

const ConnectedSwitch = connect(switchMapState)(Switch);

const Routes = () => (
  <App>
    <ConnectedSwitch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/sample" component={Sample} />
      <Route path="*" component={NotFound} />
    </ConnectedSwitch>
  </App>
);

export default Routes;
