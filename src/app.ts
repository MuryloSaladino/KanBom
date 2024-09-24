import express from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/users.routes";
import handleError from "./middlewares/handleError.middleware";
import loginRouter from "./routes/login.routes";
import teamRouter from "./routes/teams.routes";
import notificationsRouter from "./routes/notification.routes";

import projectRouter from "./routes/project.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/teams", teamRouter);
app.use("/api/notifications", notificationsRouter);

app.use("/api/projects", projectRouter);

app.use(handleError);

export default app;