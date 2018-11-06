/* eslint-disable spaced-comment */

/****************************************
 *         D  E  V    S  E  R  V  E  R
 ***************************************/
exports.setDevServer = ({ open, host, contentBase, port }) => ({
  devServer: {
    host,
    open,
    contentBase,
    historyApiFallback: true,
    port,
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
    // CORS :: https://github.com/webpack/webpack-dev-server/issues/533
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
