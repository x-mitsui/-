const TeacherModel = require('../db/models/teacher')

class TeacherService {
  async addTeacher(data) {
    const tid = data.tid

    const result = await TeacherModel.findOne({
      where: { tid }
    })

    if (result) {
      return await TeacherModel.update(data, {
        where: { tid }
      })
    } else {
      return await TeacherModel.create(data)
    }
  }

  getTeachers() {
    return TeacherModel.findAll({
      attributes: {
        exclude: ['tid', 'createdAt', 'updatedAt', 'teacherImg']
      },
      raw: true
    })
  }

  async updateTeacherStatus(id, status) {
    console.log('teacher status:', status)
    return await TeacherModel.update(
      {
        status
      },
      {
        where: { id },
        raw: true
      }
    )
  }

  async updateTeacherStar(id, isStar) {
    return await TeacherModel.update(
      {
        isStar
      },
      {
        where: { id },
        raw: true
      }
    )
  }
}

module.exports = new TeacherService()
