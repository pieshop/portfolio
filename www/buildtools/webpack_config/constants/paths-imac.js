const base = require(`./paths`);
const outputDirectory = base.dist.replace('{dir}', 'dev');
const specific = {
  dist : outputDirectory,
  htmlOutPath : outputDirectory,
};
const merged = {...base, ...specific};
module.exports = merged;
