const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

const SliderModel = seq.define('slider', {
  // 表结构：表名（自动转成sliders）和对应字段
  cid: {
    comment: 'course ID',
    type: STRING(20),
    allowNull: false,
    unique: true, // cid唯一
  },
  href: {
    comment: 'course detail page link',
    type: STRING,
    allowNull: false,
  },
  imgUrl: {
    comment: 'course image url',
    type: STRING,
    allowNull: false,
  },
  title: {
    comment: 'course name',
    type: STRING,
    allowNull: false,
  },
  imgKey: {
    comment: 'qiniu image name',
    type: STRING,
    allowNull: false,
  },
  status: {
    comment: 'course status',
    type: INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
})

module.exports = SliderModel
