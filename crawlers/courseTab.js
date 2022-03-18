// 爬取主页旁的课程选项卡信息
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.course,
  callback() {
    const $ = window.$ //由此可知，这个回调是运行在浏览器环境下的

    const $item = $('.course-tab-filter li')

    let data = []

    $item.each((index, item) => {
      const $el = $(item)
      const $itemLk = $el.find('.course-tab-filter-item'),
        title = $itemLk.text().replace('促', '')
      if (!title.includes('全部')) {
        data.push({
          cid: index,
          title
        })
      }
    })

    return data
  }
})
