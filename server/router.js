'use strict';
const debug = require("debug")("dnspod-terminal:router");
const router = require('koa-router')();
const config = require("../lib/config");
const domain = require("../lib/domain");

router.get("/configs", config.loadConfig);
router.post("/configs", config.addConfig);

router.get("/domains", domain.list);

module.exports = router;
