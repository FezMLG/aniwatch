import { Request, Response } from "express";
import {
  getListOfAllNana as listNana,
  getAllFromSeason as seasonNana,
  getInfoAboutAnimeNana as titleNana,
} from "./nanasubs";
import {
  getListOfAllFrixy as listFrixy,
  getAllFromSeasonFrixy as seasonFrixy,
  getInfoAboutAnimeFrixy as titleFrixy,
} from "./frixysubs";

export const getAllAnimeFromSubs = async (req: Request, res: Response) => {
  try {
    const nana = await listNana();
    const frixy = await listFrixy();
    const subsList = {
      FrixySubs: frixy,
      NanaSubs: nana,
    };

    res.status(200).send(subsList);
  } catch (err: any) {
    res.status(500).send({ message: "No title found" });
  }
};

export const getAllAnimeFromSeason = async (req: Request, res: Response) => {
  try {
    const { season, year } = req.body;
    const nana = await seasonNana(season, year);
    const frixy = await seasonFrixy(season, year);
    const subsList = {
      FrixySubs: frixy,
      NanaSubs: nana,
    };

    res.status(200).send(subsList);
  } catch (err: any) {
    res.status(500).send({ message: "No title found" });
  }
};

export const getInfoAboutAnimeFromSub = async (req: Request, res: Response) => {
  try {
    const { subName, subBaseLink } = req.body;
    let anime: any;
    switch (subName) {
      case "FrixySubs":
        anime = await titleFrixy(subBaseLink);
        break;
      case "NanaSubs":
        anime = await titleNana(subBaseLink);
        break;
      default:
        anime = { message: "No matching subs" };
        break;
    }
    res.status(200).send(anime);
  } catch (err: any) {
    res.status(500).send({ message: "No title found" });
  }
};
