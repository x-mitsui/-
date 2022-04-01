const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.teacher,
  callback() {
    const $ = window.$ //由此可知，这个回调是运行在浏览器环境下的

    const $item = $('.tea')

    let data = []

    $item.each((index, item) => {
      const $el = $(item)

      data.push({
        tid: index + 1,
        name: $el.find('.tea-main-title').text(),
        href: $el.find('.tea-face').prop('href'),
        courseNum: parseInt(
          $el
            .find('.tea-main-sub span')
            .eq(0)
            .text()
            .replace(/[^0-9]/g, '')
        ),
        studentsNum: parseInt(
          $el
            .find('.tea-main-sub span')
            .eq(1)
            .text()
            .replace(/[^0-9]/g, '')
        ),
        introduction: $el.find('.tea-main-cnt').text(),
        profilePic: 'http:' + $el.find('img').attr('lazy-src').replace('webp', ''), //这里注意，使用lazy-src，因为注意到图片未加载时，没有src属性
        profilePicKey: ''
      })
    })

    return data
  }
})
