const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './public/index.html'
});

const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve('public'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]

    },
    plugins: [htmlPlugin]
};