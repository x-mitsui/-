// 爬取优秀学员信息
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.main,
  callback() {
    const $ = window.$ //由此可知，这个回调是运行在浏览器环境下的

    const $item = $('.stu')

    let data = []

    $item.each((index, item) => {
      const $el = $(item)
      data.push({
        sid: index + 1,

        studentImg: $el.find('.stu-img').prop('src'),
        studentName: $el.find('.stu-main h4').text(),
        intro: $el.find('.stu-main-cnt ').text().trim(), // 取出'\n'和空格
        courseName: $el.find('.stu-main-tit').text().trim(),
        courseLink: $el.find('.stu-main-tit').prop('href'),
        studentImgKey: '',
      })
    })

    return data
  },
})
