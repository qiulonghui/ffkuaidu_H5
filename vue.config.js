module.exports = {
	publicPath: './', // 根域上下文目录

  devServer: {
    proxy: {
      '/pc': {
				target: 'https://wappt.ffkuaidu.com', // https://wappt.ffkuaidu.com
				changeOrigin: true,
      }
    }
	},
	css: {
		loaderOptions: {
			sass: { //全局导入scss文件
				prependData: `
					@import "~@/styles/common.scss"; 
				`
			}
		}
	},
	configureWebpack: {
    externals: { // 这些通过CDN引入，不用打包到vendors
      vue: 'Vue',
			'vue-router': 'VueRouter',
			vuex: 'Vuex',
			axios:'axios'
    }
  }
}

