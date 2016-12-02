const webpack = require('webpack');

module.exports = {
    entry: "./client_scripts/custom_js/initialize.js",
    output: {
        path: "/Users/akshaysingh/personal/event-manager/public/js",
        filename: "combined.js",
        publicPath: "/js/"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /(node_modules|bower_components)/,
            query:
            {
                presets:['es2015', 'react', 'stage-0']
            }
        }]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'DOMAIN': JSON.stringify('https://localhost:1337')
            }
        })
    ]
};

    