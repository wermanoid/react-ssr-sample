import 'reflect-metadata';
import React from 'react';
import { hydrate } from 'react-dom';
import App from '#shared';

hydrate(<App />, document.getElementById('react-root'));
