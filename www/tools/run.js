/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options = {}) {
  const target = process.argv[3].split('=')[1] || 'local';
  options.env = target;

  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.info(
    `[${format(start)}] Starting '${task.name}${options ? ` (${JSON.stringify(options)})` : ''}'...`
  );
  return task(options).then(
    (resolution) => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(
        `[${format(end)}] Finished '${task.name}${
          options ? ` (${JSON.stringify(options)})` : ''
        }' after ${time} ms`
      );
      return resolution;
    },
    (err) => {}
  );
}

if (require.main === module && process.argv.length > 2) {
  // eslint-disable-next-line no-underscore-dangle
  delete require.cache[__filename];

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const module = require(`./${process.argv[2]}.js`).default;

  run(module).catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
}

export default run;
