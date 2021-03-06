/**
 * https://medium.com/@tarkus/build-automation-with-vanilla-javascript-74639ec98bad
 * https://github.com/kriasoft/react-starter-kit
 * https://github.com/kriasoft/nodejs-api-starter
 */
import { copyFile } from './lib/fs';

const replace = require('replace');
const path = require('path');

const CONFIG_DIR = path.resolve(__dirname, '../buildtools/config/');
const TEMPLATE_DIR = path.resolve(__dirname, '../buildtools/templates/');
const cfg = require(CONFIG_DIR + '/app_config.js')();

function update(options) {
  const env = options.env;
  const VERSION = JSON.stringify(require('../package.json').version);

  let src = TEMPLATE_DIR + '/robots.txt';
  let dest = path.resolve('.', cfg[env] + '/robots.txt');
  let pattern = '{loc}';
  let replacement = cfg.env[env].base;
  const p1 = createCopyAndReplace(src, dest, pattern, replacement);

  src = `${TEMPLATE_DIR}/sitemap/${env}.xml`;
  dest = path.resolve('.', cfg[env] + '/sitemap.xml');
  pattern = cfg.env[env].sitemap_stylesheet_pattern;
  replacement = cfg.env[env].base;
  const p2 = createCopyAndReplace(src, dest, pattern, replacement);

  return Promise.all([p1, p2]);

  // src = path.resolve(__dirname, '../src/sw.js');
  // dest = path.resolve('.', cfg[env] + '/sw.js');
  // pattern = '{version}';
  // replacement = VERSION;
  // const p3 = createCopyAndReplace(src, dest, pattern, replacement);
  //
  // return Promise.all([p1, p2, p3]);
}

function createCopyAndReplace(src, dest, regex, replacement) {
  // console.info('createCopyAndReplace', src, dest, regex, replacement);
  return new Promise((resolve, reject) => {
    copyFile(src, dest)
      .then((results) => {
        replace({
          regex: regex,
          replacement: replacement,
          paths: [dest],
          recursive: false,
          silent: true,
        });
        console.info('Copied', dest);
        resolve(results);
      })
      .catch((message) => {
        reject('error', message);
      });
  });
}

export default update;
