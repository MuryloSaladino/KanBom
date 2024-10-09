import express from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/users.routes";
import handleError from "./middlewares/handleError.middleware";
import loginRouter from "./routes/login.routes";
import workspacesRouter from "./routes/workspaces.routes";
import { serve, setup } from "swagger-ui-express";
import swaggerDocs from "../docs/routes/swagger.json"
import boardsRouter from "./routes/boards.routes";
import membersRouter from "./routes/members.routes";
import notificationsRouter from "./routes/notifications.routes";


const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());


// Routers
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/workspaces", workspacesRouter);
app.use("/api/workspaces", membersRouter);
app.use("/api/boards", boardsRouter);


// Docs
if(process.env.NODE_ENV == "dev") {
    app.use("/docs", serve, setup(swaggerDocs))
}

// Error handlers
app.use(handleError);

export default app;
