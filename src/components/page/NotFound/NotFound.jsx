// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { set } from 'lodash';

type PropsType = {
  staticContext: Object,
};

const NotFound = () => (
  <Route
    render={({ staticContext }: PropsType) => {
        if (staticContext) {
          staticContext.status = 404;
        }
        return (
          <div>
            <h1>404 : Not Found</h1>
          </div>
        );
      }}
  />
);

export default NotFound;
