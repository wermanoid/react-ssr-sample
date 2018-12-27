import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import React from 'react';
import { hydrate } from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';

import Application from '#shared/Router';

class Main extends React.Component {
  public componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    return <Application />;
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const generateClassName = createGenerateClassName();

hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById('react-root'),
);
