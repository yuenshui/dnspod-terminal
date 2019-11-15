"use strict";
const debug = require("debug")("dnspod-terminal:models:domain");
const configs = require("./config");
const dnspod = require("../lib/dnspod");

module.exports.domains = async ctx => {
  if (!ctx.query || !ctx.query.id) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = ctx.query.id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    client = await dnspod.init(config.id, config.token);
  }
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, msg: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, msg: "" });
  }

  let domains = await client.DomainList();

  return (ctx.body = {
    code: domains.status.code || 1,
    message: domains.status.message || "",
    data: domains.domains || []
  });
};

module.exports.domainPurview = async ctx => {
  if (!ctx.query || !ctx.query.id || !ctx.query.domain_id) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = ctx.query.id;
  let domainId = ctx.query.domain_id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, msg: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, msg: "" });
  }

  let purview = await client.DomainPurview(domainId);
  // console.log('purview:', purview);
  return (ctx.body = {
    code: purview.status.code || 1,
    message: purview.status.message || "",
    data: purview.purview || []
  });
};

module.exports.domainCreate = async ctx => {
  if (!ctx.request.body || !ctx.request.body.id || !ctx.request.body.domain) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = ctx.request.body.id;
  let domain = ctx.request.body.domain;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, msg: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, msg: "" });
  }

  let domainRs = await client.DomainCreate(domain);
  // console.log('domainRs:', domainRs);
  return (ctx.body = {
    code: domainRs.status.code || 1,
    message: domainRs.status.message || "",
    data: domainRs.domain || {}
  });
};

module.exports.domainRemove = async ctx => {
  if (
    !ctx.request.body ||
    !ctx.request.body.id ||
    !ctx.request.body.domain_id
  ) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = ctx.request.body.id;
  let domainId = ctx.request.body.domain_id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, msg: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, msg: "" });
  }

  let Rs = await client.DomainRemove(domainId);
  return (ctx.body = {
    code: Rs.status.code || 1,
    message: Rs.status.message || ""
  });
};

module.exports.domainRemark = async ctx => {
  if (
    !ctx.request.body ||
    !ctx.request.body.id ||
    !ctx.request.body.domain_id ||
    !ctx.request.body.remark
  ) {
    return (ctx.body = { code: 403, msg: "" });
  }
  let id = parseInt(ctx.request.body.id);
  let domainId = parseInt(ctx.request.body.domain_id);
  let remark = ctx.request.body.remark;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, msg: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, msg: "" });
  }

  let Rs = await client.DomainRemark(domainId, remark);
  return (ctx.body = {
    code: Rs.status.code || 1,
    message: Rs.status.message || ""
  });
};
