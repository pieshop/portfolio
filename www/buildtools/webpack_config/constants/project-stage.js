const base = require(`./project`);
const specific = {
  compressed : false,
  serviceworker : false,
  baseHref: '//stage.stephenhamilton.co.uk',
  cdn: 'https://cdn.stephenhamilton.co.uk',
};
const merged = {...base, ...specific};
module.exports = merged;
