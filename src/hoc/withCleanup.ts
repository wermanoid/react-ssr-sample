/**
 * withCleanup.ts
 * add HOC that removes unnecessary DOM nodes after app is being initialized
 */
import { lifecycle } from 'recompose';

const withCleanup: Hoc = lifecycle({
  componentDidMount(): void {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    delete window.__INITIAL_STATE__;
    delete window.__APOLLO_STATE__;
  }
});

export default withCleanup;
