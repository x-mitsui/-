const cp = require("child_process");
const path = require("path");

const { nanoid } = require("nanoid");
const Qiniu = require("qiniu");

module.exports = {
  startProcess(options) {
    const script = path.resolve(__dirname, options.path);
    const child = cp.fork(script, []);
    let invoked = false;

    child.on("message", (data) => {
      options.message(data);
    });

    child.on("exit", (code) => {
      if (invoked) {
        return;
      }
      invoked = true;
      options.exit(code);
    });

    child.on("error", (err) => {
      if (invoked) {
        return;
      }
      invoked = true;
      options.error(err);
    });
  },
  qiniuUploads(options) {
    const mac = new Qiniu.auth.digest.Mac(options.ak, options.sk);
    const conf = new Qiniu.conf.Config();
    const client = new Qiniu.rs.BucketManager(mac, conf);
    const key = nanoid() + options.ext; //合成文件名

    return new Promise((resolve, reject) => {
      client.fetch(options.url, options.bucket, key, (error, ret, info) => {
        if (error) {
          reject(error);
        } else {
          if (info.statusCode === 200) {
            resolve({ key });
          } else {
            reject(info);
          }
        }
      });
    });
  },
};
