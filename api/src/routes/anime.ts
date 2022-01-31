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
router.get("/test", getAllAnimeFromSubs);
router.get("/test/season", getAllAnimeFromSeason);
router.get("/test/anime", getInfoAboutAnimeFromSub);

export default router;
