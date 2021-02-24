
module.exports = {
  //路径前缀
  publicPath: "./",
  lintOnSave: true,
  productionSourceMap: false,
  /** chainWebpack: (config) => {
    // 不启用热更新
  //   config.resolve.symlinks(false);
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
  //   entry
  //     .add('babel-polyfill')
  //     .end()
  //   entry
  //     .add('classlist-polyfill')
  //     .end()
    entry
      // .add('@/mock')
      .end()
  },*/
  devServer: {
    port: 8083,
    disableHostCheck: true, // 跳过host检查
    proxy: {
      '/pm': {
        //本地服务接口地址
        // target: 'http://192.168.0.23:1888', // 线上地址
        target: 'http://localhost:8089/pm',
        //  target: 'http://192.168.9.119:8089',
        //远程演示服务地址
        // target: 'https://saber.bladex.vip/api',
        changeOrigin: true,
        // 连接线上地址 不用加pathRewrite
        pathRewrite: {
          '^/pm': '/'
        }
      }
    }
  }
}