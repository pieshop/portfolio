'use strict';

const path = require('path');

function buildConfig(target, buildtype) {
  console.log('Building', target, buildtype);
  const constantsPath = path.resolve(__dirname, `./webpack_config/constants/`);
  const paths = require(`${constantsPath}/paths-${target}`);
  const project = require(`${constantsPath}/project-${target}`);

  const appConfigPath = path.resolve(__dirname, `./config/app_config`);
  const app_config = require(appConfigPath)();
  const replace_options = app_config.replace_options[target];

  // console.log('replace_options ', replace_options);
  console.log('Building to ', paths.projectRoot);

  const configType = buildtype === 'watch' ? 'watch' : 'dist';
  const environment = {
    env: project.environment,
    cdn: target === 'live' ? app_config.cdn + '/' : '',
    environmentVars: {
      __WATCH__: JSON.stringify(buildtype === 'watch'),
      __GA__: JSON.stringify(project.googleanalytics),
      __SERVICE_WORKER__: JSON.stringify(project.serviceworker),
    },
  };
  console.log('environment = ', environment);
  const conf = require('./webpack_config/' + configType)({
    paths,
    project,
    replace_options,
    environment,
  });
  // console.log('generated conf = ', conf);
  return conf;
}

module.exports = function({ target = '', buildtype = '' }) {
  return buildConfig(target, buildtype);
};
