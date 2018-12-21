import React from 'react';
import { hydrate } from 'react-dom';

import Application from '#shared/Router';

hydrate(<Application />, document.getElementById('react-root'));
