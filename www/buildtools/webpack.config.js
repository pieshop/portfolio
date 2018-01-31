'use strict';

let app_config = require('./config/app_config')();

function buildConfig(target) {
    let opts = app_config.replace_options[target];
    return require('./webpack_config/' + target + '.js')({target: target, replace_options:opts, cdn:app_config.cdn});
}

module.exports = function (target) {
    target = target || 'prod';
    // console.log('TARGET = ',target);
    return buildConfig(target);
};
