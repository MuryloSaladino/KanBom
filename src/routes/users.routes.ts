import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, updateUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import { deleteNotificationController, getNotificationsController } from "../controllers/notifications.controllers";

const userRouter = Router();

userRouter.post("", validateBody(createUserSchema), createUserController);
userRouter.get("", authenticate, getUserByIdController);
userRouter.patch("", authenticate, validateBody(updateUserSchema), updateUserController);
userRouter.delete("", authenticate, deleteUserController);

userRouter.get("/notifications", getNotificationsController);
userRouter.delete("/notifications/:notificationId", deleteNotificationController);

export default userRouter;
