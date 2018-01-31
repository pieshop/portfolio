'use strict';
/**
 * React HMR :
 * https://webpack.js.org/guides/hmr-react/
 * https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30
 */
const webpackMerge      = require('webpack-merge');
const path              = require('path');
const webpack           = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const _base = require('./base');

module.exports = function (options) {
    const CONTENT_BASE     = 'src';
    const DEVSERVER_PORT   = 3000;
    const BROWSERSYNC_PORT = 4000;
    const ROOT_DIR         = path.resolve(__dirname, '../../');
    const NODE_DIR         = ROOT_DIR + '/' + 'node_modules';
    const SRC_DIR          = ROOT_DIR + '/' + CONTENT_BASE;
    const LIBS_DIR         = SRC_DIR + '/' + 'js/libs';

    const base = _base.defaults(options);
    _base.addVendorsShortcuts(_base, base, NODE_DIR, LIBS_DIR);

    return webpackMerge(base, {
        entry    : {
            app: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:'+DEVSERVER_PORT,
                'webpack/hot/only-dev-server',
                SRC_DIR + '/js/index.js'
            ]
        },
        devServer: {
            open              : true,
            contentBase       : CONTENT_BASE,
            historyApiFallback: true,
            port              : DEVSERVER_PORT,
            hot               : true,
            inline            : true,
            compress          : true,
            stats             : {
                assets    : false,
                children  : false,
                chunks    : false,
                hash      : false,
                modules   : false,
                publicPath: false,
                timings   : true,
                version   : false,
                warnings  : false
            }
        },
        plugins  : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor', // all node_modules split to vendor
                minChunks(module, count) {
                    const context = module.context;
                    return context && context.indexOf('node_modules') >= 0;
                },
            }),
            // new BrowserSyncPlugin(
            //     {
            //         host : 'localhost',
            //         port : BROWSERSYNC_PORT,
            //         // proxy the Webpack Dev Server endpoint (which should be serving on http://localhost:4000/) through BrowserSync
            //         proxy: 'http://localhost:'+DEVSERVER_PORT+'/',
            //     },
            //     {
            //         // prevent BrowserSync from reloading the page and let Webpack Dev Server take care of this
            //         reload: false,
            //     }
            // )
        ]
    });
};
