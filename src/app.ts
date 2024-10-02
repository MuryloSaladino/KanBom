import express from "express";
import cors from "cors";

import "express-async-errors";
import "reflect-metadata";
import userRouter from "./routes/users.routes";
import handleError from "./middlewares/handleError.middleware";
import loginRouter from "./routes/login.routes";
import teamRouter from "./routes/teams.routes";
import { serve, setup } from "swagger-ui-express";
import swaggerDocs from "../docs/routes/swagger.json"
import projectRouter from "./routes/projects.routes";


const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());


// Routers
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/teams", teamRouter);
app.use("/api/projects", projectRouter);


// Docs
if(process.env.NODE_ENV == "dev") {
    app.use("/docs", serve, setup(swaggerDocs))
}

// Error handlers
app.use(handleError);

export default app;
