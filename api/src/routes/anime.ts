import express from "express";

import { getAnime, getFromSeason } from "../controllers/anime";
import {
  getAllAnimeFromSubs,
  getAllAnimeFromSeason,
  getInfoAboutAnimeFromSub,
} from "../libs/getAnimeFromSubs";

const router = express.Router();

router.post("/series", getAnime);
router.post("/season", getFromSeason);
router.post("/test", getAllAnimeFromSubs);
router.post("/test/season", getAllAnimeFromSeason);
router.post("/test/anime", getInfoAboutAnimeFromSub);

export default router;
