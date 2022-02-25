const Sequelize = require('sequelize')
const seq = require('../connection/mysql_connect')

const { STRING, INTEGER, BIGINT } = Sequelize

const AgencyInfoModel = seq.define('agency_info', {
  // 表结构：表名（agency_infos）和对应字段
  logoUrl: {
    comment: 'logo img url',
    type: STRING,
    allowNull: false,
  },
  name: {
    comment: 'agency name',
    type: STRING,
    allowNull: false,
  },
  feedBackRate: {
    comment: 'feed back rate',
    type: INTEGER,
    allowNull: false,
  },
  studentsCount: {
    comment: 'students count',
    type: INTEGER,
    allowNull: false,
  },
  slogan: {
    comment: 'agency slogan',
    type: STRING,
    allowNull: false,
  },
  qqLink: {
    comment: 'QQ infomation link',
    type: STRING,
    allowNull: false,
  },
  logoKey: {
    comment: 'qiniu logo image name',
    type: STRING,
    allowNull: false,
  },
})

module.exports = AgencyInfoModel
