const base = require(`./project`);
const specific = {
  compression : { js: true, css: true },
  environment : 'production',
  googleanalytics : true,
  serviceworker : true,
  baseHref: '//www.stephenhamilton.co.uk',
  cdn: 'https://cdn.stephenhamilton.co.uk/portfolio',
};
const merged = {...base, ...specific};
module.exports = merged;
