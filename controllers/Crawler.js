const { qiniu } = require("../config/config");
const { startProcess, qiniuUploads } = require("../libs/utils");
class Crawler {
  crawlSliderData() {
    startProcess({
      path: "../crawlers/slider",
      async message(data) {
        console.log(data);
        data.map(async (item) => {
          if (item.imgUrl && !item.imgKey) {
            try {
              const imgData = await qiniuUploads({
                url: item.imgUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ak: qiniu.keys.ak,
                sk: qiniu.keys.sk,
                ext: ".jpg",
              });

              if (imgData.key) {
                item.imgKey = imgData.key;
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
      },
      async exit(code) {
        console.log(code);
      },
      async error(err) {
        console.log(err);
      },
    });
  }
}

module.exports = new Crawler();
