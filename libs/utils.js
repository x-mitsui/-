const cp = require('child_process')
const path = require('path')
const crypto = require('crypto')

const { nanoid } = require('nanoid')
const Qiniu = require('qiniu')
const qiniuConfig = require('../config/config')
const { cryptoSecret } = require('../config/config')
function startProcess(options) {
  const script = path.resolve(__dirname, '../crawlers/', options.file)
  const child = cp.fork(script, [])
  let invoked = false

  child.on('message', (data) => {
    options.message(data)
  })

  child.on('exit', (code) => {
    if (invoked) {
      return
    }
    invoked = true
    options.exit(code)
  })

  child.on('error', (err) => {
    if (invoked) {
      return
    }
    invoked = true
    options.error(err)
  })
}
function qiniuUploads(options) {
  const mac = new Qiniu.auth.digest.Mac(qiniuConfig.qiniu.keys.ak, qiniuConfig.qiniu.keys.sk)
  const conf = new Qiniu.conf.Config()
  const client = new Qiniu.rs.BucketManager(mac, conf)
  console.log('options.dirName:', options.dirName)
  const key = options.dirName + nanoid() + options.ext //合成文件名

  return new Promise((resolve, reject) => {
    // 抓取网络资源到空间
    client.fetch(options.url, options.bucket, key, (error, ret, info) => {
      if (error) {
        reject(error)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

function makeCrypto(str) {
  const _md5 = crypto.createHash('md5')
  const content = `str=${str}&secret=${cryptoSecret}`
  return _md5.update(content).digest('hex')
}

function trimSpace(str) {
  return str.replace(/\s+/g, '')
}
function returnInfo(errorInfo, data) {
  if (data) {
    errorInfo.data = data
  }
  return errorInfo
}
module.exports = {
  startProcess,
  qiniuUploads,
  makeCrypto,
  trimSpace,
  returnInfo
}
