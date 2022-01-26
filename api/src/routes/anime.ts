import express from "express";

import { getAnime, getFromSeason } from "../controllers/anime";
import { getAnimeTest } from "../libs/nanatsusubs";

const router = express.Router();

router.post("/series", getAnime);
router.post("/season", getFromSeason);
router.post("/test", getAnimeTest);

export default router;
