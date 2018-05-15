const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

// 用于生成HtmlWebpackPlugin的参数
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

// webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js', 'webpack-dev-server/client?http://localhost:8088/'],
        'index': './src/page/index/index.js',
        'login': './src/page/login/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        rules: [{
                // 处理css的loader
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                // 处理图片和字体的loader
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: 'url-loader?limit=100&name=/resource/[name].[ext]'
            }
        ]
    },
    resolve: {
        // 为路径设置别名映射
        alias: {
            node_modules: __dirname + '/node_modules',
            image: __dirname + '/src/image',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            util: __dirname + '/src/util',
            view: __dirname + '/src/view'
        }
    },
    devServer: {
        // 配置devServer跨域代理
        proxy: {
            '/v1': {
                target: 'http://localhost:8080',
                secure: false,
                changeOrigin: true
            }
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 指定公共 bundle 的名称
            filename: 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;