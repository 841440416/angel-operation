module.exports = {
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === "production" ? "/public/" : "./",

  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: "dist",

  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",

  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,

  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,

  /* 代码保存时进行eslint检测 */
  lintOnSave: false,

  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set("@", require("path").join(__dirname, "src"))
      .set("assets", require("path").join(__dirname, "src/assets"))
      .set("components", require("path").join(__dirname, "src/components"))
      .set("views", require("path").join(__dirname, "src/views"))
      .set("static", require("path").join(__dirname, "src/static"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "development") {
      config.devtool = "source-map";
    } else {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: new RegExp(`\\.(${["js", "css", "scss"].join("|")})$`),
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `@import "~@/assets/css/mixin.sass"`
      },
      scss: {
        prependData: `@import "~@/assets/css/mixin.scss";`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },

  /* webpack-dev-server 相关配置 */
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: "0.0.0.0",
    port: 8888,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/v2': {
        // target: 'http://crm-api.eainc.com', // pro
        // target: 'http://crm-api.adv.eainc.com', // adv
        target: 'http://app-dev.angelalign.com:8888', // dev
        // target: 'http://crm-api.sit.eainc.com', // sit
        changeOrigin: true, //跨域
        // 如果要代理 websockets
        ws: false
      },
      '/version': {
        // target: 'http://crm-api.eainc.com', // pro
        // target: 'http://crm-api.adv.eainc.com', // adv
        target: 'http://app-dev.angelalign.com:8888', // dev
        // target: 'http://crm-api.sit.eainc.com', // sit
        changeOrigin: true //跨域
      }
    }
  },

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
