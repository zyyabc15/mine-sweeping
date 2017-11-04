var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: __dirname + "/src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/build"
    },
    devServer: {
        contentBase: __dirname,//
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval-source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /(\.ts|\.tsx)$/,
                enforce: 'pre',
                loader: 'tslint-loader',
            },
            {
                test: /(\.tsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /(\.js|\.tsx)$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                //同时引用两个loader
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            //模块化
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID？？？？
        new webpack.optimize.UglifyJsPlugin()//压缩js文件
        //new ExtractTextPlugin("style.css")
    ]

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.

};