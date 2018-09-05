const path = require('path');

const PROJECT_TITLE    = 'Portfolio';
const CONTENT_BASE     = 'src';
const DEVSERVER_PORT   = 3000;
const BROWSERSYNC_PORT = 4000;
const ROOT_DIR         = path.resolve(__dirname, '../../');
const STATIC_PATH      = path.resolve(__dirname, '../../');
const NODE_DIR         = ROOT_DIR + '/' + 'node_modules';
const SRC_DIR          = ROOT_DIR + '/' + CONTENT_BASE;
const TEMPLATE_DIR     = ROOT_DIR + '/' + 'buildtools/templates';
const LIBS_DIR         = SRC_DIR + '/' + 'js/libs';

exports.PROJECT_TITLE    = PROJECT_TITLE;
exports.CONTENT_BASE     = CONTENT_BASE;
exports.DEVSERVER_PORT   = DEVSERVER_PORT;
exports.BROWSERSYNC_PORT = BROWSERSYNC_PORT;
exports.ROOT_DIR         = ROOT_DIR;
exports.STATIC_PATH      = STATIC_PATH;
exports.NODE_DIR         = NODE_DIR;
exports.SRC_DIR          = SRC_DIR;
exports.TEMPLATE_DIR     = TEMPLATE_DIR;
exports.LIBS_DIR         = LIBS_DIR;

exports.FONT_PATH  = 'css/fonts/[name].[ext]';
exports.IMAGE_PATH = 'images/site/[name].[ext]';

/**
 * Dev Server settings
 */
exports.devserver = {
    // host              : '192.168.1.80', // set to your localhost ip if you want to test on ios device etc
    open              : true,
    contentBase       : CONTENT_BASE,
    historyApiFallback: true,
    port              : DEVSERVER_PORT,
    hot               : true,
    inline            : true,
    compress          : true,
    stats             : {
        assets    : false,
        children  : false,
        chunks    : false,
        hash      : false,
        modules   : false,
        publicPath: false,
        timings   : true,
        version   : false,
        warnings  : false
    }
};