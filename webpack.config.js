const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置
var WEVPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEVPACK_ENV);

// 获取htmlwebpackpulgin参数的方法
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
        'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
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
                use: 'url-loader?limit=100&name=resource/[name].[ext]'
            }
        ]
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
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
}

if('dev' === WEVPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;