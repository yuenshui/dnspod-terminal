"use strict";
const debug = require("debug")("dnspod-terminal:router");
const router = require("koa-router")();
const config = require("../models/config");
const domain = require("../models/domain");
const record = require("../models/record");

router.get("/configs", config.loadConfig);
router.post("/configs", config.addConfig);

router.get("/domains", domain.domains);
router.get("/domain/purview", domain.domainPurview);
router.post("/domain", domain.domainCreate);
router.post("/domain/remark", domain.domainRemark);
router.post("/domain/remove", domain.domainRemove);

router.get("/records", record.records);
router.get("/record/types", record.recordType);
router.get("/record/line", record.recordLine);
router.post("/record", record.recordCreate);

module.exports = router;
