var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/entry.js',
    output: {
        path: "./public/assets",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ["style", "css"]
            },
            {
                test: /\.sass$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.js$/,
                loader: "babel",
                query: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.html/,
                loader: "html"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            marked: 'marked'
        })
    ],
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, "node_modules/bootstrap-sass/assets/stylesheets")
        ]
    }
};
