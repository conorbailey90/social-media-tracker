const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", async (req, res) => {
  console.log(req.body.conor);
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.youtube.com/channel/UCcNEvbajb34cXufYddZ57og?view_as=subscriber"
  );

  const YTCount = await page.evaluate(() => {
    let count = document.querySelector("#subscriber-count").innerText;
    return parseInt(count.split(" ")[0]);
  });

  await page.goto("https://www.instagram.com/conorbeats/?hl=en");

  const instaCount = await page.evaluate(() => {
    let count = document.querySelector(
      "#react-root > section > main > div > header > section > ul > li:nth-child(2) > a > span"
    ).innerText;

    return parseInt(count);
  });

  await page.goto("https://twitter.com/conorbailey?lang=en");

  const twitterCount = await page.evaluate(() => {
    let count = document.querySelector(
      "#react-root > div > div > div.css-1dbjc4n.r-13qz1uu.r-417010 > main > div > div > div > div > div > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-ku1wi2.r-1j3t67a.r-m611by > div.css-1dbjc4n.r-18u37iz.r-1w6e6rj.r-1h2hfjv > div:nth-child(2) > a > span.css-901oao.css-16my406.r-1qd0xha.r-vw2c0b.r-ad9z0x.r-bcqeeo.r-qvutc0 > span"
    ).innerText;
    return parseInt(count);
  });

  let subCounts = await {
    YTCount,
    instaCount,
    twitterCount,
  };

  await browser.close();

  res.json(subCounts);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
