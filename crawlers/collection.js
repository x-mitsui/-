// 合集推荐
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.main,
  callback() {
    const $ = window.$
    const $item = $('.agency-recommend-course')
    const data = []
    $item.each(function (index, item) {
      const $el = $(item)
      const dataItem = {
        cid: index + 1,
        title: $el
          .find('.recommend-course-title')
          .text()
          .replace(/(\\n|\s+|更多|)/g, ''),

        info: $el.find('.rec-group-info').text(),
        QQLink: $el.find('.rec-group-join').prop('href'),
        posterUrl: $el
          .find('.rec-group-mask')
          .css('background-image')
          .replace(/url\(\"(.+?)\"\)/g, '$1'),
        posterImgKey: '',
      }

      const $lis = $el.find('.course-card-list .course-card-item .item-img-link')
      const _idList = []
      $lis.each((index, item) => {
        _idList.push($(item).attr('data-id'))
      })

      dataItem.courseIdList = _idList.toString()
      data.push(dataItem)
    })

    return data
  },
})
