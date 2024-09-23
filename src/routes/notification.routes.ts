import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { getNotificationsController } from "../controllers/notifications.controllers";

const notificationsRouter = Router();

notificationsRouter.get("", authenticate, getNotificationsController);

export default notificationsRouter;