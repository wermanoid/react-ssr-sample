// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Input from 'material-ui/Input';

const SamplePage = () => (
  <span>
    This link helps you to <Link to="/home">go home</Link>
    <br />
    <Input />
  </span>
);

export default SamplePage;
