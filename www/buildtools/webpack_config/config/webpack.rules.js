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
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                    browsers: ['>1%'],
                    ie: 11,
                  },
                  exclude: [],
                  debug: false,
                  corejs: '3',
                  useBuiltIns: 'usage',
                  modules: false,
                  loose: true,
                },
              ],
            ],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-transform-modules-commonjs', '@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
});

exports.extractCss = ({ cssOut = 'css', isHashed = false }) => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: isHashed ? cssOut + '/[name].[contenthash:8].css' : cssOut + '/[name].css',
      chunkFilename: isHashed ? cssOut + '/[name].[id].[contenthash:8].css' : cssOut + '/[name].[id].css',
      allChunks: true,
    }),
  ],
});

exports.compileSCSS = ({ extract = true, sourceMap = true }) => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          extract ? MiniCssExtractPlugin.loader : { loader: 'style-loader', options: { sourceMap } },
          {
            loader: 'css-loader',
            options: { sourceMap },
          },
          {
            loader: 'postcss-loader',
            options: {
              // plugins: () => {
              //   return [require('autoprefixer')({})];
              // },
              plugins: () => [
                require('autoprefixer')({}),
                require('cssnano')({
                  preset: ['default', { discardComments: { removeAll: true } }],
                }),
              ],
              sourceMap,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap,
              removeCR: true,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap },
          },
        ],
      },
    ],
  },
});

exports.loadStaticImageAssets = ({ name, context, publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: { name, context, publicPath },
        },
      },
    ],
  },
});

exports.loadStaticFontAssets = ({ name, context, publicPath }) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: { name, context, publicPath },
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
