// 爬取 关于界面
const crawler = require('../libs/crawler')
const config = require('../config/config')
crawler({
  url: config.crawler.url.about,
  callback() {
    const $ = window.$ //由此可知，这个回调是运行在浏览器环境下的

    const $wrapper = $('.agency-about')

    return {
      aid: 1,
      poseterUrl: $wrapper
        .find('.about-banner-wrap-0')
        .css('background')
        .match(/\"(.+?)\"/)[1],
      posterKey: '',
      title: $wrapper.find('.about-agency-propagate').text(),
      name: $wrapper.find('.about-agency-name').text(),
      intro: $wrapper.find('.about-agency-intr').text().trim(),
    }
  },
})
