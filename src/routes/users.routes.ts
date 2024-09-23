import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, updateUserController } from "../controllers/users.controllers";
import authenticate from "../middlewares/authenticate.middleware";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", authenticate, getUserByIdController);
userRouter.patch("", authenticate, updateUserController);
userRouter.delete("", authenticate, deleteUserController);

export default userRouter;