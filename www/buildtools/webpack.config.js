"use strict";

let app_config = require("./config/app_config")();

function buildConfig(target) {
  let output   = "";
  let fullCopy = false;
  let compress = false;
  let opts     = app_config.replace_options[target];

  switch (target) {
    case "watch":
      output = "watch";
      break;
    case "dev":
      output = "dev";
      break;
    case "stage":
      output = "stage";
      break;
    case "stage_nas":
      output = "stage_nas";
      break;
    case "dist":
      output   = "dist";
      compress = true;
      fullCopy = true;
      break;
    default:
      console.error("Target not recognised");
  }
  const conf = require("./webpack_config/" + target + ".js")({
    target         : target,
    output         : output,
    compress       : compress,
    replace_options: opts,
    cdn            : app_config.cdn
  });
  // console.log('generated conf = ', conf);
  return conf;
}

module.exports = function(target) {
  target = target || "watch";
  return buildConfig(target);
};
