import { configure } from '@storybook/react';

const requireAll = requireContext => {
  return requireContext.keys().map(file => requireContext(file));
};

function loadStories() {
  requireAll(require.context('../src/components', true, /\.story\.tsx?$/));
}

configure(loadStories, module);
