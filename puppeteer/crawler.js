const pt = require("puppeteer");
(async () => {
  const browser = await pt.launch();
  const url = "https://msiwei.ke.qq.com/";
  const pg = await browser.newPage();

  await pg.goto(url, {
    timeout: 30 * 1000,
    waitUntil: "networkidle2", // 500ms只能没有发起连接，表示完成
  });

  const result = await pg.evaluate(() => {
    const $ = window.$;
    const $item = $(".agency-big-banner-ul .agency-big-banner-li");

    let data = [];

    $item.each((index, item) => {
      const $el = $(item);
      const $elLink = $el.find(".js-banner-btnqq");

      const dataItem = {
        cid: $elLink.attr("data-id"),
        href: $elLink.prop("href"),
        imgUrl: $elLink.find("img").prop("src"),
        title: $elLink.prop("title"),
      };

      data.push(dataItem);
    });

    return data;
  });

  await browser.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000);
})();
