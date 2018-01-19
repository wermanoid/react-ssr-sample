import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import StaticRouter from "react-router-dom/StaticRouter";
import { Provider } from "react-redux";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "isomorphic-fetch";

import Routes from "#components/Routes";
import configureStore from "#store";
import env from "#env";

import indexTemplate, { Html } from "./index.tmpl";

export default (req, res) => {
  const client = new ApolloClient({
    link: createHttpLink({ uri: env.apolloServerUrl, fetch }),
    ssrMode: true,
    cache: new InMemoryCache()
  });
  const context: any = {};
  const store = configureStore();

  console.log(store.getState())

  const App = (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Routes />
        </StaticRouter>
      </ApolloProvider>
    </Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    return res.end();
  }

  return getDataFromTree(App).then(result => {
    const content = renderToString(App);
    const initialState = client.extract();

    const html = (
      <Html content={content} state={initialState} store={store.getState()} />
    );

    return res.end(`<!doctype html>\n${renderToStaticMarkup(html)}`);
  });
  // return res.end(indexTemplate(renderToString(content)));
};
