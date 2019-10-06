const base = require(`./project`);
const specific = {
  environment : 'production',
  googleanalytics : true,
  serviceworker : true,
  baseHref: '//www.stephenhamilton.co.uk',
  cdn: 'https://cdn.stephenhamilton.co.uk/portfolio',
};
const merged = {...base, ...specific};
module.exports = merged;
