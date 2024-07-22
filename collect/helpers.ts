import puppeteer from "puppeteer-extra";
import UserAgent from "user-agents";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from 'fs';
import AnonymizeUserAgentPlugin from "puppeteer-extra-plugin-anonymize-ua";

const MIN_WAIT = 10000;
const MAX_WAIT = 20000;
export const delay = (time: number = 500) =>
  time
    ? new Promise((resolve) => setTimeout(resolve, time))
    : new Promise((resolve) =>
      setTimeout(
        resolve,
        Math.floor(Math.random() * (MAX_WAIT - MIN_WAIT + 1) + MIN_WAIT)
      )
    );

export const get_page = async () => {
  puppeteer.use(StealthPlugin());
  const userAgent = new UserAgent({
    platform: "MacIntel",
    deviceCategory: "desktop",
  });

  const userAgentStr = userAgent.toString();
  const anonymizeUserAgentPlugin = AnonymizeUserAgentPlugin({
    stripHeadless: true,
    customFn: () => userAgentStr,
  });

  puppeteer.use(anonymizeUserAgentPlugin);

  const browser = await puppeteer.launch({
    //headless: "new",
    headless: false,
    args: ["--incognito"],
  });

  var [page] = await browser.pages();

  await page.setUserAgent(userAgentStr);

  try {
    const cookiesString = await fs.readFileSync("./cookies.json");
    const cookies = JSON.parse(cookiesString.toString());
    await page.setCookie(...cookies);
  } catch (e) { }
  return page;
};

