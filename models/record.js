"use strict";
const debug = require("debug")("dnspod-terminal:models:record");
const configs = require("./config");
const dnspod = require("../lib/dnspod");

module.exports.records = async ctx => {
  if (!ctx.query || !ctx.query.id || !ctx.query.domain_id) {
    return (ctx.body = { code: 403, message: "" });
  }
  let id = ctx.query.id;
  let domainId = ctx.query.domain_id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let records = await client.RecordList(domainId);
  // console.log('records:', records);
  return (ctx.body = {
    code: records.status.code || 1,
    message: records.status.message || "",
    data: records.records || []
  });
};

module.exports.recordType = async ctx => {
  if (!ctx.query || !ctx.query.id) {
    return (ctx.body = { code: 403, message: "" });
  }
  let id = ctx.query.id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let types = await client.RecordType();
  // console.log('types:', types);
  return (ctx.body = {
    code: types.status.code || 1,
    message: types.status.message || "",
    data: types.types || []
  });
};

module.exports.recordLine = async ctx => {
  if (!ctx.query || !ctx.query.id) {
    return (ctx.body = { code: 403, message: "" });
  }
  let id = ctx.query.id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let lines = await client.RecordLine();
  // console.log('lines:', lines);
  return (ctx.body = {
    code: lines.status.code || 1,
    message: lines.status.message || "",
    data: lines.line_ids || []
  });
};

module.exports.recordCreate = async ctx => {
  if (
    !ctx.request.body ||
    !ctx.request.body.id ||
    !ctx.request.body.domain_id ||
    !ctx.request.body.value ||
    !ctx.request.body.sub_domain ||
    !ctx.request.body.record_type
  ) {
    return (ctx.body = { code: 403, message: "" });
  }
  let record = {
    id: ctx.request.body.id,
    domain_id: ctx.request.body.domain_id,
    value: ctx.request.body.value,
    sub_domain: ctx.request.body.sub_domain || "@",
    record_type: ctx.request.body.record_type || "A",
    record_line: ctx.request.body.record_line || "默认",
    record_line_id: ctx.request.body.record_line_id || "0",
    mx: ctx.request.body.mx || "0",
    ttl: ctx.request.body.ttl || "120",
    status:
      ["enable", "disable"].indexOf(ctx.request.body.status) > -1
        ? ctx.request.body.status
        : "enable",
    weight: ctx.request.body.weight || "0"
  };
  let id = ctx.request.body.id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let recordRs = await client.RecordCreate(record);
  console.log("recordRs:", recordRs);
  return (ctx.body = {
    code: recordRs.status.code || 1,
    message: recordRs.status.message || "",
    data: recordRs.record || {}
  });
};

module.exports.recordModify = async ctx => {
  if (
    !ctx.request.body ||
    !ctx.request.body.id ||
    !ctx.request.body.domain_id ||
    !ctx.request.body.record_id ||
    !ctx.request.body.value ||
    !ctx.request.body.sub_domain ||
    !ctx.request.body.record_type
  ) {
    return (ctx.body = { code: 403, message: "" });
  }
  let record = {
    id: ctx.request.body.id,
    domain_id: ctx.request.body.domain_id,
    record_id: ctx.request.body.record_id,
    value: ctx.request.body.value,
    sub_domain: ctx.request.body.sub_domain || "@",
    record_type: ctx.request.body.record_type || "A",
    record_line: ctx.request.body.record_line || "默认",
    record_line_id: ctx.request.body.record_line_id || "0",
    mx: ctx.request.body.mx || "0",
    ttl: ctx.request.body.ttl || "120",
    status:
      ["enable", "disable"].indexOf(ctx.request.body.status) > -1
        ? ctx.request.body.status
        : "enable",
    weight: ctx.request.body.weight || "0"
  };
  let id = ctx.request.body.id;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let recordRs = await client.RecordModify(record);
  console.log("recordRs:", recordRs);
  return (ctx.body = {
    code: recordRs.status.code || 1,
    message: recordRs.status.message || "",
    data: recordRs.record || {}
  });
};

module.exports.recordModifyIP = async ctx => {
  if (
    !ctx.request.body ||
    !ctx.request.body.id ||
    !ctx.request.body.domain_id ||
    !ctx.request.body.record_id ||
    !ctx.request.body.value
  ) {
    return (ctx.body = { code: 403, message: "" });
  }
  let id = parseInt(ctx.request.body.id);
  let domainId = parseInt(ctx.request.body.domain_id);
  let recordId = parseInt(ctx.request.body.record_id);
  let IP = ctx.request.body.value;
  let client = dnspod.get(id);
  if (!client) {
    let config = configs.get(id);
    if (!config) return (ctx.body = { code: 404, message: "" });
    client = await dnspod.init(config.id, config.token);
  }
  if (!client && !client.info) {
    return (ctx.body = { code: 404, message: "" });
  }

  let Rs = await client.RecordModifyIP(domainId, recordId, IP);
  return (ctx.body = {
    code: Rs.status.code || 1,
    message: Rs.status.message || ""
  });
};
