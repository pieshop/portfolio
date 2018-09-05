'use strict';
/**
 * React HMR :
 * https://webpack.js.org/guides/hmr-react/
 * https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/30
 */
const webpackMerge      = require('webpack-merge');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const Constants         = require('./Constants');
const _base = require('./base');

module.exports = function (options) {
    const base = _base.defaults(options);
    _base.addVendorsShortcuts(_base, base, Constants.NODE_DIR, Constants.LIBS_DIR);

    function getPlugins() {
        // new BrowserSyncPlugin(
        //     {
        //         host : 'localhost',
        //         port : Constants.BROWSERSYNC_PORT,
        //         // proxy the Webpack Dev Server endpoint (which should be serving on http://localhost:4000/) through BrowserSync
        //         proxy: 'http://localhost:'+Constants.DEVSERVER_PORT+'/',
        //     },
        //     {
        //         // prevent BrowserSync from reloading the page and let Webpack Dev Server take care of this
        //         reload: false,
        //     }
        // )
        const plugins = [];
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // all node_modules split to vendor
            minChunks(module, count) {
                const context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            },
        }));
        plugins.push(new HtmlWebpackPlugin({
            title   : Constants.PROJECT_TITLE,
            template: Constants.TEMPLATE_DIR + '/index_watch.ejs',
            filename: 'index.html',
            inject  : false,
            baseHref       : '//localhost:'+Constants.DEVSERVER_PORT,
        }));
        return plugins;
    }

    return webpackMerge(base, {
        devtool  : 'eval', // 'eval-cheap-module-source-map'
        entry    : {
            app: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:' + Constants.DEVSERVER_PORT,
                'webpack/hot/only-dev-server',
                Constants.SRC_DIR + '/js/index.js'
            ]
        },
        devServer: Constants.devserver,
        plugins  : getPlugins(),
    });
};
