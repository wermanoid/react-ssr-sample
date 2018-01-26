import React from 'react';
import Helmet from 'react-helmet';

type HtmlProps = {
  content: string,
  store?: Object,
  state?: Object,
  styles?: any,
  mStyles?: any,
}

const stringify = (field, obj) => `window.${field}=${JSON.stringify(obj).replace(/</g, '\\u003c')};`

export default ({ content, store, state, styles, mStyles }: HtmlProps) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        { helmet.title.toComponent() }
        { helmet.meta.toComponent() }

        { styles }
      </head>
      <body {...bodyAttrs}>
        <div id="react-root" dangerouslySetInnerHTML={{ __html: content }}></div>
        <style id="jss-server-side">{mStyles}</style>

        { state && stringify('__APOLLO_STATE__', state).replace(/</g, '\\u003c') }
        { store && stringify('__INITIAL_STATE__', store).replace(/</g, '\\u003c') }

        {state && <script dangerouslySetInnerHTML={{ __html: stringify('__APOLLO_STATE__', state) }} />}
        <br />
        {store && <script dangerouslySetInnerHTML={{ __html: stringify('__INITIAL_STATE__', store) }} />}

        <script type="application/javascript" src="public/manifest.bundle.js"></script>
        <script type="application/javascript" src="public/vendor.bundle.js"></script>
        <script type="application/javascript" src="public/client.bundle.js"></script>
      </body>
    </html>
  );
}
