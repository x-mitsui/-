const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT, DECIMAL } = Sequelize
/*
const dataItem = {
        cid: index + 1,
        title: $item
          .find('.recommend-course-title')
          .text()
          .replace(/\n更多/g, ''),

        info: $item.find('.rec-group-info').text(),
        QQLink: $item.find('.rec-group-join').prop('href'),
        posterUrl: $item.find('.rec-group-mask').css('background-image'),

      }

      const $lis = $item.find('ul .course-card-item a')
      const _idList = []
      $lis.each((index, item) => {
        _idList.push($lis.attr('data-id'))
      })
      dataItem.courseIdList = _idList.toString()
*/

const CollectionModel = seq.define('collection', {
  // 表结构：表名（collections）和对应字段
  cid: {
    comment: 'collection id',
    type: DECIMAL,
    allowNull: false,
    unique: true
  },
  title: {
    comment: 'course title',
    type: STRING(30),
    allowNull: false
  },
  info: {
    comment: 'course infomation',
    type: STRING(30),
    allowNull: false
  },
  QQLink: {
    comment: 'the link to open QQ communication',
    type: STRING,
    allowNull: false
  },
  posterUrl: {
    comment: 'poster image url',
    type: STRING,
    allowNull: false
  },
  posterImgKey: {
    comment: "poster image's qiniu key",
    type: STRING(50),
    allowNull: false
  },
  courseIdList: {
    comment: 'the collection for containing course ids',
    type: STRING,
    allowNull: false
  },
  status: {
    comment: 'the collection status',
    type: INTEGER(1),
    defaultValue: 1,
    allowNull: false
  }
})

module.exports = CollectionModel
