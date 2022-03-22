const router = require('koa-router')()

const indexController = require('../controllers/Index')
const loginCheck = require('../middlewares/loginCheck')

router.get('/', indexController.index)
router.get('/get_courses_data', loginCheck, indexController.getCoursesData)
router.get('/update_course_field', loginCheck, indexController.updateCourseField)

router.get('/get_recom_courses_data', loginCheck, indexController.getRecomCoursesData)
router.get('/get_sliders_data', loginCheck, indexController.getSlidersData)
router.post('/update_status', loginCheck, indexController.updateStatus)
module.exports = router
