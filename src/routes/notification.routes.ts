import { Router } from "express";
import authenticate from "../middlewares/authenticate.middleware";
import { deleteNotificationController, getNotificationsController } from "../controllers/notifications.controllers";

const notificationsRouter = Router();

notificationsRouter.get("", authenticate, getNotificationsController);
notificationsRouter.delete("/:notificationId", authenticate, deleteNotificationController);

export default notificationsRouter;