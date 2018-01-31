'use strict';

const webpackMerge                = require('webpack-merge');
const path                        = require('path');
const webpack                     = require('webpack');
const HtmlWebpackPlugin           = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const _base                       = require('./base');

const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = function (options) {
    const CONTENT_BASE = 'src';
    const ROOT_DIR     = path.resolve(__dirname, '../../');
    const NODE_DIR     = ROOT_DIR + '/' + 'node_modules';
    const SRC_DIR      = ROOT_DIR + '/' + CONTENT_BASE;
    const PUBLIC_PATH  = options.cdn;
    const TEMPLATE_DIR = ROOT_DIR + '/' + 'buildtools/templates';

    const base = _base.defaults(options);
    _base.addVendorShortcut(base, 'TweenMax', NODE_DIR + '/gsap/src/uncompressed/TweenMax.js');

    return webpackMerge(base, {
        entry  : {
            app: [SRC_DIR + '/js/index.js']
        },
        output : {
            publicPath: PUBLIC_PATH
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                beautify : false,
                compress : {
                    warnings    : false,
                    unused      : true,
                    dead_code   : true,
                    drop_console: false
                },
                mangle   : true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor', // all node_modules split to vendor
                minChunks(module, count) {
                    const context = module.context;
                    return context && context.indexOf('node_modules') >= 0 || context.indexOf('libs') >= 0;
                },
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest'
            }),
            new HtmlWebpackPlugin({
                title          : 'Portfolio',
                template       : TEMPLATE_DIR + '/index.ejs',
                filename       : 'index.html',
                inject         : false,
                googleAnalytics: {
                    trackingId    : 'UA-551725-1',
                    pageViewOnLoad: true
                },
                baseHref       : '//www.stephenhamilton.co.uk'
            }),
            new InlineManifestWebpackPlugin({
                name: 'webpackManifest'
            }),
            new ServiceWorkerWebpackPlugin({
                entry   : SRC_DIR + '/sw.js',
                excludes: [
                    '*.xml',
                    '*.txt',
                    '.htaccess',
                    '**/*.map',
                    '*.html',
                    '**/*.xsl',
                    'sw.js',
                    '**/.DS_Store',
                    'node_modules'
                ]
            })
        ]
    });
};
