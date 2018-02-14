var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry:path.join(_dirname,'js/app/index.js'),
    output: {
        path: path.join(_dirname,'../pulic/js'),
        filename: 'index.js'
    },
    // module:{
    //     rules:[{
    //         test:/\.less$/,
    //         use: ['style-loader','css-loader','less-loader']
    //     }]
    // },
    // resolve:{
    //     alias:{
    //         jquery: path.join(_dirname,'js/lib/jquery-2.0.3.min.js'),
    //         mod:path.join(__dirname,'js/mod'),
    //         less: path.join(__dirname,'less')
    //     }
    // },
    // plugins:[
    //     new webpack.ProvidePlugin({
    //         $:'jquery'
    //     }),
    // ]

}