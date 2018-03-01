const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bootstrapEntryPoints=require('./webpack.bootstrap.config.js');
const autoprefixer = require('autoprefixer');
let config = { 
    module: {
        rules: [
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
		        test: /\.(scss|css)$/,
		        use: [{
                        loader: 'style-loader',
                        options:{
                            modules: true,
                            sourceMap: true
                        } 
                    },{
                        loader: 'css-loader',
                        options:{
                            modules: true,
                            sourceMap: true,
                            localIdentName:'[name]__[local]-[hash:base64:5]'
                        } 
                    },{
                        loader: 'sass-loader',
                        options:{
                            modules: true,
                            sourceMap: true,
                            localIdentName:'[name]__[local]-[hash:base64:5]'
                        } 
                }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader?limit=10000&name=images/[name].[ext]'
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            },
            { test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.tmpl.html",//new 一个这个插件的实例，并传入相关的参数
            hash:true,
            inject: true
        }),
        //new CleanWebpackPlugin(['build']),
        new webpack.NamedModulesPlugin(),
        new webpack.LoaderOptionsPlugin({
            postcss: [autoprefixer],
        }),
	    new webpack.ProvidePlugin({
	       $: "jquery",
	       jQuery: "jquery"
	    })
    ]
}


module.exports = config;