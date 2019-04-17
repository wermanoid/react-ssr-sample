import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';

import Application from '#shared/App';

export const renderApp = () => {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const app = (
    <JssProvider
      registry={sheetsRegistry}
      generateClassName={generateClassName}
    >
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <Application />
      </MuiThemeProvider>
    </JssProvider>
  );

  // Pegue o CSS do nosso sheetsRegistry.
  const css = sheetsRegistry;

  // Send the rendered page back to the client.
  return { app, css };
};
