const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        loggedin: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './client_scripts/custom_js/initialize'
        ],
        attendee:[            
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            "./client_scripts/custom_js/attendee.js"
        ]
    },
    output: {
        path: "/Users/akshaysingh/personal/event_manager/public/js",
        filename: '[name]_combined.js',
        publicPath: '/js/'
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