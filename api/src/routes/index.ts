import express from "express";

import animeRouter from "./anime";

const router = express.Router();

router.use('/anime', animeRouter);

export default router;