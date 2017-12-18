// @flow
import loadable from 'loadable-components';

export const HomePage = loadable(() => import('#page/Home'));
export const SamplePage = loadable(() => import('#page/Sample'));
export const NotFoundPage = loadable(() => import('#page/NotFound'));
