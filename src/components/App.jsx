// @flow
import React from 'react';

type PropsType = {
  children: React$Node,
}

const App = ({ children }: PropsType) => (
  <div>
    <span>
      simplest SSR with HMR
    </span>
    { children }
  </div>
);

export default App;
