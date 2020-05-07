const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const externals = {
    // 'vue': "Vue",
    "vue-router": "VueRouter",
    'axios': 'axios',
}

const cdn = [
    // vue
    // 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
    // vue-rounter
    'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    // axios
    'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js',
]

module.exports = {
    productionSourceMap:false,
    chainWebpack: config => {
        // 挂载cdn外部库
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn;
                return args;
            });
        config.externals(externals);
    },
    configureWebpack: config => {
        config.plugins.push(
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                    },
                    warnings: false,
                },
                sourceMap: false,
                parallel: true,
            })
        )
    },
}