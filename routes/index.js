const router = require('koa-router')()

const indexController = require('../controllers/Index')
const loginCheck = require('../middlewares/loginCheck')

router.get('/', indexController.index)
router.get('/get_courses_data', loginCheck, indexController.getCoursesData)
router.get('/update_course_field', loginCheck, indexController.updateCourseField)
router.post('/update_course_status', loginCheck, indexController.updateCourseStatus)

router.get('/get_recom_courses_data', loginCheck, indexController.getRecomCoursesData)
router.post('/update_recom_course_status', loginCheck, indexController.updateRecomCourseStatus)
module.exports = router
