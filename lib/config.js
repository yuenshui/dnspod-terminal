'use strict';
const debug = require("debug")("dnspod-terminal:lib:config");
const fs = require("fs");
const path = require("path");
let configs = {};

module.exports.loadConfig = ctx => {
  let dir = path.dirname(__dirname) + "/config/";
  let readDir = fs.readdirSync(dir);
  readDir
    .filter(file => /\.(json)$/i.test(file))
    .map(file => {
      try {
        configs[file.replace(/\.json$/i, '')] = JSON.parse(fs.readFileSync(dir + file));
      } catch (e) {
        debug("load config:", file, "error:", e.stack);
      }
    });
  if (ctx) {
    ctx.body = configs;
  }
  else {
    return configs;
  }
};

module.exports.addConfig = ctx => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
}