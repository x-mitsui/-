// 教育机构信息
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.main,
  callback() {
    const $ = window.$
    const $section = $('.agency-head')

    return {
      logoUrl: $section.find('.agency-head-logo').prop('src'),
      logoKey: '', // 将来用来定位七牛地址索引
      name: $section.find('.ag-title-main').text(),
      feedBackRate: $section
        .find('.ag-info span')
        .eq(0)
        .text()
        .replace(/[^0-9]/gi, ''),
      studentsCount: $section.find('.ag-info span span').attr('data-num'), //获取自定义属性用attr
      slogan: $section.find('.ag-info .ag-info-des').text(),
      qqLink: $section.find('.ag-info .ag-info-btn').prop('href'),
    }
  },
})
