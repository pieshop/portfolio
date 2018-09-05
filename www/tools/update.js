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

function update() {
  const env = process.argv[3].split('=')[1] || 'dev';
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
}

function createCopyAndReplace(src, dest, regex, replacement) {
  // console.log('createCopyAndReplace', src, dest, regex, replacement);
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
        resolve(results);
      })
      .catch((message) => {
        reject('error', message);
      });
  });
}

export default update;
