const base = require(`./project`);
const specific = {
  htmlTemplate: 'index_local.ejs',
  environment : 'production',
  googleanalytics : false,
  serviceworker : false,
  baseHref: '//imac.portfolio',
  cdn: '',

  isHashed: false,
  dropConsole: false,
  isVendorChunked: true,
  isManifestInlined: true,
};
const merged = {...base, ...specific};
module.exports = merged;