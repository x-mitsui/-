const seq = require('./connection/mysql_connect')

require('./models')

seq
  .authenticate()
  .then(() => {
    console.log('connect mysql successfully')
  })
  .catch((err) => {
    console.log('connect mysql falied:', err)
  })
// 建表 - 终端运行：node ./db/sync.js
seq.sync({ force: true }).then(() => {
  console.log('The table has been synchronized into database successfully!')
  process.exit() //终止进程
})
