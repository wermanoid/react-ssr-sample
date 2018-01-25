// @flow
import React from 'react';
import Button from '#atom/Button';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <Link to="/sample">go sample</Link>
    Home page component
    <Button onClick={() => console.log('click home')}>home btn text</Button>
  </div>
);

export default HomePage;
