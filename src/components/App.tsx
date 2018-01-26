import React from 'react';
import Helmet from 'react-helmet'
import Button from '#atom/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import sc, { injectGlobal } from 'styled-components';
const styled = sc;

type PropsType = {
  children: any,
  className?: string,
  data: any,
}

const query = gql`query Query { hello }`;

injectGlobal`
  body {
    margin: 0;
  }
`;

const App = ({ children, className, data}: PropsType) => (
  <div className={className}>
    <Helmet>
      <title>Isomorfic react app sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <section>
      Application header here {get(data, 'hello', 'no data')}
    </section>
    { children }
    <section>
      And footer with
      <Button onClick={() => console.log('work')}>Footer Button</Button>
    </section>
  </div>
);

const SApp = styled(App)`
  background-color: #eee;
`;

export default graphql(query)(SApp);
