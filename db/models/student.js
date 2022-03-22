const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

/*
  sid: index + 1,

        studentImg: $el.find('.stu-img').prop('src'),
        studentName: $el.find('.stu-main h4').text(),
        intro: $el.find('.stu-main-cnt ').text(),
        courseName: $el.find('.stu-main-tit').text(),
        courseLink: $el.find('.stu-main-tit').prop('href'),
        studentImgKey: '',
*/
const StudentModel = seq.define('student', {
  // 表结构：表名（自动转成students）和对应字段
  sid: {
    comment: 'student ID',
    type: INTEGER(10),
    allowNull: false,
    unique: true // sid唯一
  },
  studentName: {
    comment: "the student's name",
    type: STRING(30),
    allowNull: false
  },
  courseName: {
    comment: 'the course that the student participate',
    type: STRING(30),
    allowNull: false
  },
  courseLink: {
    comment: 'the course link that the student participate',
    type: STRING(80),
    allowNull: false
  },
  intro: {
    comment: 'student’s introduction',
    type: STRING,
    allowNull: false
  },
  studentImg: {
    comment: 'student profile image url',
    type: STRING,
    allowNull: false
  },
  studentImgKey: {
    comment: 'student profile image qiniu key',
    type: STRING,
    allowNull: false
  },
  status: {
    comment: 'the student status',
    type: INTEGER(1),
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = StudentModel
