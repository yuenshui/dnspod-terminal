'use strict';
const debug = require("debug")("dnspod-terminal:router");
const router = require('koa-router')();
const config = require("../lib/config");

router.get("/configs", config.loadConfig);
router.post("/configs", config.addConfig);

module.exports = router;
