'use strict';
const debug = require("debug")("dnspod-terminal:router");
const router = require('koa-router')();
const config = require("../lib/config");
const domain = require("../lib/domain");

router.get("/configs", config.loadConfig);
router.post("/configs", config.addConfig);

router.get("/domains", domain.domains);
router.get("/domain/purview", domain.domainPurview);
router.post("/domain", domain.domainCreate);

router.get("/records", domain.records);
router.get("/record/types", domain.recordType);
router.get("/record/line", domain.recordLine);
router.post("/record", domain.recordCreate);

module.exports = router;
