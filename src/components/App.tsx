import React from 'react';
import Helmet from 'react-helmet'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

import Button from '#atom/Button';

const query = gql`query Query { hello }`;

type PropsType = {
  children: any,
  className?: string,
  data: any,
}

const App = ({ children, className, data}: PropsType) => (
  <div className={className}>
    <Helmet>
      <title>Isomorfic react app sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          App title says: {get(data, 'hello', 'no data')}
        </Typography>
      </Toolbar>
    </AppBar>
    <section>
      <div>pages content here</div>
      { children }
    </section>
    <section>
      And footer with change
      <Button onClick={() => console.log('work')}>Footer Button #1</Button>
      <Button onClick={() => console.log('work')}>Footer Button #2</Button>
    </section>
  </div>
);


export const withGql = graphql(query);
export default App;
