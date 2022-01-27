import puppeteer from "puppeteer";
import axios from "axios";
import FormData from "form-data";

import { Request, Response } from "express";
import { JSDOM } from "jsdom";

const title = "";
const season = "";
const year = "";

const baseURL = `https://nanasubs.pl`;
const animeListURL = `${baseURL}/queries/ns-anime_search.php`;
const animeInfoURL = `${baseURL}/anime/${title}`;
const animeSeasonURL = `${baseURL}/anime/sezony/${season}-${year}`;

const getDataFromPage = async (URL: string) => {
  const formData = new FormData();
  formData.append("order", "title");
  formData.append("sort", "ASC");

  try {
    const result = await axios.post(URL, formData, {
      headers: formData.getHeaders(),
    });
    // console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

const scrapeDataFromHTML = (
  webpage: string,
  query: string,
  attribute?: string
) => {
  const returnValue: (string | null)[] = [];
  const dom = new JSDOM(webpage);
  dom.window.document.querySelectorAll(query).forEach((element, index) => {
    if (attribute) {
      returnValue.push(element.getAttribute(attribute));
    } else {
      returnValue.push(element.textContent);
    }
  });
  return returnValue;
};

export const getListOfAnime = async () => {
  try {
    const webpage = await getDataFromPage(animeListURL);
    const title = await scrapeDataFromHTML(webpage, ".img-box .content h3");
    const poster = await scrapeDataFromHTML(webpage, ".img-box img", "src");
    let link = await scrapeDataFromHTML(webpage, ".card-link", "href");
    let temp: any = [];

    link.forEach((element) => {
      temp.push(findTitleString(element));
    });

    link = temp;

    const animeArray = [];

    for (let i = 0; i < title.length; i++) {
      const temp = {
        title: title[i],
        poster: poster[i],
        link: link[i],
      };
      animeArray.push(temp);
    }
    return animeArray;
  } catch (err: any) {
    console.log("Nanatsu getListOfAnime error: " + err);
    return;
  }
};

export const getInfoAboutAnime = async (req: Request, res: Response) => {
  try {
    try {
      const webpage = await getDataFromPage(animeInfoURL);
      const title = await scrapeDataFromHTML(
        webpage,
        ".anime__container .anime__title"
      );
      // const
      // const titleString = await findTitleString();

      // const poster = await scrapeDataFromHTML(webpage, ".img-box img", "src");
      // const banner = await scrapeDataFromHTML(webpage, ".anime__banner", "src");
      const description = await scrapeDataFromHTML(
        webpage,
        ".anime__description"
      );

      const animeArray = [];

      for (let i = 0; i < title.length; i++) {
        const temp = [];
        temp.push(title[i]);
        // temp.push(poster[i]);
        temp.push(description[i]);
        animeArray.push(temp);
      }

      res.status(200).send({ titles: animeArray });
    } catch (err: any) {
      res.status(500).send({ message: "Error occurred" });
    }
  } catch (err: any) {
    res.status(500).send({ message: "No title found" });
  }
};

const findTitleString = (str: string | null) => {
  const regex = /^https:\/\/nanasubs\.pl\/anime\/(\S*)$/gm;
  let m;
  if (!str) return;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    return m[1];
  }
};
