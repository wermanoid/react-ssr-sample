// @flow
import React from 'react';
import Button from '#atom/Button';

type PropsType = {
  children: React$Node,
}

const App = ({ children }: PropsType) => (
  <div>
    <span>
      simplest SSR with HMRn2
      <Button />
    </span>
    { children }
  </div>
);

export default App;
