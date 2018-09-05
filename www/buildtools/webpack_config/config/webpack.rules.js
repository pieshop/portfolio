/* eslint-disable spaced-comment */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/****************************************
 *         M  O  D  U  L  E
 ***************************************/
exports.transpileJavaScript = () => ({
  module: {
    rules: [
      {
        // using babel-preset-env : https://github.com/babel/babel-preset-env
        test: /\.js?$/,
        exclude: [/node_modules/, /libs/],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              'react',
              [
                'env',
                {
                  targets: {
                    browsers: ['>1%'],
                    ie: 11,
                  },
                  exclude: ['transform-regenerator'],
                  debug: false,
                  uglify: true,
                  useBuiltIns: true,
                  modules: false,
                  loose: true,
                  compact: true,
                  node: 'current',
                },
              ],
            ],
            plugins: [
              'react-hot-loader/babel',
              'react-html-attrs',
              'transform-class-properties',
              'transform-object-rest-spread',
            ],
          },
        },
      },
    ],
  },
});

exports.extractCss = ({ isProduction = false }) => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      chunkFilename: isProduction ? 'css/[name].[contenthash:8].css' : 'css/[name].css',
      allChunks: true,
    }),
  ],
});

exports.compileSCSS = ({ extract = true, isProduction = true, sourceMap = true }) => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          extract
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader', options: { sourceMap: sourceMap } },
          {
            loader: 'css-loader',
            options: { minimize: isProduction, sourceMap: sourceMap },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  require('autoprefixer')({ browsers: 'last 2 versions' }),
                  // require('autoprefixer')({browsers: ['> 3%']}})
                ];
              },
              sourceMap: sourceMap,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: sourceMap },
          },
        ],
      },
    ],
  },
});

exports.loadStaticImageAssets = ({ name, publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: { name, publicPath },
          // loader : 'url-loader',
          // options: { limit: 8000, name : `${relativePath}[name].[hash].[ext]`, },
        },
      },
    ],
  },
});

exports.loadStaticFontAssets = ({ name, publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: { name, publicPath },
          // loader : 'url-loader',
          // options: { limit: 8000, name : `${relativePath}[name].[hash].[ext]`, },
        },
      },
    ],
  },
});

/****************************************
 *         O  U  T  P  U  T
 ***************************************/
exports.replaceConfigOptions = (replaceOptions) => ({
  module: {
    rules: [
      {
        test: /config\.json$/,
        use: {
          loader: 'string-replace-loader',
          options: replaceOptions,
        },
      },
    ],
  },
});

/************************************************
 *         O P T I M I S A T I O N
 ************************************************/
exports.eslintPre = () => ({
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        exclude: [/node_modules/, /libs/, /Dateformat.js/],
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: { cache: false, quiet: false, emitError: true, emitWarning: true },
        },
      },
    ],
  },
});
