const path = require('path');
const CONTENT_BASE = 'src';
const TEMPLATES = 'buildtools/templates';
const LIBS = 'js/libs';
const projectRoot = path.resolve(__dirname, '../../../');
const root = projectRoot;
const dist = path.join(projectRoot, '{dir}');
const htmlOutPath = dist;
const src = path.join(root, CONTENT_BASE);
const nodeDir = path.join(root, 'node_modules');

const PATHS = {
  projectRoot,
  root,
  dist,
  nodeDir,
  src,
  templateDir: path.join(root, TEMPLATES),
  libsDir: path.join(root, LIBS),
  fonts: 'css/fonts/[name].[ext]',
  images: 'images/[name].[ext]',
  entryFile: src + '/js/index.js',
  contentBase: CONTENT_BASE,
  htmlOutPath: htmlOutPath,
  cssOut: 'css',
  jsOut: 'js',
};

module.exports = PATHS;
