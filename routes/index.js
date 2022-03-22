const router = require('koa-router')()

const indexController = require('../controllers/Index')
const loginCheck = require('../middlewares/loginCheck')

router.get('/', indexController.index)
router.get('/get_courses_data', loginCheck, indexController.getCoursesData)
router.get('/update_course_field', loginCheck, indexController.updateCourseField)

router.get('/get_recom_courses_data', loginCheck, indexController.getRecomCoursesData)
router.get('/get_sliders_data', loginCheck, indexController.getSlidersData)
router.get('/get_collections_data', loginCheck, indexController.getCollectionsData)
router.get('/get_teachers_data', loginCheck, indexController.getTeachersData)
router.post('/update_teacher_star', loginCheck, indexController.updateTeacherStar)
router.get('/get_students_data', loginCheck, indexController.getStudentsData)
router.post('/update_status', loginCheck, indexController.updateStatus)
module.exports = router
