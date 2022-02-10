const pt = require("puppeteer");

module.exports = async (options) => {
  const browser = await pt.launch();
  const url = options.url;
  const pg = await browser.newPage();

  await pg.goto(url, {
    timeout: 30 * 1000,
    waitUntil: "networkidle2", // 500ms只能没有发起连接，表示完成
  });

  const result = await pg.evaluate(options.callback);

  await browser.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
};
