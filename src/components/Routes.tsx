/**
 * Routes.tsx
 * define application routing
 */
import * as React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App, { withGql } from '#components/App';
import AppStyle from '#components/App.style';
import * as Pages from '#components/loader';


const switchMapState = ({ router: { location } }) => ({ location });

const ConnectedSwitch = connect(switchMapState, null)(Switch);
const Application = withGql(AppStyle(App));

const routes: React.SFC = () => (
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

export default hot(module)(routes);
