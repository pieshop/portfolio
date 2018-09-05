/* eslint-disable spaced-comment */

const Uglify = require('uglifyjs-webpack-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safeParser = require('postcss-safe-parser');
/************************************************
 *         O P T I M I S A T I O N
 *
 *         todo : sort this bit out : no inlining
 ************************************************/
exports.createInlineManifestChunk = (name) => ({
  optimization: {
    runtimeChunk: {
      name,
    },
  },
});

exports.nameModuleIDs = (val) => ({
  optimization: {
    namedModules: val,
  },
});

exports.createVendorChunk = (name) => ({
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name,
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
});

exports.minifyCSS = ({ sourceMap = true }) => ({
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: sourceMap ? { inline: false, annotation: true } : false,
          parser: safeParser,
          discardComments: { removeAll: true },
        },
        canPrint: true,
      }),
    ],
  },
});

exports.minifyJS = ({ sourceMap = true }) => ({
  optimization: {
    minimize: true,
    minimizer: [
      new Uglify({
        parallel: true,
        sourceMap: sourceMap,
        uglifyOptions: {
          ecma: 5,
          mangle: true,
          compress: {
            warnings: true,
            unused: true,
            dead_code: true,
            drop_console: false,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
