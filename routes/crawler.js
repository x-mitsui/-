const router = require("koa-router")();

const path = require("path");
const cp = require("child_process");

const crawlerController = require("../controllers/Crawler");
router.prefix("/crawler");
router.get("/craw_slider_data", crawController.crawSliderData);

module.exports = router;
