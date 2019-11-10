'use strict';
const debug = require("debug")("dnspod-terminal:entry");
const app = new (require("koa"))();
const path = require('path');
const router = require('./router');
const staticService = require('koa-static');
const koaBody = require("koa-body");
const bodyConfig = {
  multipart: true,
  jsonLimit: "10mb",
  formLimit: "10mb",
  textLimit: "10mb",
  json: true,
  text: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制
  }
};

let port = 1228;
if (process.env.port) port = parseInt(process.env.port);
app
  .use(koaBody(bodyConfig))
  .use(staticService(path.dirname(__dirname) + '/static'))
  .use(router.routes())
  .use(router.allowedMethods());

const server = require("http").createServer(app.callback());

console.log("http://localhost:" + port);
server.listen(port);