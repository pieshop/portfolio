'use strict';

const webpackMerge      = require('webpack-merge');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Constants         = require('./Constants');
const Uglify            = require("uglifyjs-webpack-plugin");
const _base             = require('./base');

module.exports = function (options) {
    const COMPRESS = options.compress;

    const base = _base.defaults(options);
    _base.addVendorShortcut(base, 'TweenMax', Constants.NODE_DIR + '/gsap/src/uncompressed/TweenMax.js');

    function getPlugins() {
        const plugins = [];
        if (COMPRESS) {
            plugins.push(new Uglify({
                sourceMap    : true,
                uglifyOptions: {
                    ecma    : 6,
                    compress: {
                        warnings    : true,
                        unused      : true,
                        dead_code   : true,
                        drop_console: false,
                    },
                    output  : {
                        comments: false,
                    },
                },
            }));
        }
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', // all node_modules split to vendor
            minChunks(module, count) {
                const context = module.context;
                return context && context.indexOf('node_modules') >= 0 || context.indexOf('libs') >= 0;
            },
        }));
        plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }));
        plugins.push(new HtmlWebpackPlugin({
            title   : Constants.PROJECT_TITLE,
            template: Constants.TEMPLATE_DIR + '/index.ejs',
            filename: 'index.html',
            inject  : false,
            baseHref: '//stage.stephenhamilton.co.uk',
        }));
        return plugins;
    }

    return webpackMerge(base, {
        devtool  : 'source-map',
        entry  : {
            app: [Constants.SRC_DIR + '/js/index.js']
        },
        plugins: getPlugins(),
    });
};
