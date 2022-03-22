const RecomCourseModel = require('../db/models/recomCourse')

class RecomCourseService {
  async addRecomCourse(data) {
    const cid = data.cid

    const result = await RecomCourseModel.findOne({
      where: { cid }
    })

    if (result) {
      return await RecomCourseModel.update(data, {
        where: { cid }
      })
    } else {
      return await RecomCourseModel.create(data)
    }
  }

  getRecomCourses() {
    return RecomCourseModel.findAll({
      attributes: {
        exclude: ['mainTitle', 'createdAt', 'updatedAt', 'posterUrl', 'description', 'teacherImg']
      },
      raw: true
    })
  }

  async updateRecomCourseStatus(cid, status) {
    console.log('status:', status)
    return await RecomCourseModel.update(
      {
        status
      },
      {
        where: { cid },
        raw: true
      }
    )
  }
}

module.exports = new RecomCourseService()
