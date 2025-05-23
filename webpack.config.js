const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        list: "./src/view/list/list.js",
        info: "./src/view/info/info.js",
        create: "./src/view/create/create.js",
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
    ]

}