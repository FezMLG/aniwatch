import { Request, Response } from "express";
import {
  getListOfAllNana as listNana,
  getAllFromSeason as seasonNana,
} from "./nanasubs";
import {
  getListOfAllFrixy as listFrixy,
  getAllFromSeasonFrixy as seasonFrixy,
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
