import express from "express";

import { getAnime, getFromSeason } from "../controllers/anime";
import { getAllAnimeFromSubs } from "../libs/getAnimeFromSubs";

const router = express.Router();

router.post("/series", getAnime);
router.post("/season", getFromSeason);
router.post("/test", getAllAnimeFromSubs);

export default router;
