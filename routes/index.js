const router = require("koa-router")();

const indexController = require("../controllers/Index");
const loginCheck = require("../middlewares/loginCheck");

router.get("/", indexController.index);
router.get("/get_courses", loginCheck, indexController.getCourseData);

module.exports = router;
