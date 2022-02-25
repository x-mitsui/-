const CourseModel = require('../db/models/course')
class CourseService {
  async addCourse(data) {
    const cid = data.cid
    const result = await CourseModel.findOne(data, {
      where: { cid },
    })
    if (result) {
      return await CourseModel.update(data, {
        where: { cid },
      })
    } else {
      return await CourseModel.create(data)
    }
  }
}

module.exports = new CourseService()
