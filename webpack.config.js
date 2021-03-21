const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs')

const arr =[]
const readAssets = async () => {
    const{readdir} = fs.promises
    const assetsPath = path.resolve(__dirname,'./src/assets/images')
    try{
        const files = await readdir(assetsPath)
        for await (let file of files) {
            arr.push(file)
        }
    } catch(err){console.log(err)}
    return
}
readAssets()

module.exports = {
    mode:"development",
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions:['.json','.js','.png','.jpg','.jpeg'],
        modules:['node_modules'],
        alias: {
            '@': path.resolve(__dirname,'src'),
            'style': path.resolve(__dirname, './src/styles.css'),
            'assets': path.resolve(__dirname,'./src/assets/images')
        }
    },
    devtool: 'eval-source-map',
    devServer:{
        port:1234,
        hot:false,
        historyApiFallback: true,
        disableHostCheck: true,
        clientLogLevel: 'silent',
    },
    optimization:{
        minimize:true,
        minimizer: [new TerserPlugin({
            extractComments: false,
          })],
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      },
    plugins:[
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            uglify: true,
            data: arr
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './assets', to: './assets' }
            ]
        }),
    ]
}