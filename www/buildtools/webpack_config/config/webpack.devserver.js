/* eslint-disable spaced-comment */
const PROJECT = require('../constants/project');
const PATHS = require('../constants/paths');

/****************************************
 *         D  E  V    S  E  R  V  E  R
 ***************************************/
exports.setDevServer = () => ({
  devServer: {
    // host: PROJECT.devserverHost,
    open: true,
    contentBase: PATHS.src,
    historyApiFallback: true,
    port: PROJECT.devserverPort,
    hot: true,
    inline: true,
    compress: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: false,
    },
  },
});
