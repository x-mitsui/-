const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

/*
  poseterUrl: $wrapper
        .find('.about-banner-wrap-0')
        .css('background')
        .match(/\"(.+?)\"/)[1],
      posterKey: '',
      title: $wrapper.find('.about-agency-propagate').text(),
      name: $wrapper.find('.about-agency-name').text(),
      intro: $wrapper.find('.about-agency-intr').text(),
*/
const CourseModel = seq.define('about', {
  // 表结构：表名（自动转成abouts）和对应字段
  aid: {
    comment: 'about id',
    type: INTEGER(10),
    allowNull: false,
    unique: true,
  },
  poseterUrl: {
    comment: 'the about url',
    type: STRING,
    allowNull: false,
  },
  title: {
    comment: 'the about name',
    type: STRING,
    allowNull: false,
  },
  name: {
    comment: 'the about name',
    type: STRING(30),
    allowNull: false,
  },
  intro: {
    comment: 'about introduction',
    type: STRING,
    allowNull: false,
  },

  posterKey: {
    comment: 'about poster qiniu key',
    type: STRING,
    allowNull: false,
  },
})

module.exports = CourseModel
