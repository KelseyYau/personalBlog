const path = require('path');

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
                use:['file-loader']
            },
            //处理字体
            {
                test:/.(woff|woff2|eot|ttf|oft)$/,
                use:['file-loader']
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
            }
        ]
    }
};