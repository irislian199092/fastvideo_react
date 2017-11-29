const path=require('path');
/*const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');*/
const DIST_DIR=path.resolve(__dirname,'dist');

const config={
	entry: __dirname+'/src/index.js',
	output:{
		filename:'bundle-[hash].js',
		path:DIST_DIR
	},
	devtool: 'inline-source-map',
	devServer: {
     	contentBase: "./dist", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
   	},
	module:{
	    rules:[
		    {
		        test: /\.(scss|css)$/,
		        use: ['style-loader','css-loader','sass-loader']
		    },
		    {
		    	test: /\.(png|svg|jpg|gif)$/,
		    	use: ['file-loader']
		    },
		    {
		    	test: /\.(woff|woff2|eot|ttf|otf)$/,
		    	use: ['file-loader']
		    },
		    {
			  test: /\.js$/,
			  include: path.resolve(__dirname, "src"),
			  exclude: /node_modules/
			  loader: "babel-loader"
			}
		]
	},
	plugins:[
		/*new HtmlWebpackPlugin({
			filename: 'index.html',
			template:'./index.html',
			inject:true,
			hash: false
		}),
		new CleanWebpackPlugin(['dist'])
		new HtmlWebpackPlugin({
	        title: 'Output Management'
	    })*/
	]
}

module.exports=config;