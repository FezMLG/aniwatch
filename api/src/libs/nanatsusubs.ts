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

const getDataFromPage = async () => {
  const formData = new FormData();
  formData.append("order", "title");
  formData.append("sort", "ASC");

  try {
    const result = await axios.post(animeListURL, formData, {
      headers: formData.getHeaders(),
    });
    // console.log(result.data);
    return result.data;
  } catch (error) {
    return error;
  }
};

const getInfoAboutAnime = (
  webpage: string,
  query: string,
  attribute?: string
) => {
  const returnArray: (string | null)[] = [];
  const dom = new JSDOM(webpage);
  const title = dom.window.document
    .querySelectorAll(query)
    .forEach((element, index) => {
      if (attribute) {
        returnArray.push(element.getAttribute(attribute));
      } else {
        returnArray.push(element.textContent);
      }
    });
  return returnArray;
};

export const getAnimeTest = async (req: Request, res: Response) => {
  try {
    const webpage = await getDataFromPage();
    const title = await getInfoAboutAnime(webpage, ".img-box .content h3");
    const poster = await getInfoAboutAnime(webpage, ".img-box img", "src");
    const description = await getInfoAboutAnime(
      webpage,
      ".img-box .description"
    );

    const animeArray = [];

    for (let i = 0; i < title.length; i++) {
      const temp = [];
      temp.push(title[i]);
      temp.push(poster[i]);
      temp.push(description[i]);
      animeArray.push(temp);
    }

    res.status(200).send({ titles: animeArray });
  } catch (err: any) {
    res.status(500).send({ message: "Error occurred" });
  }
};
