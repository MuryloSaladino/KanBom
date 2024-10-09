import { Router } from "express";
import { createUserController, deleteOwnUserController, getOwnUserController, updateOwnUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { deleteNotificationController, getNotificationsController } from "../controllers/notifications.controllers";

const userRouter = Router();

userRouter.post("", validateBody(createUserSchema), createUserController);
userRouter.get("", authenticate, getOwnUserController);
userRouter.patch("", authenticate, validateBody(updateUserSchema), updateOwnUserController);
userRouter.delete("", authenticate, deleteOwnUserController);

userRouter.get("/notifications", getNotificationsController);
userRouter.delete("/notifications/:notificationId", deleteNotificationController);

export default userRouter;
