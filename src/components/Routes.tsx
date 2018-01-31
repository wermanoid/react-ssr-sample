// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App, { withGql } from '#components/App';
import SApp from './App.style';
import * as Pages from './loader';

const switchMapState = ({ router: { location } }) => ({ location });

const ConnectedSwitch = connect(switchMapState, null)(Switch);
const Application = withGql(SApp(App));

const Routes = () => (
  <ThemeProvider theme={{}}>
    <Application>
      <ConnectedSwitch>
        <Route exact path="/" component={Pages.HomePage} />
        <Route path="/home" component={Pages.HomePage} />
        <Route path="/sample" component={Pages.SamplePage} />
        <Route path="*" component={Pages.NotFoundPage} />
      </ConnectedSwitch>
    </Application>
  </ThemeProvider>
);

export default Routes;
