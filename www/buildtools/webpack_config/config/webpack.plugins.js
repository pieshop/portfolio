/* eslint-disable spaced-comment */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ServiceWorkerWebpackPlugin  = require("serviceworker-webpack-plugin");

/****************************************
 *         P  L  U  G  I  N  S
 ***************************************/
exports.generateDevSourceMaps = ({ exclude }) => ({
  plugins: [
    new webpack.EvalSourceMapDevToolPlugin({
      exclude,
      columns: true,
      test: /\.css?|\.jsx?|\.js?$/,
      filename: 'sourcemaps/[file].map',
    }),
  ],
});

exports.generateDistSourceMaps = ({ exclude }) => ({
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      exclude,
      columns: true,
      test: /\.css?|\.jsx?|\.js?$/,
      filename: 'sourcemaps/[file].map',
    }),
  ],
});

exports.define = ({ env = 'development', opts }) => ({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      ...opts,
    }),
  ],
});

exports.setLoaderOptions = ({ minimise = true, options }) => ({
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: minimise,
      options: options,
    }),
  ],
});

exports.cleanDirectory = ({ cleanPaths, cleanOptions }) => ({
  plugins: [new CleanWebpackPlugin(cleanPaths, cleanOptions)],
});

/**
 * https://webpack.js.org/plugins/module-concatenation-plugin/
 */
exports.enableScopeHoisting = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
});

exports.copy = ({ copyPaths, copyOptions = {} }) => ({
  plugins: [new CopyWebpackPlugin(copyPaths, copyOptions)],
});

exports.setExtraPlugins = (pluginsArray) => ({
  plugins: pluginsArray,
});

exports.runWebpackBundleAnalyzer = () => ({
  plugins: [new BundleAnalyzerPlugin()],
});

// https://webpack.js.org/guides/caching/
// https://webpack.js.org/plugins/hashed-module-ids-plugin/
// USE FOR PRODUCTION
exports.hashModuleIDs = () => ({
  plugins: [
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4,
    }),
  ],
});

exports.writeHTMLtoDisk = ({ outputPath }) => ({
  plugins: [
    new HtmlWebpackHarddiskPlugin({
      outputPath: outputPath,
    }),
  ],
});

exports.generateHTML = ({
  title,
  template,
  filename = 'index.html',
  writeToDisk = false,
  opts,
}) => ({
  plugins: [
    new HTMLWebpackPlugin({
      title,
      template,
      filename,
      inject: false,
      alwaysWriteToDisk: writeToDisk,
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
      },
      ...opts,
    }),
  ],
});

/**
 * This isn't working atm - so am using EJS templates to inline manifest!!!
 * htmlWebpackPlugin.files.js = array of js files
 * htmlWebpackPlugin.files.chunks = array of chunk info :  key : { size:x, entry:x, hash:x }
 * so I'm checking for the runtimeChunk - name defined in webpack config - and inlining the src
 */
exports.inlineManifest = () => ({
  plugins: [new InlineManifestWebpackPlugin('webpackManifest')],
});

exports.provideReact = () => ({
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});

/****************************************
 *         S E R V I C E   W O R K E R
 ***************************************/
exports.addServiceWorker = ({ entry }) => ({
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry,
      excludes: [
        "*.xml",
        "*.txt",
        ".htaccess",
        "**/*.map",
        "*.html",
        "**/*.xsl",
        "sw.js",
        "**/.DS_Store",
        "node_modules"
      ]
    })
  ]
});
