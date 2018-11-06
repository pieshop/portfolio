/**
 * https://medium.com/@tarkus/build-automation-with-vanilla-javascript-74639ec98bad
 * https://github.com/kriasoft/react-starter-kit
 * https://github.com/kriasoft/nodejs-api-starter
 */
const path = require('path');
const rsync = require('rsyncwrapper');
const CONFIG_DIR = path.resolve(__dirname, '../buildtools/config/');
const cfg = require(CONFIG_DIR + '/app_config.js')();

function sync(options) {
  const env = options.env;
  const src = path.resolve('.', cfg.src);
  const dest = path.resolve('.', cfg.rsync[env].dest);
  const host = cfg.rsync[env].host || '';
  const sync_opts = getOptions([src + '/'], dest, host);
  const sync_app = createSync(sync_opts);
  return Promise.all([sync_app]);
}

function getOptions(src, dest, host) {
  return {
    src: src,
    dest: dest,
    host: host,
    ssh: host !== '',
    recursive: true,
    args: ['--verbose', '--compress', '--archive'],
    exclude: ['.DS_Store', '.svn', '*.php', 'php', '.htaccess', 'node_modules'],
  };
}

function createSync(sync_opts) {
  return new Promise((resolve, reject) => {
    rsync(sync_opts, (error, stdout, stderr, cmd) => {
      if (error) {
        // failed
        console.log(error.message);
        reject('error', error.message);
      } else {
        // success
        console.log('success', stdout);
        resolve(stdout);
      }
    });
  });
}

export default sync;
