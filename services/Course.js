const CourseModel = require('../db/models/course')

class CourseService {
  async addCourse(data) {
    const cid = data.cid
    const result = await CourseModel.findOne({
      where: { cid },
      raw: true
    })
    if (result) {
      return await CourseModel.update(data, {
        where: { cid }
      })
    } else {
      return await CourseModel.create(data)
    }
  }
  getCourses() {
    return CourseModel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'posterUrl', 'description']
      },
      raw: true
    })
  }
  async updateField(cid, field) {
    return await CourseModel.update(
      { field },
      {
        where: { cid },
        raw: true
      }
    )
  }

  async updateCourseStatus(cid, status) {
    console.log('status:', status)
    return await CourseModel.update(
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

module.exports = new CourseService()
