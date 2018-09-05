const base = require(`./project`);
const specific = {
  compressed : false,
  serviceworker : false,
  baseHref: '//mini.portfolio',
  cdn: '',
};
const merged = {...base, ...specific};
module.exports = merged;
