const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common,{ 
    devtool: 'inline-source-map',
    entry: {
        main: __dirname + "/src/index.js",
        vendor:['react']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[hash].js"
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.HashedModuleIdsPlugin(), //和下面的模块CommonsChunkPlugin配合使用，防止公用的模块跟着变化，例如（vendor chunk 不会以为index的改变而改变）
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',                 //找出基本不会变的模块，不必要每次都更新hash值
            chunks: ['common'],
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
        }),
    ]
});
