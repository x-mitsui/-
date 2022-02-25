const StudentModel = require('../db/models/student')

class StudentService {
  async addStudent(data) {
    const sid = data.sid

    const result = await StudentModel.findOne({
      where: { sid },
    })

    if (result) {
      return await StudentModel.update(data, {
        where: { sid },
      })
    } else {
      return await StudentModel.create(data)
    }
  }
}

module.exports = new StudentService()
