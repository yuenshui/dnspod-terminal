"use strict";
const debug = require("debug")("dnspod-terminal:models:config");
const fs = require("fs");
const path = require("path");
const dnspod = require("../lib/dnspod");
const dir = path.dirname(__dirname) + "/config/";

let configs = {};

module.exports.loadConfig = ctx => {
  let readDir = fs.readdirSync(dir);
  readDir
    .filter(file => /\.(json)$/i.test(file))
    .map(file => {
      try {
        configs[file.replace(/\.json$/i, "")] = JSON.parse(
          fs.readFileSync(dir + file)
        );
      } catch (e) {
        debug("load config:", file, "error:", e.stack);
      }
    });
  if (ctx) {
    ctx.body = {
      code: 1,
      data: configs
    };
  } else {
    return configs;
  }
};

module.exports.get = id => {
  if (Object.keys(configs).length == 0) this.loadConfig();
  return configs[id] || null;
};

module.exports.save = async id => {
  if (!configs[id]) return 0;
  fs.writeFileSync(dir + id + ".json", JSON.stringify(configs[id], null, 2));
};

module.exports.addConfig = async ctx => {
  console.log(ctx.request.body);
  if (!ctx.request.body || !ctx.request.body.id || !ctx.request.body.token) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = ctx.request.body.id;
  let token = ctx.request.body.token;
  let client = await dnspod.init(ctx.request.body.id, ctx.request.body.token);
  if (client.info && client.info.status) {
    configs[id] = {
      id,
      token,
      info: client.info
    };
    this.save(id);
    ctx.body = {
      code: 1,
      data: configs[id]
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
  return ctx.body;
};

module.exports.remove = async ctx => {
  if (!ctx.request.body || !ctx.request.body.id) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = parseInt(ctx.request.body.id);
  if (configs[id]) delete configs[id];
  fs.unlinkSync(`${dir}${id}.json`);
  return (ctx.body = {
    code: 1
  });
};
