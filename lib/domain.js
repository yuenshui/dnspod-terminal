'use strict';
const debug = require("debug")("dnspod-terminal:lib:domain");
const configs = require("./config");
const dnspod = require("./dnspod");

module.exports.records = async ctx => {
  if(!ctx.query || !ctx.query.id || !ctx.query.domain_id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let domainId = ctx.query.domain_id;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let records = await client.RecordList(domainId);
  // console.log('records:', records);
  return ctx.body = {
    code: records.status.code || 1,
    message: records.status.message || '',
    data: records.records || []
  };
};

module.exports.recordType = async ctx => {
  if(!ctx.query || !ctx.query.id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let types = await client.RecordType();
  // console.log('types:', types);
  return ctx.body = {
    code: types.status.code || 1,
    message: types.status.message || '',
    data: types.types || []
  };
};

module.exports.recordLine = async ctx => {
  if(!ctx.query || !ctx.query.id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let lines = await client.RecordLine();
  // console.log('lines:', lines);
  return ctx.body = {
    code: lines.status.code || 1,
    message: lines.status.message || '',
    data: lines.line_ids || []
  };
};

module.exports.recordCreate = async ctx => {
  if(!ctx.request.body || 
    !ctx.request.body.id || 
    !ctx.request.body.domain_id || 
    !ctx.request.body.value || 
    !ctx.request.body.sub_domain || 
    !ctx.request.body.record_type) 
  {
    return ctx.body = {code: 403, msg: ""};
  }
  let record = {
    id: ctx.request.body.id,
    domain_id: ctx.request.body.domain_id,
    value: ctx.request.body.value,
    sub_domain: ctx.request.body.sub_domain || '@',
    record_type: ctx.request.body.record_type || 'A',
    record_line: ctx.request.body.record_line || '默认',
    record_line_id: ctx.request.body.record_line_id || '0',
    mx: ctx.request.body.mx || '0',
    ttl: ctx.request.body.ttl || '120',
    status: ['enable', 'disable'].indexOf(ctx.request.body.status) > -1 ? ctx.request.body.status : 'enable',
    weight: ctx.request.body.weight || '0',
  };
  let id = ctx.request.body.id;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let recordRs = await client.RecordCreate(record);
  console.log('recordRs:', recordRs);
  return ctx.body = {
    code: recordRs.status.code || 1,
    message: recordRs.status.message || '',
    data: recordRs.record || {}
  };
};


module.exports.domains = async ctx => {
  if(!ctx.query || !ctx.query.id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let client = dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let domains = await client.DomainList();

  return ctx.body = {
    code: domains.status.code || 1,
    message: domains.status.message || '',
    data: domains.domains || []
  };
};

module.exports.domainPurview = async ctx => {
  if(!ctx.query || !ctx.query.id || !ctx.query.domain_id) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.query.id;
  let domainId = ctx.query.domain_id;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let purview = await client.DomainPurview(domainId);
  // console.log('purview:', purview);
  return ctx.body = {
    code: purview.status.code || 1,
    message: purview.status.message || '',
    data: purview.purview || []
  };
};

module.exports.domainCreate = async ctx => {
  if(!ctx.request.body || !ctx.request.body.id || !ctx.request.body.domain) {
    return ctx.body = {code: 403, msg: ""};
  }
  let id = ctx.request.body.id;
  let domain = ctx.request.body.domain;
  let client =  dnspod.get(id);
  if(!client) {
    let config = configs.get(id);
    if(!config) return ctx.body = {code: 404, msg: ""};
    client = await dnspod.init(config.id, config.token);
  }
  if(!client && !client.info) {
    return ctx.body = {code: 404, msg: ""};
  }

  let domainRs = await client.DomainCreate(domain);
  // console.log('domainRs:', domainRs);
  return ctx.body = {
    code: domainRs.status.code || 1,
    message: domainRs.status.message || '',
    data: domainRs.domain || {}
  };
};
