const base = require(`./project`);
const specific = {
  htmlTemplate: 'index_local.ejs',
  compression : false,
  environment : 'production',
  googleanalytics : false,
  serviceworker : false,
  baseHref: '//stage.stephenhamilton.co.uk',
  cdn: '',
};
const merged = {...base, ...specific};
module.exports = merged;
