// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from '#components/App';
import * as Pages from './loader';

const switchMapState = ({ location }) => ({ location });

const ConnectedSwitch = connect(switchMapState, null)(Switch);

const Routes = () => (
  <ThemeProvider theme={{}}>
    <App>
      <Switch>
        <Route exact path="/" component={Pages.HomePage} />
        <Route path="/home" component={Pages.HomePage} />
        <Route path="/sample" component={Pages.SamplePage} />
        <Route path="*" component={Pages.NotFoundPage} />
      </Switch>
    </App>
  </ThemeProvider>
);

export default Routes;
