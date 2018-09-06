const base = require(`./project`);
const specific = {
  compression : { js: true, css: true },
  serviceworker : true,
  baseHref: '//www.stephenhamilton.co.uk',
  cdn: 'https://cdn.stephenhamilton.co.uk',
};
const merged = {...base, ...specific};
module.exports = merged;
