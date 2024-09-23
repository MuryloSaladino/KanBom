import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, updateUserController } from "../controllers/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", getUserByIdController);
userRouter.patch("", updateUserController);
userRouter.delete("", deleteUserController);

export default userRouter;