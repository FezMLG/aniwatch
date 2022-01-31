import axios from "axios";

export const getListOfAllFrixy = async () => {
  try {
    // const { data } = await axios.get(
    //   `https://frixysubs.pl/api/anime?limit=30&offset=${offset}&season=${season},${year}&order_by=title&order=asc`
    // );
    const { data } = await axios.get(
      `https://frixysubs.pl/api/anime?limit=30&offset=0&order_by=title&order=asc`
    );

    const animeArray: { title: any; poster: any; link: any }[] = [];
    const { series } = data;

    series.forEach((element: { title: any; poster: any; link: any }) => {
      const temp = {
        title: element.title,
        poster: element.poster,
        link: element.link,
      };
      animeArray.push(temp);
    });

    return animeArray;
  } catch (err: any) {
    console.log("Frixy error:" + err);
    return;
  }
};

export const getAllFromSeasonFrixy = async (
  season: string | number,
  year: string | number
) => {
  try {
    switch (season) {
      case "zima":
        season = 4;
        break;
      case "wiosna":
        season = 1;
        break;
      case "lato":
        season = 2;
        break;
      case "jesien":
        season = 3;
        break;
      default:
        break;
    }
    const { data } = await axios.get(
      `https://frixysubs.pl/api/anime?limit=30&offset=0&season=${season},${year}&order_by=title&order=asc`
    );

    const animeArray: { title: any; poster: any; link: any }[] = [];
    const { series } = data;

    series.forEach((element: { title: any; poster: any; link: any }) => {
      const temp = {
        title: element.title,
        poster: element.poster,
        link: element.link,
      };
      animeArray.push(temp);
    });

    return animeArray;
  } catch (err: any) {
    console.log("Frixy error:" + err);
    return;
  }
};

export const getInfoAboutAnimeFrixy = async (baseLink: string) => {
  if (!baseLink) {
    return { message: "Title is empty" };
  }

  try {
    const { data } = await axios.get(
      `https://frixysubs.pl/api/anime/${baseLink}`
    );

    let season: string = "";
    switch (data.season.season) {
      case 1:
        season = "Wiosna";
        break;
      case 2:
        season = "Lato";
        break;
      case 3:
        season = "Jesień";
        break;
      case 4:
        season = "Zima";
        break;
      default:
        break;
    }

    const animeDetails = {
      subs: "FrixySubs",
      title: data.title,
      poster: data.poster,
      banner: data.banner,
      description: data.description,
      status: data.status,
      ep_count: data.ep_count,
      episodes: data.episodes,
      season: `${season} ${data.season.year}`,
    };
    return animeDetails;
  } catch (err: any) {
    return { message: "Error occurred" };
  }
};
