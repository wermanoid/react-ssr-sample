// @flow
import React from 'react';
import { Route } from 'react-router-dom';

const Page404 = () => (
  <div>
    <h1>404 : Not Found!</h1>
  </div>
);

Page404.defaultProps = {
  staticContext: {},
};

const NotFound = () => <Route render={Page404} />;
export default NotFound;
