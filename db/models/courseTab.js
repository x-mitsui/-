const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

/*
   cid: $itemLk.attr('data-id'),
        title: $itemLk.text(),
*/
const CourseTabModel = seq.define('course_tab', {
  // 表结构：表名（自动转成course tabs）和对应字段
  cid: {
    comment: 'course tab ID',
    type: INTEGER(4),
    allowNull: false,
    unique: true, // sid唯一
  },
  title: {
    comment: "course tab's name",
    type: STRING(30),
    allowNull: false,
  },
})

module.exports = CourseTabModel
