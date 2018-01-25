// @flow
import loadable from 'loadable-components';

export const HomePage = loadable(() => import('#page/Home'));
export const SamplePage = loadable(() => import('#page/Sample'));
export const NotFoundPage = loadable(() => import('#page/NotFound'));

// export { default as HomePage } from '#page/Home';
// export { default as SamplePage } from '#page/Sample';
// export { default as NotFoundPage } from '#page/NotFound';
