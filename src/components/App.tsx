// @flow
import React from 'react';
import Button from '#atom/Button';

type PropsType = {
  children: any,
}

const App = ({ children }: PropsType) => (
  <div>
    <span>
      simplest SSR with HMR
      <Button />
    </span>
    { children }
  </div>
);

export default App;
