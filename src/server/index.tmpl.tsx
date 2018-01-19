import React from 'react';

export default (html: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Isomorphic Redux Demo</title>
    </head>
    <body>
      <div id="react-root">${html}</div>
      <script type="application/javascript" src="public/manifest.bundle.js"></script>
      <script type="application/javascript" src="public/vendor.bundle.js"></script>
      <script type="application/javascript" src="public/client.bundle.js"></script>
    </body>
  </html>
`;

export const Html = ({ content, store, state }) => (
  <html>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: content }} />
      { JSON.stringify(state).replace(/</g, '\\u003c') }
      <br />
      { JSON.stringify(store).replace(/</g, '\\u003c') }
      <script dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
      }} />
      <script dangerouslySetInnerHTML={{
        __html: `window.__INITIAL_STATE__=${JSON.stringify(store).replace(/</g, '\\u003c')};`,
      }} />

      <script type="application/javascript" src="public/manifest.bundle.js" />
      <script type="application/javascript" src="public/vendor.bundle.js" />
      <script type="application/javascript" src="public/client.bundle.js" />
    </body>
  </html>
);
