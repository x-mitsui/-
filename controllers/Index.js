const { redisGet, redisSet } = require('../libs/redisClient')
const { returnInfo } = require('../libs/utils')
const { getCourses } = require('../services/Course')
const { getCoursesTab } = require('../services/CourseTab')
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
}

module.exports = new Index()
