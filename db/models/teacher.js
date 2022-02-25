const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

/*
  tid: index + 1,
        name: $el.find('.tea-main-title').text(),
        courseNum: parseInt($el.find('.tea-main-sub span').eq(0).text().slice(3)),
        studentsNum: parseInt($el.find('.tea-main-sub span').eq(2).text().slice(3)),
        introduction: $el.find('.tea-main-cnt').text(),
         profilePic: $el.find('.tea-img').attr('lazy-src'),
        profilePicKey: '',
*/
const TeacherModel = seq.define('teacher', {
  // 表结构：表名（自动转成teachers）和对应字段
  tid: {
    comment: 'teacher ID',
    type: STRING(20),
    allowNull: false,
    unique: true, // cid唯一
  },
  name: {
    comment: "the teacher's name",
    type: STRING(30),
    allowNull: false,
  },
  courseNum: {
    comment: 'the quantity of teacher‘s course',
    type: INTEGER(20),
    allowNull: false,
  },
  studentsNum: {
    comment: 'students quantity of the teacher',
    type: INTEGER(20),
    allowNull: false,
  },
  introduction: {
    comment: 'teacher’s introduction',
    type: STRING,
    allowNull: false,
  },
  profilePic: {
    comment: 'teacher profile image url',
    type: STRING,
    allowNull: false,
  },
  profilePicKey: {
    comment: 'teacher profile image qiniu key',
    type: STRING,
    allowNull: false,
  },
})

module.exports = TeacherModel
