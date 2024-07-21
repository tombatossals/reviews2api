import { parseArgs } from "node:util";
import fs from "fs";
import dayjs from "dayjs";

dayjs.locale("es");

import {
  delay,
  get_page,
} from "./helpers";

const url = process.env.IDEALISTA_URL;
const orderby = process.env.IDEALISTA_ORDERBY;

const get_title = async (page: any) => {
  const title = await page.evaluate(() => {
    return document.querySelector("#productTitle").innerHTML;
  });

  return title.trim();
}

const get_image = async (page: any) => {
  const image = await page.evaluate(() => {
    return document.querySelector("#landingImage").attributes["data-old-hires"].value;
  });

  return image.trim();
}

const get_reviews_url = async (page: any) => {
  const url = await page.evaluate(() => {
    return document.querySelector("#cr-pagination-footer-0 > a").attributes["href"].value;
  });

  return url.trim();
}

const get_reviews = async (page: any) => {
  const url_path = await get_reviews_url(page);
  const url = `https://www.amazon.es${url_path}`;

  await page.goto(url);
  await page.waitForSelector("div[data-hook='review']");

  const meses = {
    enero: 1, febrero: 2, marzo: 3, abril: 4,
    mayo: 5, junio: 6, julio: 7, agosto: 8,
    septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
  };

  const reviews = page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("div[data-hook='review']"));
    return els.map((el) => {
      const title = el.querySelector("[data-hook='review-title']").textContent.trim();
      const stars = parseFloat(el.querySelector("[data-hook='cmps-review-star-rating']").textContent.split(" ")[0].trim());
      const name = el.querySelector(".a-profile-name").textContent.trim();
      const date = el.querySelector("[data-hook='review-date']").textContent.trim();
      const review = el.querySelector("[data-hook='review-body']").textContent.trim();

      return {
        title,
        stars,
        name,
        date,
        review
      };
    });
  });
  return reviews;
}

const collect = async (asin: string = "B07T8FF784") => {
  const page = await get_page();
  const url = `https://www.amazon.es/gp/product/${asin}`;
  await page.goto(url);
  // await delay(5000);

  const title = await get_title(page);
  const image = await get_image(page);
  const reviews = await get_reviews(page);
  console.log(reviews);

  fs.writeFileSync(`../json/${asin}.json`, JSON.stringify({ title, image, asin, reviews }, null, 2));

  const cookies = await page.cookies();
  await fs.writeFileSync("./cookies.json", JSON.stringify(cookies, null, 2));
  await page.browser().close();
};

const {
  values: { asin },
} = parseArgs({
  options: {
    asin: {
      type: "string",
      default: "B08H93GKNJ",
    },
  },
});

collect(asin);
