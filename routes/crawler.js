const router = require("koa-router")();

const crawlerController = require("../controllers/Crawler");
router.prefix("/crawler");
router.get("/craw_slider_data", crawlerController.crawlSliderData);

module.exports = router;
