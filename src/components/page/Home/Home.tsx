/**
 * Provides root component for '/home' and '/' page
 * @module #page/Home
 */
import React from 'react';
import Button from '#atom/Button';
import { Link } from 'react-router-dom';

// tslint:disable-next-line: no-console
const stub = () => console.log('click home');

/**
 * Root component for '/home' and '/' page
 */
const Home = () => (
  <div>
    <Link to="/sample">go sample</Link>
    Home page component
    <Button onClick={stub}>home btn text</Button>
  </div>
);

export default Home;
