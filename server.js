const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const opener = require('opener');
const config = require('./webpack.config');
const host = '127.0.0.1';
const port = 3000;

new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: {
            colors: true // color is life
        },
        proxy:{"*":{target:"http://127.0.0.1:1337",secure:false}}
    })
    .listen(port, host, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Listening at ${host}:${port}`);
        opener(`http://${host}:${port}`);
    });
