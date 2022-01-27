import { Request, Response } from "express";
import axios from "axios";

export const getAllAnime = async () => {
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
