const webpack = require('webpack');

module.exports = {
    entry: "./client_scripts/custom_js/initialize.js",
    output: {
        path: "./public/js",
        filename: "combined.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
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
                'DOMAIN': JSON.stringify('https://palmy-events.herokuapp.com'),
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

    