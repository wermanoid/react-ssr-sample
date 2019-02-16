/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
// import { Button } from '@material-ui/core';
// import { get } from 'lodash/fp';

import { hot } from 'react-hot-loader/root';

import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';

import Routes from './Router';
import Layout from './templates/layout';

const globalStyles = css`
  body {
    margin: 0;
  }
`;

const AppHeader = () => (
  <AppBar position="static">
    <Toolbar>Trololo</Toolbar>
  </AppBar>
);

const App = () => (
  <Layout header={AppHeader}>
    <Global styles={globalStyles} />
    <Routes>
      <List
        css={{
          background: 'rgba(255,255,255, 0.4)',
          maxWidth: '200px',
        }}
      >
        <ListItem>Material</ListItem>
        <ListItem>
          <Collapse in={true}>
            <List>
              <ListItem>C1</ListItem>
              <ListItem>C2</ListItem>
              <ListItem>C3</ListItem>
            </List>
          </Collapse>
        </ListItem>
        <ListItem>Group 2</ListItem>
        <ListItem>Group 3</ListItem>
      </List>
    </Routes>
  </Layout>
);

export default hot(App);
