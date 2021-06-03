var px2rem = require("postcss-px2rem");

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            "text-color": "#111",
            "border-color": "#eee",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/css/index.less";`,
          },
        },
      },
      postcss: {
        plugins: [px2rem({ remUnit: 100 })], //375是设计稿宽度
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        // 匹配所有以 '/api'开头的请求路径
        target: "http://localhost:5000", // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
