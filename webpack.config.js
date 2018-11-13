const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 將我們提供的 html 模板自動引入打包好的 JS、CSS
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin') // 將 CSS 從 inline 拆出來成為獨立檔案
const CleanWebpackPlugin = require('clean-webpack-plugin') // 在每次打包前先清空目標資料夾

module.exports = env => {
    const config = require('./env')(env.NODE_ENV)
    
    return {
            entry: './src/client/index.js', // 程式入口
            output: {
                // 輸出
                filename: 'bundle.[hash:4].js', // 打包後的文件名稱(增加 hash 是為了避免 cache)
                path: path.resolve('dist') // 打包後的路徑(必須是絕對路徑)
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ExtractTextWebpackPlugin.extract({
                            use: 'css-loader',
                            publicPath: '../'
                        })
                    },
                    {
                        test: /\.less$/,
                        use: ExtractTextWebpackPlugin.extract({
                            use: ['css-loader', 'less-loader'],
                            publicPath: '../'
                        })
                    },
                    {
                        test: /\.(jpe?g|png|gif)$/,
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 8192, // 小於 8K 會轉成 base64, 且不會存成實體圖片
                                    outputPath: 'images/' // 圖片打包後存放的路徑
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(eot|ttf|woff|svg)/,
                        use: 'file-loader'
                    },
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                        //include: /src/, // 只會轉 src 目錄下的 JS 檔案
                        exclude: /node_modules/ // 會排除掉 node_modules ，加快打包速度
                    }
                ]
            }, // 對應模組處理
            plugins: [
                // 插件
                new CleanWebpackPlugin('dist'), // 每次打包前都先清空
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, 'src/client/index.html'), // 提供 HTML 模板，會自動將打包好的檔案引入
                    hash: true, // 如果有 hash 也會自動加上                    
                    wsUrl: config.url,                
                    env: env.NODE_ENV,                    
                }),
                new ExtractTextWebpackPlugin('css/style.css') // 會把拆分成獨立檔案的 CSS 放到 dist 下面的 css/style.css
                //new webpack.HotModuleReplacementPlugin() // 除了在config中設定，在index.js(入口JS) 中也需要設定
            ],
            resolve: {
                // 配置別名
                // alias: {}
                extensions: ['.js', 'json'] // 用來省略後綴
            },
            devServer: {
                // contentBase: './dist',
                // publicPath: '/',
                // host: 'localhost',
                // port: '3333'
                // open: true, // 自動打開瀏覽器
                // hot: true, // hot reload
                // inline: true
                historyApiFallback: true // 修正 hot reload 之後會有找不到 route 的情形
            },
            // mode: 'development'
    }
}