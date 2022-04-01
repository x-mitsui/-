const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.main,
  callback() {
    const $ = window.$
    const $item = $('.agency-big-banner-ul .agency-big-banner-li')

    let data = []

    $item.each((index, item) => {
      const $el = $(item)
      const $elLink = $el.find('.js-banner-btnqq')

      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src').replace('webp', ''),
        title: $elLink.prop('title'),
        imgKey: ''
      }

      data.push(dataItem)
    })

    return data
  }
})
