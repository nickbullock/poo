const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaserStateTransitionModule = path.join(__dirname, '/node_modules/phaser-state-transition/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const phaserStateTransition = path.join(phaserStateTransitionModule, 'dist/phaser-state-transition.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const lodash = path.join(__dirname, '/node_modules/lodash/');

const definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, 'src/index.js')
        ],
        vendor: ['pixi', 'p2', 'phaser', 'webfontloader', 'phaser-state-transition', 'lodash']
    },
    devtool: 'cheap-source-map',
    output: {
        pathinfo: true,
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    watch: true,
    plugins: [
        definePlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'/* chunkName= */,
            filename: 'vendor.bundle.js'/* filename= */
        }),
        new BrowserSyncPlugin({
            host: process.env.IP || 'localhost',
            port: process.env.PORT || 3000,
            server: {
                baseDir: ['./', './dist']
            }
        })
    ],
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
            {test: /\.json$/, include: path.join(__dirname, 'src')},
            {test: /\.json$/, include: path.join(__dirname, 'static')},
            {test: /pixi\.js/, use: ['expose-loader?PIXI']},
            {test: /phaser-split\.js$/, use: ['expose-loader?Phaser']},
            {test: /p2\.js/, use: ['expose-loader?p2']},
            {test: /phaser-state-transition\.js/, use: ['expose-loader?StateTransition']},
            {test: /lodash\.js/, use: ['expose-loader?_']}
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
            '_': lodash,
            'StateTransition': phaserStateTransition
        }
    }
};
