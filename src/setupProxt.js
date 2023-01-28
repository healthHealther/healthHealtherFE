/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/members",
    createProxyMiddleware({
      target:
        "https://port-0-healthhealtherbe-1b5xkk2fld9zjwzk.gksl2.cloudtype.app",
      changeOrigin: true,
    })
  );
};
