const path = require('path');

var config = {
    entry: {
        'index': './src/page/index/index.js',
        'login': './src/page/login/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = config;