const router = require('koa-router')()

const crawlerController = require('../controllers/Crawler')
const loginCheck = require('../middlewares/loginCheck')
// 也考虑过使用动态路由+switch case+param中间件写法，但似乎没有这种直观
router.prefix('/crawler')
router.get('/crawl_slider_data', crawlerController.crawlSliderData)
router.get('/crawl_agency_info', crawlerController.crawlAgencyInfo)
router.get('/crawl_recom_course', crawlerController.crawlRecomCourse)
router.get('/crawl_collection', crawlerController.crawlCollection)
router.get('/crawl_teacher', crawlerController.crawlTeacher)
router.get('/crawl_student', crawlerController.crawlStudent)
router.get('/crawl_course_tab', crawlerController.crawlCourseTab)
router.get('/crawl_course', crawlerController.crawlCourse)
router.get('/crawl_about', crawlerController.crawlAbout)

router.post('/crawl_action', crawlerController.crawlAction.bind(crawlerController))
// router.post('/crawl_about', crawlerController.crawlAbout)
// 批量给各个路由添加前置中间件
router.stack.forEach((route) => {
  route.stack.unshift(loginCheck)
})
module.exports = router
