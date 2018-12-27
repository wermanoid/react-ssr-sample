import { Button } from '@material-ui/core';
import { get } from 'lodash/fp';
import React from 'react';

export const App = () => (
  <div>
    <p>
      this is App as{' '}
      <Button>sample {get(['a', 'b'], { a: { b: 345 } })}</Button>
    </p>
  </div>
);
