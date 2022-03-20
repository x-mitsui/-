const pt = require('puppeteer')

module.exports = async (options) => {
  /* Turn off headless mode - sometimes it's useful to see what the browser is displaying. Instead of launching in headless mode, launch a full version of the browser using headless: false:
   */
  // const browser = await pt.launch({ headless: false })
  const browser = await pt.launch()
  const url = options.url
  const pg = await browser.newPage()

  await pg.goto(url, {
    timeout: 60 * 1000,
    waitUntil: 'networkidle2' // 500ms只能没有发起连接，表示完成
  })

  const result = await pg.evaluate(options.callback) //获取浏览器那边执行options.callback后的result

  await browser.close()

  process.send(result) //send mes to main process

  setTimeout(() => {
    process.exit(0)
  }, 1000)
}
