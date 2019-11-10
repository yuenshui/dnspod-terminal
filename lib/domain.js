'use strict';
const debug = require("debug")("dnspod-terminal:lib:domain");
const configs = require("./config");
const dnspod = require("./dnspod");

module.exports.list = async ctx => {
  if(!ctx.query || !ctx.query.id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let client = dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let domains = await client.DomainList();

  return ctx.body = {
    code: 1,
    data: domains.domains || []
  };
};