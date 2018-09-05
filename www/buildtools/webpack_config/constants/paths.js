const path = require('path');
const CONTENT_BASE = 'src';
const TEMPLATES = 'buildtools/templates';
const LIBS = 'js/libs';
const projectRoot = path.resolve(__dirname, '../../../');
const root = projectRoot;
const dev = path.join(projectRoot, 'dev');
const dist = path.join(projectRoot, 'dist');
const stage = path.join(projectRoot, 'stage');
const stage_nas = path.join(projectRoot, 'stage_nas');
const src = path.join(root, CONTENT_BASE);
const nodeDir = path.join(root, 'node_modules');

const APP_ENTRY_FILE = '/js/index.js';

const PATHS = {
  projectRoot,
  root,
  dist,
  dev,
  stage,
  stage_nas,
  nodeDir,
  src,
  templateDir: path.join(root, TEMPLATES),
  libsDir: path.join(root, LIBS),
  fonts: 'css/fonts/[name].[ext]',
  images: 'images/site/[name].[ext]',
  entryFile: src + APP_ENTRY_FILE,
};

module.exports = PATHS;
