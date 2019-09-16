const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
// const post2rem = require('post2rem');

module.exports = {
    publicPath: './', //基本路径
    outputDir: 'dist', //输出文件目录
    assetsDir: 'assets',
    lintOnSave: false, //eslint-loader是否在保存的时候检查
    //webpack配置
    chainWebpack: (config) => {},
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            //为生产环境修改配置
            config.mode = 'production'
                //将每个依赖包打包成单独js文件
            let optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunk: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                return `npm.${packageName.replace('@','')}`
                            }
                        }
                    }
                },
                minimizer: [new UglifyPlugin({
                    uglifyOptions: {
                        compress: {
                            warning: false,
                            drop_console: true, //console
                            drop_debugger: false,
                            pure_funcs: ['console.log'] //移除console
                        }
                    }
                })]
            }
        } else {
            //为开发环境修改配置
            config.mode = 'development'
        }
        Object.assign(config, {
            //开发生产共同配置
            resolve: {
                //别名配置
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    '@v': path.resolve(__dirname, './src/views')
                }
            }
        })
    },
    productionSourceMap: false, //生产环境是否生成sourceMao文件
    //css相关设置
    css: {
        extract: true, //是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, //开启 css source map
        loaderOptions: {
            css: {}, //这里的选项会传递给 css-loader
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: 37.5
                    })
                ]
            } //这里的选项会传递给 postcss-loader
        },
        modules: false //启用css modules for all css
    },
    parallel: require('os').cpus().length > 1, //是否为 Babel或 TypeScript使用thread-loader
    pwa: {}, //PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    // 'autoprefixer': {
    //     browsers: ['Android >= 4.0', 'IOS >= 7']
    // },
    //webpack-dev-server相关配置
    devServer: {
        port: 80, //端口
        proxy: {
            '/webservice': {
                target: 'http://192.168.200.125/webservice',
                changeOrigin: true, //允许websockets跨域
                pathRewrite: {
                    '^/webservice': ''
                }
            }
        }
    },
    //第三方插件配置
    pluginOptions: {}
}