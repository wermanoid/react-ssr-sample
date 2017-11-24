// @flow
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
