const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = merge(common,{
    devtool: 'cheap-module-source-map',
    entry: {
        main: __dirname + "/src/index.js",
        vendor:['react']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash].js"
    },
    module:{
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                query: {
                    plugins: [
                      ["react-transform", {
                        transforms: [{
                          transform: "react-transform-hmr",
                          imports: ["react"],
                          locals: ["module"]
                        }]
                      }]
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options:{
                                modules: true,
                                sourceMap: true,
                                url: false,
                                minimize: true,
                            } 
                        },{
                            
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                modules: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "./build/index.html",//new 一个这个插件的实例，并传入相关的参数
            // hash:true,
            title:'demo'
        }),
        new webpack.HashedModuleIdsPlugin(), //和下面的模块CommonsChunkPlugin配合使用，防止公用的模块跟着变化，例如（vendor chunk 不会以为index的改变而改变）
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',                 //找出基本不会变的模块，不必要每次都更新hash值
            chunks: ['common'],
            filename: 'vendor.bundle.js',
            minChunks: Infinity,
        }),
        new ExtractTextPlugin({             //摘出css到单独的文件夹中
            filename:'css/[name].css',
            allChunks: true
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
            // 'process.env': {
            //     'NODE_ENV': JSON.stringify('development'),
            //     'BABEL_ENV': JSON.stringify('dev')
            // }
        })
    ],
});
console.log('-------',process.env.NODE_ENV)