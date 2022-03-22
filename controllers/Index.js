const { redisGet, redisSet } = require('../libs/redisClient')
const { returnInfo } = require('../libs/utils')
const { getCourses, updateField, updateCourseStatus } = require('../services/Course')
const { getCoursesTab } = require('../services/CourseTab')
const { getRecomCourses, updateRecomCourseStatus } = require('../services/RecomCourse')
const { getSliders, updateSliderStatus } = require('../services/Slider')
const { getCollections, updateCollectionStatus } = require('../services/Collection')
const { getTeachers, updateTeacherStatus, updateTeacherStar } = require('../services/Teacher')
const { getStudents, updateStudentStatus } = require('../services/Student')
const { API } = require('../config/error_config')
class Index {
  async index(ctx, next) {
    const sess = ctx.session

    if (!sess.uid) {
      // 往sess中存信息
      sess.uid = 1
      sess.username = 'jsjiajia'
      sess.nickname = 'js++'
      sess.gender = 'male'
    }
    // await redisSet("a", 1);
    // await redisSet("json", { a: 1, b: 2 }); //dui
    // let res = await redisGet("txclass01.sessz-4YSCYWU-opsPxf8FRaSkDywo5cUk39");
    // console.log(res);
    ctx.body = {
      session: sess
    }
    // ctx.render('index')
  }

  async getCoursesData(ctx, next) {
    try {
      const data = await Promise.all([getCourses(), getCoursesTab()])
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { courseData: data[0], fieldData: data[1] })
    } catch (error) {
      console.log(error)
      ctx.body = returnInfo(API.GET_DATA_FAILED)
    }
  }

  async updateCourseField(ctx, next) {
    try {
      const { cid, field } = ctx.query
      const result = await updateField(cid, field)
      ctx.body =
        result[0] === 1
          ? returnInfo(API.CHANGE_COURSE_FIELD_SUCCESS)
          : returnInfo(API.CHANGE_COURSE_FIELD_FAILED)
    } catch (error) {
      console.log(error)
      ctx.body = returnInfo(API.CHANGE_COURSE_FIELD_FAILED)
    }
  }

  async getRecomCoursesData(ctx, next) {
    try {
      const data = await getRecomCourses()
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      console.log(error)
      ctx.body = returnInfo(API.GET_DATA_FAILED)
    }
  }

  async updateStatus(ctx, next) {
    try {
      const { category, id, status } = ctx.request.body

      let result = null
      switch (category) {
        case 'course':
          result = await updateCourseStatus(id, status)
          break
        case 'recom_course':
          result = await updateRecomCourseStatus(id, status)
          break
        case 'slider':
          result = await updateSliderStatus(id, status)
          break
        case 'collection':
          result = await updateCollectionStatus(id, status)
          break
        case 'teacher':
          result = await updateTeacherStatus(id, status)
          break
        case 'student':
          result = await updateStudentStatus(id, status)
          break

        default:
          break
      }
      ctx.body =
        result[0] === 1
          ? returnInfo(API.CHANGE_STATUS_SUCCESS)
          : returnInfo(API.CHANGE_STATUS_FAILED)
    } catch (error) {
      ctx.body = returnInfo(API.CHANGE_STATUS_FAILED, error.message)
    }
  }

  async getSlidersData(ctx, next) {
    try {
      const data = await getSliders()
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      ctx.body = returnInfo(API.GET_DATA_FAILED, error.message)
    }
  }

  async getCollectionsData(ctx, next) {
    try {
      const data = await getCollections()
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      ctx.body = returnInfo(API.GET_DATA_FAILED, error.message)
    }
  }

  async getTeachersData(ctx, next) {
    try {
      const data = await getTeachers()
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      ctx.body = returnInfo(API.GET_DATA_FAILED, error.message)
    }
  }

  async updateTeacherStar(ctx, next) {
    try {
      const { id, isStar } = ctx.request.body
      const data = await updateTeacherStar(id, isStar)
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      ctx.body = returnInfo(API.GET_DATA_FAILED, error.message)
    }
  }

  async getStudentsData(ctx, next) {
    try {
      const data = await getStudents()
      ctx.body = returnInfo(API.GET_DATA_SUCCESS, { data })
    } catch (error) {
      ctx.body = returnInfo(API.GET_DATA_FAILED, error.message)
    }
  }
}

module.exports = new Index()
