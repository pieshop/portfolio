/**
 * https://medium.com/@tarkus/build-automation-with-vanilla-javascript-74639ec98bad
 * https://github.com/kriasoft/react-starter-kit
 * https://github.com/kriasoft/nodejs-api-starter
 */
var curlr = require('curlrequest');
var fs = require('fs');
const replace = require('replace');
const path = require('path');

const CONFIG_DIR = path.resolve(__dirname, '../buildtools/config/');
const TEMPLATE_DIR = path.resolve(__dirname, '../buildtools/templates/');
const cfg = require(CONFIG_DIR + '/app_config.js')();
const protocol = 'http:';

function curl() {
  const p1 = createRequest(
    { url: protocol + cfg.env.imac.api_base + '/sitemap.xml', verbose: true },
    fs.createWriteStream(TEMPLATE_DIR + '/sitemap/imac.xml')
  );
  const p2 = createRequest(
    { url: protocol + cfg.env.mini.api_base + '/sitemap.xml', verbose: true },
    fs.createWriteStream(TEMPLATE_DIR + '/sitemap/mini.xml')
  );
  const p3 = createRequest(
    { url: protocol + cfg.env.stage.api_base + '/sitemap.xml', verbose: true },
    fs.createWriteStream(TEMPLATE_DIR + '/sitemap/stage.xml')
  );
  const p4 = createRequest(
    { url: protocol + cfg.env.live.api_base + '/sitemap.xml', verbose: true },
    fs.createWriteStream(TEMPLATE_DIR + '/sitemap/live.xml')
  );
  return Promise.all([p1, p2, p3, p4]);
}

function createRequest(options, file) {
  return new Promise((resolve, reject) => {
    curlr.request(options, (err, data) => {
      if (err) {
        // failed
        console.error(err);
        reject('error', err);
      } else {
        file.write(data);
        resolve(data);
        console.info('Generated ', options.url);
      }
    });
  });
}

export default curl;
