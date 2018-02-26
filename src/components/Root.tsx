import React from 'react';
import { hot } from 'react-hot-loader';

class Root extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles) {
      // jssStyles.remove();
    }
    delete window['__INITIAL_STATE__'];
    delete window['__APOLLO_STATE__'];
  }

  render() {
    return this.props.children;
  }
}

export default hot(module)(Root);
