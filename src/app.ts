import express from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routers/users.routes";
import handleError from "./middlewares/handleError.middleware";
import loginRouter from "./routers/login.routes";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(handleError);

export default app;