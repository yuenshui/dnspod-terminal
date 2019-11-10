'use strict';
const debug = require("debug")("dnspod-terminal:lib:dnspod");
const httpapi = require("./httpapi");
const clients = {};

function dnspod(id, token) {
  this.host = "https://dnsapi.cn";
  this.id = id;
  this.token = token;
  this.InfoVersion = async () => {
    return await this.loadAPI("/Info.Version");
  };
  this.UserDetail = async () => {
    return await this.loadAPI("/User.Detail");
  };
  this.DomainList = async () => {
    let params = {
      type: 'all',
      length: '3000'
    };
    return await this.loadAPI("/Domain.List", params);
  };
  this.DomainPurview = async domainId => {
    let params = {
      domain_id: domainId
    };
    return await this.loadAPI("/Domain.Purview", params);
  };
  this.DomainCreate = async domain => {
    let params = {
      domain,
      group_id: 1,
      is_mark: 'no'
    };
    return await this.loadAPI("/Domain.Create", params);
  };

  this.RecordCreate = async record => {
    return await this.loadAPI("/Record.Create", record);
  };
  this.RecordType = async () => {
    let params = {
      domain_grade: this.info.user_grade
    };
    return await this.loadAPI("/Record.Type", params);
  };
  this.RecordList = async domainId => {
    let params = {
      domain_id: domainId,
      length: 3000
    };
    return await this.loadAPI("/Record.List", params);
  };
  this.RecordLine = async domainId => {
    let params = {
      domain_grade: this.info.user_grade
    };
    return await this.loadAPI("/Record.Line", params);
  };

  this.loadAPI = async (uri, data) => {
    if (!data) data = {};
    data.login_token = `${this.id},${this.token}`;
    data.format = "json";
    try {
      let rs = await httpapi.http(this.host + uri, {
        method: "POST",
        data: data
      });
      return rs;
    } catch (e) {
      console.error(uri, data, e);
    };
    return false;
  };
};

module.exports.init = async (id, token) => {
  let obj = new dnspod(id, token);
  let info = await obj.UserDetail();
  console.log(info);
  if (info && info.status && info.status.code == "1") {
    obj.info = info.info.user;
    clients[id] = obj;
  } else {
    obj.info = null;
  }
  return obj;
};

module.exports.get = id => {
  return clients[id] || null;
};