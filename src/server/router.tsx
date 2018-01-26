import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { push, ConnectedRouter } from 'react-router-redux';
import createMemoryHistory from 'history/createMemoryHistory';
import { getLoadableState } from 'loadable-components/server';

import configureStore from '#store';
import Routes from '#components/Routes';
import App from '#components/App';
import Html from './index.tmpl';

const renderApp = async ({ sheet, sheetsRegistry, store, history }): Promise<any> => {
  const generateClassName = createGenerateClassName();
  const theme = createMuiTheme({});
  const app = sheet.collectStyles((
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>
  ));

  return ({
    html: renderToString(app),
    sheetsRegistry,
    store,
    sheet,
  });
}

const renderHtml = ({ html, sheet, sheetsRegistry, store }) => {
  const page = <Html
    content={html}
    styles={sheet.getStyleElement()}
    mStyles={sheetsRegistry.toString()}
    store={store.getState()}
  />;
  return `<!doctype html>\n${renderToStaticMarkup(page)}`;
}

export default async (req, res) => {
  // const client = new ApolloClient({
  //   link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
  //   ssrMode: true,
  //   cache: new InMemoryCache()
  // });
  // const context: any = {};
  // const store = configureStore();
  // const styles = new ServerStyleSheet();
  //
  // const App = (
  //   <Provider store={store}>
  //     <ApolloProvider client={client}>
  //       <StaticRouter location={req.url} context={context}>
  //         <Routes />
  //       </StaticRouter>
  //     </ApolloProvider>
  //   </Provider>
  // );
  //
  // if (context.url) {
  //   res.writeHead(301, {
  //     Location: context.url
  //   });
  //   return res.end();
  // }
  //
  // return getDataFromTree(App).then(result => {
  //   const content = renderToString(styles.collectStyles(App));
  //   const styleTags = styles.getStyleTags();
  //   console.log('styles', styleTags);
  //   const initialState = client.extract();
  //
  //   const html = (
  //     <Html content={content} state={initialState} store={store.getState()} />
  //   );
  //
  //   return res.end(`<!doctype html>\n${renderToStaticMarkup(html)}`);
  // });
  // return res.end(indexTemplate(renderToString(content)));
  const sheet = new ServerStyleSheet();
  const sheetsRegistry = new SheetsRegistry();
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  store.dispatch(push(req.originalUrl));

  res.contentType('text/html');
  const result = await renderApp({ sheet, sheetsRegistry, store, history });
  res.end(renderHtml(result));
};
