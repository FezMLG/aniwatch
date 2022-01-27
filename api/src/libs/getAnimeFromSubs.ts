import { Request, Response } from "express";
import { getListOfAnime as listNana } from "./nanasubs";
import { getAllAnime as listFrixy } from "./frixysubs";

const allSeries = [];

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
