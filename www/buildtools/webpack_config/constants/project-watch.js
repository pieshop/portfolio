const base = require(`./project`);
const specific = {
  compression : false,
  environment : 'development',
  googleanalytics : false,
  serviceworker : false,
  baseHref: '//' + base.devserverHost + ':' + base.devserverPort,
  cdn: '',
};
const merged = {...base, ...specific};
module.exports = merged;
