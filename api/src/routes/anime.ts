import express from 'express';

import { getAnime, getFromSeason } from '../controllers/anime';

const router = express.Router();

router.post('/series', getAnime);
router.post('/season', getFromSeason);

export default router;