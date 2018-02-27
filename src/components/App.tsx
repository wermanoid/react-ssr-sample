/**
 * App.tsx
 * define application viewport component
 * @children {React.Node} - any page to display
 */
import { default as gql } from 'graphql-tag';
import { get } from 'lodash';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { default as Helmet } from 'react-helmet';

import Menu from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Button from '#atom/Button';

const query = gql`
  query Query {
    hello
  }
`;

interface IAppProps {
  className?: string;
  data: { hello: string };
}

// tslint:disable-next-line: no-console
const stub = (id: number) => () => console.log('work', id);

const App: React.SFC<IAppProps> = ({ children, className, data }) => (
  <div className={className}>
    <Helmet>
      <title>Isomorfic react app sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <Menu />
        </IconButton>
        <Typography type="title" color="inherit" style={{ flex: 1 }}>
          App title says and: {get(data, 'hello', 'no data')}
        </Typography>
      </Toolbar>
    </AppBar>
    <section>
      <div>pages content here</div>
      {children}
    </section>
    <section>
      And footer with change
      <Button onClick={stub(1)}>Footer Button #1</Button>
      <Button onClick={stub(2)}>Footer Button #2</Button>
    </section>
  </div>
);

export const withGql = graphql(query);
export default App;
