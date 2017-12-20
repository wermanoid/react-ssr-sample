// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Button from './Button';

const stories = storiesOf('StepItem', module);
stories.addDecorator(withKnobs);

stories.add('simple btn', () => (
  <Button onClick={action('clicked')}/>
));
