import React from 'react';
import Helmet from 'react-helmet'
import Button from '#atom/Button';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import sc, { injectGlobal } from 'styled-components';
const styled = sc;

type PropsType = {
  children: any,
  className?: string,
}

// const query = gql`query Query { hello }`;

injectGlobal`
  body {
    margin: 0;
  }
`;

const App = ({ children, className }: PropsType) => (
  <div className={className}>
    <Helmet>
      <title>Isomorfic react app sample</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
    <section>
      Application header here
    </section>
    { children }
    <section>
      And footer with
      <Button onClick={() => console.log('work')}>Footer Button</Button>
    </section>
  </div>
);

export default styled(App)`
  background-color: #eee;
`;
