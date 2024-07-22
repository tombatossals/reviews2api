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
  const keep_going = true;
  const reviews = [];
  do {

    await page.goto(url);
    await page.waitForSelector("div[data-hook='review']");

    const new_reviews = page.evaluate(() => {
      const els = Array.from(document.querySelectorAll("div[data-hook='review']"));
      return els.map((el) => {
        const title = el.querySelector("[data-hook='review-title']").textContent.trim();
        const stars = parseFloat(el.querySelector("[data-hook='cmps-review-star-rating']").textContent.split(" ")[0].trim());
        const name = el.querySelector(".a-profile-name").textContent.trim();
        const datestr = el.querySelector("[data-hook='review-date']").textContent.trim();
        const review = el.querySelector("[data-hook='review-body']").textContent.trim();

        return {
          title,
          stars,
          name,
          datestr,
          review
        };
      });
    });

    reviews.push(...new_reviews);

    const [button] = await page.$x("//button[contains(., 'Button text')]");
    if (button) {
      await button.click();
    }

  } while (keep_going);

  return reviews;
}

const get_date = (str => {
  const meses = {
    enero: 1, febrero: 2, marzo: 3, abril: 4,
    mayo: 5, junio: 6, julio: 7, agosto: 8,
    septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12
  };

  const regex = /(\d{1,2}) de (\w+) de (\d{4})/;
  const match = str.match(regex);
  const dia = match[1];
  const mes = match[2];
  const ano = match[3];

  const mesNumero = meses[mes];
  const fecha = dayjs(`${ano}-${mesNumero}-${dia}`, 'YYYY-M-D');

  const fechaISO = fecha.toISOString();

  return fechaISO;
})

const get_country = (str) => {
  const regex = /en ([\w\s]+) el/;
  const match = str.match(regex);
  return match[1];
}

const format_reviews = (reviews) => reviews.map(({ title, name, datestr, stars }) => ({
  title,
  name,
  date: get_date(datestr),
  country: get_country(datestr),
  stars
}));

const collect = async (asin: string = "B07T8FF784") => {
  const page = await get_page();
  const url = `https://www.amazon.es/gp/product/${asin}`;
  await page.goto(url);
  // await delay(5000);

  const title = await get_title(page);
  const image = await get_image(page);
  const reviews1 = await get_reviews(page);

  const reviews = format_reviews(reviews1);
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
