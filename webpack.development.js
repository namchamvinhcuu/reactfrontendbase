const webpack = require('webpack');
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        bundle: './src/index.js',
        // bundle: ["@babel/polyfill",'./src/index.js'],
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'js/[name].js',
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        open: true,
        stats: 'errors-only',
        inline: true,
        disableHostCheck: true,
        historyApiFallback: true,
        overlay: true,
        compress: true,
        // contentBase: path.join(__dirname, 'public'),
        //   publicPath: '/',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // },
        // hot: true,
        // proxy: {
        //     '/api': 'http://localhost:3000',
        // },
    },

    resolve: {
        extensions: ['.js', '.sass', '.json'],
        modules: ['node_modules'],
        alias: {
            "@node_modules": path.resolve(__dirname, './node_modules'),
            "@hooks": path.resolve(__dirname, './src/hooks'),
            '@controls': path.join(__dirname, './src/components/Control'),
            "@utils": path.resolve(__dirname, './src/utils'),
            "@services": path.resolve(__dirname, './src/services'),
            "@actions": path.resolve(__dirname, './src/store/actions'),
            // "@states": path.resolve(__dirname, './src/states'),
            // "@appstate": path.resolve(__dirname, './src/states/app'),

            // "@constants": path.resolve(__dirname, './src/constants'),
            // "@duck": path.resolve(__dirname, './src/state/duck'),
            // "@viewCommons": path.resolve(__dirname, './src/views/commons'),
            // "@containers": path.resolve(__dirname, './src/views/containers'),
            // "@components": path.resolve(__dirname, './src/views/components'),
            // "@styles": path.resolve(__dirname, './src/styles'),
            // "@basesControls": path.resolve(__dirname, './src/bases/controls'),

            // "@basesActions": path.resolve(__dirname, './src/bases/actions'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
                // query: {
                //     presets: ['es2015', 'stage-0', 'react'],
                // },
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /(node_modules)/,
            //     loader: [
            //         'babel-loader',
            //         StringReplacePlugin.replace({
            //             replacements: [
            //                 {
            //                     pattern: /(debugger[;]?)/ig,
            //                     replacement: function (match, p1, offset, string) {
            //                         return "";
            //                     }
            //                 }
            //             ]
            //         }),

            //     ],
            //     // options: {
            //     //     presets: ['@babel/env', '@babel/preset-react']
            //     // }
            //     // query: {
            //     //     presets: ['es2015', 'stage-0', 'react'],
            //     // },
            // },

            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.(scss|sass)$/,
                // use: [{
                //     loader: 'style-loader',
                // },
                // {
                //     loader: 'css-loader',
                // },
                // {
                //     loader: 'sass-loader',
                //     options: {
                //         includePaths: ['./app/styles'],
                //     },
                // }
                // ],
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',]
            },

            {
                test: /\.(ttf|eot|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //include: SRC,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts',
                },
            },
            {
                test: /\.(jpe?g|png|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                //include: SRC,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            {
                test: /\.ico$/,
                // include: SRC,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|mp3)$/i,
                //include: SRC,
                loaders: 'file-loader',
                options: {
                    outputPath: 'medias',
                },
            },
            {
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ],
                test: /\.less$/
            },

        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.$": "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            ignoreOrder: false,
            allChunks: true,

        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: 'vendor',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            // new OptimizeCssAssetsPlugin({}),

        ],
    }
};
