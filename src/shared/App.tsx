/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
// import { Button } from '@material-ui/core';
// import { throttle } from 'lodash/fp';

import { hot } from 'react-hot-loader/root';

import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';

import Draggable from './atoms/draggable';
import Droppable from './atoms/droppable';
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
          minWidth: '150px',
        }}
      >
        <ListItem>Material</ListItem>
        <ListItem>
          <Collapse in={true}>
            <List>
              <Draggable id="#1" render={ListItem} button>
                item1
              </Draggable>
              <ListItem button draggable>
                C2
              </ListItem>
              <ListItem button draggable>
                C3
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
        <ListItem>Group 2</ListItem>
        <ListItem>Group 3</ListItem>
      </List>
      <Droppable
        css={{
          border: '1px solid blue',
        }}
      >
        content here
      </Droppable>
    </Routes>
  </Layout>
);

let Apppp = App;
if (process.env.NODE_ENV !== 'production') {
  Apppp = hot(App);
}

export default Apppp;
