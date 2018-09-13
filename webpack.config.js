const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const url = require('url')
const publicPath = '/'

const NODE_INSTALL = 0;//服务器端判别是否需要安装依赖

let env = process.env.NODE_ENV || 'dev';
console.log('当前环境是：' + env);
let host;
if(env == 'dev'){
    host = '../config/hostDev';
}else if(env == 'tes'){
    host = '../config/hostTest';
}else if(env == 'online'){
    host = '../config/hostOnline';
}

module.exports = (options = {}) => ({
    entry: {
        vendor: './vue/vendor',
        index: './vue/main.js'
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!sass-loader"})
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),//热替换 只替换更新的部分
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'vue/index.html',
            // favicon: 'vue/images/logo.ico'
        }),
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
        new webpack.LoaderOptionsPlugin({
            test: /\.vue$/,
            options: {
                vue: {
                    loaders: {
                        sass: ExtractTextPlugin.extract({
                            fallback: 'vue-style-loader',
                            use: 'css-loader!sass-loader',
                            publicPath: options.dev ? '/assets/' : publicPath
                        })
                    }
                }
            }
        }),
        new ExtractTextPlugin({filename:"css/[name].css?[chunkhash]",allChunks: true}),//打包输出路径
    ],
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader',
        },
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'vue'),
            Host: host
        }
    },
    devServer: {
        inline: true,//自动刷新
        host: 'localhost',
        port: 8040,
        proxy: {
            '/proxy': {
                target: 'http://yjj-erp-test.imcome.net',
                // target: 'http://10.0.12.36:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            },
            '/pproxy': {
                target: 'http://yjj-moles-test.imcome.net',
                changeOrigin: true,
                pathRewrite: {
                    '^/pproxy': ''
                }
            },
            '/psroxy': {
                target: 'http://yjj-sns-test.imcome.net',
                changeOrigin: true,
                pathRewrite: {
                    '^/psroxy': ''
                }
            },
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname
        }
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map'
})