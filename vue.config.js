module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // productionSourceMap: false,
  devServer: {
    https: false,
    proxy: {
      "^/api": {
        target: "http://127.0.0.1:8080",
        // ws: true,
        // changeOrigin: true,
      },
    },
  },
};
