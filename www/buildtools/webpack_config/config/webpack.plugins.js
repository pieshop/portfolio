/* eslint-disable spaced-comment */
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const VersionFile = require('webpack-version-file-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
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

exports.cleanDirectory = ({ cleanOptions }) => ({
  plugins: [new CleanWebpackPlugin(cleanOptions)],
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

exports.generateHTML = ({ title, template, filename = 'index.html', writeHTMLToDisk = false, opts }) => ({
  plugins: [
    new HTMLWebpackPlugin({
      title,
      template,
      filename,
      inject: false,
      alwaysWriteToDisk: writeHTMLToDisk,
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
exports.inlineManifest = (name) => ({
  plugins: [new InlineManifestWebpackPlugin(name)],
});

exports.provideJquery = () => ({
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
});

exports.provideReact = () => ({
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});

exports.createVersionFile = ({ packageFile, template, outputFile }) => ({
  plugins: [
    new VersionFile({ packageFile, template, outputFile })
  ],
});
/****************************************
 *         S E R V I C E   W O R K E R
 ***************************************/
// exports.addServiceWorker = ({ entry, publicPath }) => ({
//   plugins: [
//     new WorkboxPlugin.InjectManifest({
//       swSrc: entry,
//     })
//   ]
// });
exports.addServiceWorker = ({ entry, name = 'sw.js' }) => ({
  plugins: [
    new InjectManifest({
      swSrc: entry + name,
      swDest: name,
      importWorkboxFrom: 'local',
      importsDirectory: 'workbox',
      // include: [/index.html/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/, /\.woff$/, /\.ttf$/],
      // exclude: [/\.DS_Store$/, /\.txt/, /y_key_80c280816d539335.html/, /google6acd2b3e4bad34ba.html/],
      include: [/\.js$/, /\.css$/, /\.jpg$/, /\.png$/, /\.woff$/, /\.ttf$/, /version.json/],
      exclude: [/\.DS_Store$/, /\.txt/, /\..html$/],


      // clientsClaim: true,
      // skipWaiting: true,
      // navigateFallback: '/index.html',
      // navigateFallbackWhitelist: [/^\/about/, /^\/all/, /^\/olm/],
      // runtimeCaching: [
      //   // {  urlPattern: '/', handler: 'staleWhileRevalidate' },
      //   // {  urlPattern: /(?:about|all|web|olm|game|responsive|app)$/, handler: 'networkFirst', options: { cacheName: 'pages-cache' } },
      //   {  urlPattern: /about/, handler: 'networkFirst' },
      //   {  urlPattern: /all/, handler: 'networkFirst' },
      //   {  urlPattern: /web/, handler: 'networkFirst' },
      //   {  urlPattern: /olm/, handler: 'networkFirst' },
      //   {  urlPattern: /game/, handler: 'networkFirst' },
      //   {  urlPattern: /responsive/, handler: 'networkFirst' },
      //   {  urlPattern: /app/, handler: 'networkFirst' },
      //   {  urlPattern: /^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:png|gif|jpg|svg)$/, handler: 'cacheFirst', options: { cacheName: 'images-cache' } },
      //   {  urlPattern: /^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:json)$/, handler: 'cacheFirst', options: { cacheName: 'json-cache' } },
      //   {  urlPattern: /^https:\/\/api.stephenhamilton\.co\.uk.*$/, handler: 'staleWhileRevalidate', options: { cacheName: 'api-cache' } },
      // ],
      // navigateFallbackBlacklist: [/admin/, /shop/],
    })
  ]
});
