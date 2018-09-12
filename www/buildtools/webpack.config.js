'use strict';

const path = require('path');

function buildConfig(target, buildtype) {
  console.log('Building', target, buildtype);
  const constantsPath = path.resolve(__dirname, `./webpack_config/constants/`);
  const paths = require(`${constantsPath}/paths-${target}`);
  const project = require(`${constantsPath}/project-${target}`);
  // console.log('project', project, paths);

  const appConfigPath = path.resolve(__dirname, `./config/app_config`);
  const app_config = require(appConfigPath)();
  const replace_options = app_config.replace_options[buildtype];

  console.log('Building to ', paths.projectRoot);
  // console.log('replace_options ', replace_options);

  const type = buildtype === 'watch' ? 'watch' : 'dist';
  const conf = require('./webpack_config/' + type)({
    paths,
    project,
    replace_options,
    cdn: app_config.cdn,
  });
  // console.log('generated conf = ', conf);
  return conf;
}

module.exports = function({ target = '', buildtype = '' }) {
  return buildConfig(target, buildtype);
};
