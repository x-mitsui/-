const Sequelize = require("sequelize");
const seq = require("../connection/mysql_connect");
const { STRING, INTEGER, BIGINT } = Sequelize;

const Admin = seq.define("admin", {
  username: {
    comment: "admin user name",
    type: STRING,
    allowNull: false,
  },
  password: {
    comment: "crypto user password",
    type: STRING,
    allowNull: false,
  },
});

module.exports = Admin;
