/**
 * https://medium.com/@tarkus/build-automation-with-vanilla-javascript-74639ec98bad
 * https://github.com/kriasoft/react-starter-kit
 * https://github.com/kriasoft/nodejs-api-starter
 */
import {copyFile} from './lib/fs';

const replace  = require('replace');
const path     = require('path');
const svn_info = require("svn-info");

const CONFIG_DIR   = path.resolve(__dirname, '../buildtools/config/');
const TEMPLATE_DIR = path.resolve(__dirname, '../buildtools/templates/');
const cfg          = require(CONFIG_DIR + '/app_config.js')();
const src  = path.resolve('.', cfg.app);

function svninfo() {
    const env = process.argv[3].split('=')[1] || 'dev';

    return new Promise((resolve, reject) => {
        svn_info(src, 'HEAD', (err, info) => {
            if (err) {
                // failed
                console.error(err);
                reject('error', err);
            } else {
                // success
                const dest = path.resolve('.', cfg[env] + '/version.json');
                console.log('Rev', info.revision, '| Author', info.lastChangedAuthor, '|', info.lastChangedDate);
                copyFile(TEMPLATE_DIR + '/version.json', dest)
                    .then(() => {
                        replace({
                            regex      : "{rev}",
                            replacement: info.revision,
                            paths      : [dest],
                            recursive  : false,
                            silent     : true,
                        });
                        replace({
                            regex      : "{author}",
                            replacement: info.lastChangedAuthor,
                            paths      : [dest],
                            recursive  : false,
                            silent     : true,
                        });
                        replace({
                            regex      : "{date}",
                            replacement: info.lastChangedDate,
                            paths      : [dest],
                            recursive  : false,
                            silent     : true,
                        });
                        resolve(info);
                    })
                    .catch((message) => {
                        console.error(message);
                        reject('error', message);
                    });

            }
        })
    });
}
export default svninfo;