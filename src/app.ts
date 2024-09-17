import express from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";


const app = express();

app.use(express.json());
app.use(cors())

export default app;