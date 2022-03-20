const CourseTabModel = require('../db/models/courseTab')
class CourseTabService {
  async addCourseTab(data) {
    const cid = data.cid
    const result = await CourseTabModel.findOne({
      where: { cid }
    })
    if (result) {
      return await CourseTabModel.update(data, {
        where: { cid }
      })
    } else {
      return await CourseTabModel.create(data)
    }
  }
  // 返回Promise，具体如何使用由Controller决定
  getCoursesTab() {
    // 不加raw返回的为CourseTabModel对象
    return CourseTabModel.findAll({
      attributes: {
        exclude: ['cid', 'updatedAt', 'createdAt']
      },
      raw: true
    })
  }
}

module.exports = new CourseTabService()
