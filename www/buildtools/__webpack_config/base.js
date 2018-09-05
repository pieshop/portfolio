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
const glob                 = require('glob');
const webpack              = require('webpack');
const ExtractTextPlugin    = require('extract-text-webpack-plugin');
const Clean                = require('clean-webpack-plugin');
const Copy                 = require('copy-webpack-plugin');
const PurgecssPlugin       = require('purgecss-webpack-plugin');
const Constants            = require('./Constants');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.traceDeprecation = true;
process.noDeprecation    = true;

module.exports.defaults = function (options) {
    const TARGET          = options.target;
    const REPLACE_OPTIONS = options.replace_options;
    const OUTPUT_DIR      = Constants.ROOT_DIR + '/' + options.output;
    const PUBLIC_PATH     = (TARGET === 'watch') ? '/' : '';
    const CSS_PUBLIC_PATH = (TARGET === 'watch') ? '/' : '../';
    const IS_DIST         = (TARGET === 'dist') ? true : false;
    const IS_WATCH        = (TARGET === 'watch') ? true : false;
    const ENV             = (IS_WATCH || TARGET === 'dev') ? 'development' : 'production';
    const IS_HASHED       = IS_DIST ? true : false;

    console.log('ENV', ENV, '\nIS_DIST', IS_DIST, '\nIS_WATCH', IS_WATCH, '\nIS_HASHED', IS_HASHED, '\noptions', options);

    const extractCSS = new ExtractTextPlugin({
        disable  : IS_WATCH, // disable plugin for watch
        filename : IS_HASHED ? 'css/[name].[contenthash].css' : 'css/[name].css',
        allChunks: true
    });

    const extractSass = new ExtractTextPlugin({
        disable  : IS_WATCH, // disable plugin for watch
        filename : IS_HASHED ? 'css/[name].[contenthash].css' : 'css/[name].css',
        allChunks: true
    });

    // COPY
    const copyPaths   = [
        {from: Constants.SRC_DIR + '/assets/json/archives/', to: OUTPUT_DIR + '/assets/json/archives/'},
        {from: Constants.SRC_DIR + '/images/', to: OUTPUT_DIR + '/images/'},
        {from: Constants.SRC_DIR + '/offline/', to: OUTPUT_DIR + '/offline/'},
        {from: Constants.SRC_DIR + '/sitemap/', to: OUTPUT_DIR + '/sitemap/'},
        {from: Constants.SRC_DIR + '/*.{ico,txt,xml,json,png,svg}', to: OUTPUT_DIR + '/'},
        {from: Constants.SRC_DIR + '/.htaccess', to: OUTPUT_DIR + '/'},
        {from: Constants.SRC_DIR + '/google6acd2b3e4bad34ba.html', to: OUTPUT_DIR + '/'},
        {from: Constants.SRC_DIR + '/y_key_80c280816d539335.html', to: OUTPUT_DIR + '/'}
    ];
    const copyOptions = {
        ignore           : [
            // '*.svg', // Doesn't copy any files with a svg extension
            // {glob: 'styl/**/*', dot: true}, // Doesn't copy any file, even if they start with a dot
        ], copyUnmodified: true
    };

    function getPlugins() {
        const plugins = [];
        // plugins.push(new BundleAnalyzerPlugin({analyzerMode: 'static'}));
        if (!IS_WATCH) {
            plugins.push(new Clean([OUTPUT_DIR], {root: Constants.ROOT_DIR, verbose: true, dry: false, exclude: []}));
            plugins.push(new Copy(copyPaths, copyOptions));
        }
        plugins.push(new webpack.DefinePlugin({
            '__SERVICE_WORKER__': TARGET === 'dist',
            'process.env'       : {
                NODE_ENV: JSON.stringify(ENV),
            },
        }));
        plugins.push(new webpack.ProvidePlugin({
            React : 'react',
            Tether: 'tether'
        }));
        plugins.push(new webpack.NamedModulesPlugin());
        plugins.push(new webpack.LoaderOptionsPlugin({
            minimize: true,
            options : {
                context: '/'
            }
        }));
        plugins.push(extractCSS);
        plugins.push(extractSass);

        // console.log('GLOB', glob.sync(Constants.TEMPLATE_DIR+'/index.ejs'));
        // if (IS_DIST) {
        //     plugins.push(new PurgecssPlugin({
        //         keyframes: false, // https://goo.gl/bACbDW
        //         styleExtensions: ['.css'],
        //         paths: [Constants.TEMPLATE_DIR+'/index.ejs', ...glob.sync(Constants.SRC_DIR+'/**/*.js', { nodir: true })],
        //         // extractors: [
        //         //     {
        //         //         // https://goo.gl/hr6mdb
        //         //         extractor: class AvoidBacktickIssue {
        //         //             static extract(content) {
        //         //                 return content.match(/[A-Za-z0-9_-]+/g) || [];
        //         //             }
        //         //         },
        //         //         extensions: ['js'] // file extensions
        //         //     }
        //         // ]
        //     }));
        // }
        return plugins;
    }

    return {
        context    : Constants.SRC_DIR,
        output     : {
            path         : OUTPUT_DIR,
            publicPath   : PUBLIC_PATH || '',
            filename     : IS_HASHED ? 'js/[name].[chunkhash].js' : 'js/[name].js',
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
            rules: [
                {
                    test: /config\.json$/,
                    use : {
                        loader : 'string-replace-loader',
                        options: REPLACE_OPTIONS
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
                            cacheDirectory: false,
                            presets       : [
                                'react',
                                ['env',
                                    {
                                        targets    : {
                                            browsers: [
                                                '>1%',
                                            ],
                                            ie      : 11,
                                        },
                                        exclude    : ['transform-regenerator'],
                                        debug      : false,
                                        uglify     : true,
                                        useBuiltIns: true,
                                        modules    : false,
                                        loose      : true,
                                        compact    : true,
                                        node       : 'current',
                                    }]
                            ],
                            plugins       : ['react-hot-loader/babel', 'react-html-attrs', 'transform-class-properties', 'transform-object-rest-spread']
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
                                        sourceMap: IS_DIST,
                                        plugins  : () => {
                                            return [
                                                // require('precss'),
                                                require('autoprefixer')({browsers: 'last 2 versions'}),
                                                // require('autoprefixer')({browsers: 'last 4 versions'})
                                                // require('autoprefixer')({browsers: ['> 3%']}})
                                                // require('cssnano')()
                                            ];
                                        }
                                    }
                                },
                                {loader: 'sass-loader', options: {sourceMap: IS_DIST}},
                            ]
                        }
                    )
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use : {
                        loader : 'file-loader',
                        options: {name: Constants.IMAGE_PATH, publicPath: CSS_PUBLIC_PATH}
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
                        options: {name: Constants.FONT_PATH, publicPath: CSS_PUBLIC_PATH}

                    },
                },
                {
                    test: /\.(ttf|svg)/,
                    use : {
                        loader : 'file-loader',
                        options: {name: Constants.FONT_PATH, publicPath: CSS_PUBLIC_PATH}
                    }
                },
                {
                    test: /\.(eot)/,
                    use : {
                        loader : 'file-loader',
                        options: {name: Constants.FONT_PATH, publicPath: CSS_PUBLIC_PATH}
                    }
                }
            ]
        },
        resolve    : {
            extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
            modules   : [
                Constants.SRC_DIR + '/js',
                'libs',
                'node_modules'
            ],
            alias     : {}
        },
        plugins    : getPlugins(),
        performance: {
            maxAssetSize     : 100000,
            maxEntrypointSize: 300000,
            // hints: 'warning'
            hints            : false
        },
        node       : {
            fs : 'empty',
            net: 'empty',
            tls: 'empty',
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
    _base.addVendorShortcut(defaults, 'bootstrap.css', NODE_DIR + '/bootstrap/dist/css/bootstrap.css');
    _base.addVendorShortcut(defaults, 'TweenMax', NODE_DIR + '/gsap/src/uncompressed/TweenMax.js');
    _base.addVendorShortcut(defaults, 'superagent-client', NODE_DIR + '/superagent/lib/client.js');
    _base.addVendorShortcut(defaults, 'swfobject', LIBS_DIR + '/swfobject.js');
};
