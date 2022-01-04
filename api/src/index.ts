import express from "express";
import morgan from "morgan";

import cors from "./config/cors";
import router from './routes/index';

const PORT = 4000;

const app = express();

app.use(cors);
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms - :res[content-length] - [:date[clf]]"));

app.use('/api/', router);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

export default app;