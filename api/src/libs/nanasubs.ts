import axios from "axios";
import FormData from "form-data";
import { JSDOM } from "jsdom";

const baseURL = `https://nanasubs.pl`;

const getDataFromPage = async (URL: string, form: string[][]) => {
  const formData = new FormData();
  form.forEach((element) => {
    formData.append(element[0], element[1]);
  });

  try {
    const result = await axios.post(URL, formData, {
      headers: formData.getHeaders(),
    });
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

export const getListOfAllNana = async () => {
  try {
    const form = [
      ["order", "title"],
      ["sort", "ASC"],
    ];
    const animeListURL = `${baseURL}/queries/ns-anime_search.php`;
    const webpage = await getDataFromPage(animeListURL, form);
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

export const getAllFromSeason = async (
  season: string | number,
  year: string | number
) => {
  try {
    const form = [
      ["order", "title"],
      ["sort", "ASC"],
      ["url", `${season}-${year}`],
    ];
    const animeSeasonURL = `${baseURL}/queries/ns-anime_search_season.php`;
    const webpage = await getDataFromPage(animeSeasonURL, form);
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

export const getInfoAboutAnimeNana = async (subBaseLink: string) => {
  try {
    try {
      const form = [
        ["order", "title"],
        ["sort", "ASC"],
      ];
      const animeInfoURL = `${baseURL}/anime/${subBaseLink}`;
      const webpage = await getDataFromPage(animeInfoURL, form);
      const title = await scrapeDataFromHTML(webpage, ".anime__title");
      const poster = await scrapeDataFromHTML(
        webpage,
        ".anime__wrapper img",
        "src"
      );
      const bannerStyle = await scrapeDataFromHTML(
        webpage,
        ".anime__banner",
        "style"
      );
      const banner = findBackgroundUrl(bannerStyle[0]);
      const description = await scrapeDataFromHTML(
        webpage,
        ".anime__description"
      );
      const shortInfoAnime = await scrapeDataFromHTML(
        webpage,
        ".anime__list .info"
      );
      const season = shortInfoAnime[2];
      const ep_count =
        shortInfoAnime[0] && shortInfoAnime[0].replace(/\s+/g, " ").trim();
      const status = checkIfCompleted(ep_count);
      const episodes = await scrapeDataFromHTML(
        webpage,
        ".episodes__slider a",
        "href"
      );

      const animeDetails = {
        subs: "NanaSubs",
        title: title[0],
        poster: poster[0],
        banner: banner,
        description: description[0],
        status,
        ep_count,
        episodes,
        season,
      };

      return animeDetails;
    } catch (err: any) {
      return { message: "Error occurred" };
    }
  } catch (err: any) {
    return { message: "No title found" };
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

const checkIfCompleted = (str: string | null) => {
  const regex = /(\d\/\d)/gm;
  let m;
  if (!str) return false;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    if (m[1]) {
      return false;
    } else {
      return true;
    }
  }
};

const findBackgroundUrl = (str: string | null) => {
  const regex = /background-image:.url\(.(.*).\)/;
  let m;
  if (!str) return false;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    return m[1];
  }
};
