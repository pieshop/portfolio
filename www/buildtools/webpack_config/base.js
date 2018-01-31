'use strict';

/**
 * Code Splitting
 * https://medium.com/@adamrackis/vendor-and-code-splitting-in-webpack-2-6376358f1923#.2hihbme1u
 *
 * React
 * https://www.npmjs.com/package/react-noparse
 * expose React, if needed (see imports-loader)
 * {
 *    test: /(react-dom|react-router)\.js$/, // expose React
 *    loader: 'imports?React=react'
 *  }],
 *
 */
const path              = require('path');
const webpack           = require('webpack');
const autoprefixer      = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Clean             = require('clean-webpack-plugin');
const Copy              = require('copy-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.traceDeprecation = true;
process.noDeprecation    = true;

module.exports.defaults = function (options) {
    const TARGET          = options.target;
    const CONTENT_BASE    = 'src';
    const ROOT_DIR        = path.resolve(__dirname, '../../');
    const SRC_DIR         = ROOT_DIR + '/' + CONTENT_BASE;
    const OUTPUT_DIR      = ROOT_DIR + '/' + TARGET;
    const PUBLIC_PATH     = (TARGET === 'watch') ? '/' : '';
    const CSS_PUBLIC_PATH = (TARGET === 'watch') ? '/' : '../';
    const FONT_PATH       = 'css/fonts/[name].[ext]';
    const IMAGE_PATH      = 'images/[name].[ext]';
    const DEV_TOOL        = (TARGET === 'watch') ? 'eval' : 'source-map';
    const IS_DIST         = (TARGET === 'dist') ? true : false;
    const IS_WATCH        = (TARGET === 'watch') ? true : false;
    const ENV             = (IS_WATCH) ? 'development' : 'production';
    const IS_HASH         = true;

    console.log('ENV', ENV, '\nIS_WATCH', IS_WATCH, '\nIS_HASH', IS_HASH, '\noptions', options);

    const extractCSS = new ExtractTextPlugin({
        disable  : ENV === 'development', // disable plugin for development
        filename : IS_DIST ? 'css/[name].[contenthash].css' : 'css/[name].css',
        allChunks: true
    });

    const extractSass = new ExtractTextPlugin({
        disable  : ENV === 'development', // disable plugin for development
        filename : IS_DIST ? 'css/[name].[contenthash].css' : 'css/[name].css',
        allChunks: true
    });

    return {
        context    : SRC_DIR,
        devtool    : DEV_TOOL,
        output     : {
            path         : OUTPUT_DIR,
            publicPath   : PUBLIC_PATH || '',
            filename     : IS_DIST ? 'js/[name].[chunkhash].js' : 'js/[name].js',
            chunkFilename: '[chunkhash].js'
        },
        stats      : {
            errors      : true,
            errorDetails: true,
            modules     : true,
            reasons     : true,
            warnings    : false
        },
        module     : {
            noParse: [],
            rules  : [
                {
                    test: /config\.json$/,
                    use : {
                        loader : 'string-replace-loader',
                        options: options.replace_options
                    },
                },
                {
                    test   : /\.js$/, // include .js files
                    exclude: [/node_modules/, /libs/, /Dateformat.js/],
                    enforce: 'pre',
                    use    : {
                        loader : 'eslint-loader',
                        options: {cache: false, quiet: false, emitError: true, emitWarning: true}
                    }
                },
                {
                    //
                    // https://github.com/babel/babel-preset-env
                    // using babel-preset-env
                    //
                    test   : /\.js?$/,
                    exclude: [/node_modules/, /libs/],
                    use    : {
                        loader : 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {loose: true, modules: false}],
                                'react',
                                ['env',
                                    {
                                        targets    : {
                                            browsers: [
                                                'last 2 versions',
                                                'IE >= 11'
                                            ]
                                        },
                                        useBuiltIns: true
                                    }]
                            ],
                            // plugins: ['react-hot-loader/babel', 'react-html-attrs', 'transform-class-properties']
                            plugins: ['react-html-attrs', 'transform-class-properties']
                        },
                    },
                },
                {
                    test: /\.json$/,
                    use : ['json-loader']
                },
                {
                    test: /\.css$/,
                    use : extractCSS.extract({
                            fallback: 'style-loader',
                            use     : [
                                {loader: 'css-loader', options: {minimize: IS_DIST, sourceMap: IS_DIST}}
                            ]
                        }
                    )
                },
                {
                    test: /\.scss$/,
                    use : extractSass.extract({
                            fallback: 'style-loader',
                            use     : [
                                {loader: 'css-loader', options: {minimize: IS_DIST, sourceMap: IS_DIST}},
                                {
                                    loader: 'postcss-loader', options: {
                                    plugins: () => {
                                        return [
                                            require('autoprefixer')({browsers: 'last 2 versions'})
                                            // require('autoprefixer')({browsers: 'last 4 versions'})
                                            // require('autoprefixer')({browsers: ['> 3%']}})
                                        ];
                                    }
                                }
                                },
                                'sass-loader'
                            ]
                        }
                    )
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use : {
                        loader : 'file-loader',
                        options: {name: IMAGE_PATH, publicPath: CSS_PUBLIC_PATH}
                    }
                    //     use : {
                    //         loader : 'url-loader',
                    //         options: {name: 'images/[name].[ext]', limit: 8192}
                    //     }
                },
                //
                // url-loader = inline small files, file-loader = seperate requests
                //
                {
                    test: /\.(woff|woff2)/,
                    use : {
                        loader : 'file-loader',
                        options: {name: FONT_PATH, publicPath: CSS_PUBLIC_PATH}

                    },
                },
                {
                    test: /\.(ttf|svg)/,
                    use : {
                        loader : 'file-loader',
                        options: {name: FONT_PATH, publicPath: CSS_PUBLIC_PATH}
                    }
                },
                {
                    test: /\.(eot)/,
                    use : {
                        loader : 'file-loader',
                        options: {name: FONT_PATH, publicPath: CSS_PUBLIC_PATH}
                    }
                }
            ]
        },
        resolve    : {
            extensions: ['.js', '.jsx', '.json', '.css', '.hbs', '.styl'],
            modules   : [
                SRC_DIR + '/js',
                'libs',
                'node_modules'
            ],
            alias     : {}
        },
        plugins    : [
            // new BundleAnalyzerPlugin({analyzerMode: 'static'}),
            (!IS_WATCH ? new Clean([OUTPUT_DIR], {root: ROOT_DIR, verbose: true, dry: false, exclude: []}) : null),
            (!IS_WATCH ? new Copy([
                {from: SRC_DIR + '/assets/json/archives/', to: OUTPUT_DIR + '/assets/json/archives/'},
                {from: SRC_DIR + '/images/', to: OUTPUT_DIR + '/images/'},
                {from: SRC_DIR + '/sitemap/', to: OUTPUT_DIR + '/sitemap/'},
                {from: SRC_DIR + '/*.{ico,txt,xml,json,png,svg}', to: OUTPUT_DIR + '/'},
                {from: SRC_DIR + '/.htaccess', to: OUTPUT_DIR + '/'},
                {from: SRC_DIR + '/google6acd2b3e4bad34ba.html', to: OUTPUT_DIR + '/'},
                {from: SRC_DIR + '/y_key_80c280816d539335.html', to: OUTPUT_DIR + '/'}
            ], {
                ignore           : [
                    // '*.svg', // Doesn't copy any files with a svg extension
                    // {glob: 'styl/**/*', dot: true}, // Doesn't copy any file, even if they start with a dot
                ], copyUnmodified: true
            }) : null),
            new webpack.DefinePlugin({
                '__SERVICE_WORKER__': TARGET === 'dist',
                'process.env'       : {
                    NODE_ENV: JSON.stringify(ENV),

                }
            }),
            new webpack.ProvidePlugin({
                React : 'react',
                Tether: 'tether'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                options : {
                    context: '/'
                }
            }),
            extractCSS,
            extractSass
        ].filter((p) => p),
        performance: {
            maxAssetSize     : 100000,
            maxEntrypointSize: 300000,
            // hints: 'warning'
            hints            : false
        },
        node       : {
            fs: 'empty'
        }
    };
};

/**
 * Add vendor shortcuts to speed up dev build. Shouldn't be used for production build!
 *
 * config.resolve.alias     : Configure a resolver, so we can still use require and import (see resolve.alias)
 * config.module.noParse    : Tell webpack to exclude the module (see module.noParse)
 *
 * SEE : https://www.npmjs.com/package/react-noparse
 *
 * expose React, if needed (see imports-loader)
 * {
 *    test: /(react-dom|react-router)\.js$/, // expose React
 *    loader: 'imports?React=react'
 *  }],
 */
module.exports.addVendorShortcut = function (config, name, path) {
    if (!config.module.noParse) {
        config.module.noParse = [];
    }
    config.resolve.alias[name] = path;
    config.module.noParse.push(new RegExp('^' + name + '$'));
};
module.exports.addVendorsShortcuts = function (_base, defaults, NODE_DIR, LIBS_DIR) {
    // _base.addVendorShortcut(defaults, 'react', NODE_DIR + '/react/dist/react.js');
    // _base.addVendorShortcut(defaults, 'react-dom', NODE_DIR + '/react-dom/dist/react-dom.js');
    // _base.addVendorShortcut(defaults, 'react-router-dom', NODE_DIR + '/react-router-dom/umd/react-router-dom.js');
    // _base.addVendorShortcut(defaults, 'flux', NODE_DIR + '/flux/dist/flux.js');
    _base.addVendorShortcut(defaults, 'bootstrap.css', NODE_DIR + '/bootstrap/dist/css/bootstrap.css');
    // _base.addVendorShortcut(defaults, 'tether', NODE_DIR + '/tether/dist/js/tether.js');
    // _base.addVendorShortcut(defaults, 'lodash', NODE_DIR + '/lodash/lodash.js');
    _base.addVendorShortcut(defaults, 'TweenMax', NODE_DIR + '/gsap/src/uncompressed/TweenMax.js');
    _base.addVendorShortcut(defaults, 'superagent-client', NODE_DIR + '/superagent/lib/client.js');
    _base.addVendorShortcut(defaults, 'swfobject', LIBS_DIR + '/swfobject.js');
};
