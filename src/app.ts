import express from "express";
import cors from "cors";

import "express-async-errors";
import handleError from "./middlewares/handleError.middleware";
import { serve, setup } from "swagger-ui-express";
import swaggerDocs from "../docs/routes/swagger.json"
import getControllers from "./routes";


const app = express();

// Global Middlewares
app.use(express.json());
app.use(cors());

// Routers
app.use("/api", getControllers())

// Docs
if(process.env.NODE_ENV == "dev") {
    app.use("/docs", serve, setup(swaggerDocs))
}

// Error handlers
app.use(handleError);

export default app;
