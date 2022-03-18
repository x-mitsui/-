const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

/*
  cid: $itemLk.attr('data-id'),
        href: $itemLk.prop('href'),
        posterUrl: $itemLk.find('.item-img').prop('src'),
        courseName: $itemLk.find('.item.img').prop('title'),
        price:
          $el.find('.item-price').text() == '免费' ? '0' : $el.find('.item-price').text().slice(1),
        description: $el.find('.item-status-step').text(),
        studentCount: parseInt($el.find('.item-user').text()),

        field: -1, //分类
        posterKey: '',
*/
const CourseModel = seq.define('course', {
  // 表结构：表名（自动转成courses）和对应字段
  cid: {
    comment: 'course ID',
    type: INTEGER(10),
    allowNull: false,
    unique: true // cid唯一
  },
  href: {
    comment: 'the course detail page link',
    type: STRING(50),
    allowNull: false
  },
  courseName: {
    comment: 'the course name',
    type: STRING,
    allowNull: false
  },
  posterUrl: {
    comment: 'the course image url',
    type: STRING,
    allowNull: false
  },
  price: {
    comment: 'course’s price',
    type: STRING(10),
    allowNull: false
  },
  description: {
    comment: 'course description',
    type: STRING,
    allowNull: false
  },
  studentCount: {
    comment: 'the number of students that participate the course',
    type: INTEGER(10),
    allowNull: false
  },
  field: {
    comment: 'the course type',
    type: INTEGER(3),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    comment: 'the course status',
    type: INTEGER(1),
    defaultValue: 1,
    allowNull: false
  },
  posterKey: {
    comment: 'course poster qiniu key',
    type: STRING,
    allowNull: false
  }
})

module.exports = CourseModel
