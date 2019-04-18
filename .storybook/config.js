import { withKnobs } from '@storybook/addon-knobs';
import { configure, addDecorator } from '@storybook/react';

const requireAll = requireContext => {
  return requireContext.keys().map(file => requireContext(file));
};

function loadStories() {
  addDecorator(withKnobs);
  requireAll(require.context('../src/shared', true, /\.story\.tsx?$/));
}

configure(loadStories, module);
