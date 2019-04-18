import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Draggable from './draggable';

storiesOf('Button', module).add('default', () => (
  <Draggable id="123" draggable={boolean('ToDrag?', false)}>
    lol
  </Draggable>
));
