const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        list: "./src/view/list/list.js",
        info: "./src/view/info/info.js",
        create: "./src/view/create/create.js",
        edit: "./src/view/edit/edit.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: 'style-loader'
                }, {
                    // translates CSS into CommonJS modules
                    loader: 'css-loader'
                }, {
                    // Run postcss actions
                    loader: 'postcss-loader',
                    options: {
                        // `postcssOptions` is needed for postcss 8.x;
                        // if you use postcss 7.x skip the key
                        postcssOptions: {
                            // postcss plugins, can be exported to postcss.config.js
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }
                }, {
                    // compiles Sass to CSS
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
                        }
                    }

                }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/view/list/list.html",
            filename: "list.html",
            chunks: ["list"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/info/info.html",
            filename: "info.html",
            chunks: ["info"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/create/create.html",
            filename: "create.html",
            chunks: ["create"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/view/edit/edit.html",
            filename: "edit.html",
            chunks: ["edit"]
        }),
    ]

}