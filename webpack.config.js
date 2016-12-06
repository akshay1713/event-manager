const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './client_scripts/custom_js/initialize'
    ],
    output: {
        path: "/Users/akshaysingh/personal/event_manager/public/js",
        filename: 'combined.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query:
            {
                presets:['es2015', 'react', 'stage-0']
            }
        }]
    }
};