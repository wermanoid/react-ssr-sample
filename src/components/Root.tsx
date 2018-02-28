import React from 'react';

class Root extends React.Component {
  // Remove the server-side injected CSS.
  public componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    delete window.__INITIAL_STATE__;
    delete window.__APOLLO_STATE__;
  }

  public render() {
    return this.props.children;
  }
}

export default Root;
