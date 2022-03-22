const StudentModel = require('../db/models/student')

class StudentService {
  async addStudent(data) {
    const sid = data.sid

    const result = await StudentModel.findOne({
      where: { sid }
    })

    if (result) {
      return await StudentModel.update(data, {
        where: { sid }
      })
    } else {
      return await StudentModel.create(data)
    }
  }

  getStudents() {
    return StudentModel.findAll({
      attributes: {
        exclude: ['studentImg', 'createdAt', 'updatedAt']
      },
      raw: true
    })
  }

  async updateStudentStatus(sid, status) {
    console.log('student status:', status)
    return await StudentModel.update(
      {
        status
      },
      {
        where: { sid },
        raw: true
      }
    )
  }
}

module.exports = new StudentService()
