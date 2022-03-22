const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT, DECIMAL } = Sequelize
/*
        href: $itemLk.prop('href'),
        mainTitle,
        title: $itemLk.prop('title'),
        imgUrl: $itemLk.find('.spread-course-cover').prop('src'),
        imgKey: '',
        description: $el.find('.spread-course-wrap .spread-course-des').text(),
        teacherImg: $el.find('.spread-course-wrap .spread-course-face img').prop('src'),
        teacherName: $el.find('.spread-course-wrap .spread-course-face span:eq(0)').text(),
        buyCount: $el
          .find('.spread-course-wrap .spread-course-face span')
          .eq(1)
          .text()
          .replace(/[^0-9]/gi, ''),
        price: $el.find('.spread-course-price ').text().replace(/\s/gi, ''),
*/
const RecomCourseModel = seq.define('recom_course', {
  // 表结构：表名（recom_courses）和对应字段
  cid: {
    comments: 'course id',
    type: INTEGER,
    allowNull: false,
    unique: true
  },
  href: {
    comment: 'recommend course url',
    type: STRING,
    allowNull: false
  },
  mainTitle: {
    comment: "recommend course's main title",
    type: STRING,
    allowNull: false
  },
  title: {
    comment: "recommend course's title",
    type: STRING,
    allowNull: false
  },
  imgUrl: {
    comment: "url of recommend course's image ",
    type: STRING(200),
    allowNull: false
  },
  imgKey: {
    comment: "the qiuniu key recommend course's image_url ",
    type: STRING(30),
    allowNull: false
  },
  description: {
    comment: "recommend course's description ",
    type: STRING,
    allowNull: false
  },
  teacherImg: {
    comment: "recommend course's teacherImg url",
    type: STRING,
    allowNull: false
  },
  teacherImgKey: {
    comment: "qiniu key of recommend course's teacherImgKey ",
    type: STRING,
    allowNull: false
  },
  teacherName: {
    comment: "recommend course's teacherName ",
    type: STRING,
    allowNull: false
  },
  buyCount: {
    comment: "recommend course's purchase quantity ",
    type: DECIMAL,
    allowNull: false
  },
  price: {
    comment: "recommend course's price ",
    type: INTEGER,
    allowNull: false
  },
  status: {
    comment: 'the recom course status',
    type: INTEGER(1),
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = RecomCourseModel
