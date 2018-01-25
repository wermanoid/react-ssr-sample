// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Input from 'material-ui/Input';
import Button from '#atom/Button';

const SamplePage = () => (
  <div>
    This link helps you to <Link to="/home">go home</Link> now, so...
    <br />
    <Input />
    <Button onClick={() => console.log('work')}>button</Button>
  </div>
);

export default SamplePage;
