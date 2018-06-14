const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.js'
    },
    module:{
        rules:[
            // 处理图片
            {
                test:/\.(png|svg|jpg|git)$/,
                use:['url-loader'],
            },
            //处理字体
            {
                test:/.(woff|woff2|eot|ttf|oft)$/,
                loader:'file-loader',
                options:{
                    publicPath: "./src/fonts",
                    outputPath:"./src/fonts"
                }
            },
            // jquery
            {          
                //jquery.js的路径
               test: require.resolve('jquery'),                 
               use: [{
                   loader: 'expose-loader',
                   options: 'jQuery'       
               },{
                   loader: 'expose-loader',
                   options: '$'
               }]
            },
            // css
            {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  {
                    loader: 'css-loader',
                    
                  }
                ]
            },
            //import snapsvg
            {
                test:require.resolve('snapsvg/dist/snap.svg.js'),
                use: 'imports-loader?this=>window,fix=>module.exports=0',
            }
        ]
    },
    //插件
    plugins:[
         new copyWebpackPlugin([{
            from:__dirname + '/src',
            to:__dirname + '/dist/src'
        }]),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"index",
            filename:"index.html",
            template:'./index.html'
        }),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"myblog",
            filename:"myblog.html",
            template:'./myblog.html'
        }),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"guitar",
            filename:"guitar.html",
            template:'./guitar.html'
        }),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"mylife",
            filename:"mylife.html",
            template:'./mylife.html'
        }),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"contact",
            filename:"contact.html",
            template:'./contact.html'
        }),
        new htmlWebpackPlugin({
            chunks:['index'],
            title:"blog-single",
            filename:"blog-single.html",
            template:'./blog-single.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    //DevServer
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:"localhost",
        port:9001,
        open:true,
        hot:true
    },
    resolve: {
        alias: {
          snapsvg: 'snapsvg/dist/snap.svg.js',
        },
    }
};