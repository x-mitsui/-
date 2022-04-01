// 推荐课程信息
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.main,
  callback() {
    const $ = window.$
    const $item = $('.spread-course-ul li')
    const mainTitle = $('.agency-spread-wrap h4').text()

    const data = []

    $item.each(function (index, item) {
      const $el = $(item)
      const $itemLk = $el.find('a')

      const dataItem = {
        cid: parseInt($el.attr('report-tdw').split('&')[1].split('=')[1]),
        href: $itemLk.prop('href'),
        mainTitle,
        title: $itemLk.prop('title'),
        imgUrl: $itemLk.find('.spread-course-cover').prop('src').replace('webp', ''),
        imgKey: '',
        description: $el.find('.spread-course-wrap .spread-course-des').text(),
        teacherImg: $el
          .find('.spread-course-wrap .spread-course-face img')
          .prop('src')
          .replace('webp', ''),
        teacherImgKey: '',
        teacherName: $el.find('.spread-course-wrap .spread-course-face span:eq(0)').text(),
        buyCount: parseInt(
          $el
            .find('.spread-course-wrap .spread-course-face span')
            .eq(1)
            .text()
            .replace(/[^0-9]/gi, '')
        ),
        price: Number(
          $el.find('.spread-course-wrap .spread-course-price').text().replace(/¥/, '').trim()
        )
      }
      data.push(dataItem)
    })
    return data
  }
})
