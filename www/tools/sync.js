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
  let src = '';
  let dest = '';
  let host = '';
  let ssh = false;
  let sync_opts = {};
  let sync_opts_js_css = {};

  switch (env) {
    case 'imac':
      src = path.resolve('.', cfg[env]);
      dest = path.resolve('.', cfg.rsync[env].dest);
      host = cfg.rsync[env].host || '';
      ssh = host !== '';
      sync_opts = {
        src: src + '/',
        dest: dest,
        recursive: true,
        args: ['--verbose', '--compress', '--archive'],
        exclude: ['.DS_Store', '.svn', '*.php', 'php', '.htaccess'],
      };
      if (ssh) {
        sync_opts.host = host;
        sync_opts.ssh = true;
      }
      return Promise.all([createSync(sync_opts)]);
    case 'mini': {
      src = path.resolve('.', cfg[env]);
      dest = path.resolve('.', cfg.rsync[env].dest);
      host = cfg.rsync[env].host || '';
      sync_opts = getOptions([src + '/'], dest, host);
      const sync_app = createSync(sync_opts);
      dest = path.resolve('.', cfg.rsync[env].assets);
      sync_opts_js_css = getOptions([src + '/assets/json'], dest + '/', host);
      const sync_js_css = createSync(sync_opts_js_css);
      return Promise.all([sync_app, sync_js_css]);
    }
    case 'stage': {
      src = path.resolve('.', cfg[env]);
      dest = path.resolve('.', cfg.rsync[env].dest);
      host = cfg.rsync[env].host || '';
      sync_opts = getOptions([src + '/'], dest, host);
      const sync_app = createSync(sync_opts);
      dest = path.resolve('.', cfg.rsync[env].assets);
      sync_opts_js_css = getOptions([src + '/assets/json'], dest + '/', host);
      const sync_js_css = createSync(sync_opts_js_css);
      return Promise.all([sync_app, sync_js_css]);
    }
    case 'live': {
      src = path.resolve('.', cfg[env]);
      dest = path.resolve('.', cfg.rsync[env].dest);
      host = cfg.rsync[env].host || '';
      sync_opts = getOptions([src + '/'], dest, host);
      const sync_app = createSync(sync_opts);
      dest = path.resolve('.', cfg.rsync[env].assets);
      sync_opts_js_css = getOptions(
        [
          src + '/js',
          src + '/css',
          src + '/fonts',
          src + '/assets/json',
          src + '/workbox',
          src + '/sourcemaps',
          src + '/index.html',
        ],
        dest + '/',
        host
      );
      const sync_js_css = createSync(sync_opts_js_css);
      return Promise.all([sync_app, sync_js_css]);
    }
    default:
      return Promise.resolve();
  }
}

function getOptions(src, dest, host) {
  return {
    src: src,
    dest: dest,
    host: host,
    ssh: true,
    recursive: true,
    args: ['--verbose', '--compress', '--archive'],
    exclude: ['.DS_Store', '.svn', '*.php', 'php', '.htaccess'],
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
