import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, updateUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

const userRouter = Router();

userRouter.post("", validateBody(createUserSchema), createUserController);
userRouter.get("", authenticate, getUserByIdController);
userRouter.patch("", authenticate, validateBody(updateUserSchema), updateUserController);
userRouter.delete("", authenticate, deleteUserController);

export default userRouter;