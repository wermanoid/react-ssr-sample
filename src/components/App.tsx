import React from 'react';
import Button from '#atom/Button';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type PropsType = {
  children: any,
  data: any,
}

const query = gql`query Query { hello }`;

const App = ({ children, data }: PropsType) => console.log('here', data.hello) || (
  <div>
    <span>
      simplest SSR with HMR {data.hello}
      <Button />
    </span>
    { children }
  </div>
);

export default graphql(query)(App);
