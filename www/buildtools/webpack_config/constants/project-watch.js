const base = require(`./project`);
const specific = {
  htmlTemplate: 'index_watch.ejs',
  environment : 'development',
  googleanalytics : false,
  serviceworker : false,
  baseHref: '//' + base.devserverHost + ':' + base.devserverPort,
  cdn: '',
};
const merged = {...base, ...specific};
module.exports = merged;
