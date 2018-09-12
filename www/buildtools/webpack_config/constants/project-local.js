const base = require(`./project`);
const specific = {
  compression : false,
  environment : 'production',
  googleanalytics : false,
  serviceworker : false,
  baseHref: '//mini.portfolio',
  cdn: '',
};
const merged = {...base, ...specific};
module.exports = merged;
