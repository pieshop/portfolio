const critical = require('critical');
const path = require('path');
const CONFIG_DIR = path.resolve(__dirname, '../buildtools/config/');
const cfg = require(CONFIG_DIR + '/app_config.js')();
/**
 * https://vuejsdevelopers.com/2017/07/24/critical-css-webpack/
 * https://github.com/addyosmani/critical
 */
function criticalCSS() {
    const env = process.argv[3].split('=')[1] || 'dist';
    const dest = path.resolve('.', cfg[env]);
    console.log('criticalCSS :: env', env, 'dest', dest);
    return new Promise((resolve, reject) => {
        critical
            .generate({
                /* The path of the Webpack bundle */
                base: dest,
                src: 'index.html',
                dest: 'index.html',
                // css: [
                //     '/css/vendor.ce5a27890b41ebbc7f88d773a2905ff5.css',
                //     '/css/app.0bc516e1f5ad9c1fbe65a9ac467f0d4b.css',
                // ],
                inline: true,
                extract: true,
                minify: true,
                dimensions: [
                    {
                        width: 375,
                        height: 559,
                    },
                    {
                        width: 1200,
                        height: 900,
                    },
                ],

                /* Ensure that bundled JS file is called */
                penthouse: {
                    blockJSRequests: false,
                },
            })
            .then((output) => {
                resolve();
            })
            .error((err) => {
                reject('error', err);
            });
    });
}

export default criticalCSS;
