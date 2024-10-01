import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { deleteNotificationController, getNotificationsController } from "../controllers/notifications.controllers";

const notificationsRouter = Router();

notificationsRouter.use(authenticate)

notificationsRouter.get("", getNotificationsController);
notificationsRouter.delete("/:notificationId", deleteNotificationController);

export default notificationsRouter;