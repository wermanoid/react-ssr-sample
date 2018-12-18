module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          targets: {
            browsers: "Last 2 Chrome versions, Firefox ESR",
            node: "8.12"
          }
        }
      ],
      "@babel/typescript"
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { loose: true }]
    ],
    ignore: ["node_modules"]
  };
};
