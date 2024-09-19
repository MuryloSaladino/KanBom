import { Router } from "express";
import { createUserController, getUserByIdController, updateUserController } from "../controllers/users.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/:userId", getUserByIdController);
userRouter.patch("/:userId", updateUserController);

export default userRouter;