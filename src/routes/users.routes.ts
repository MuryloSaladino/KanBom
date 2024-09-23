import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, updateUserController } from "../controllers/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/:userId", getUserByIdController);
userRouter.patch("/:userId", updateUserController);
userRouter.delete("/:userId", deleteUserController);

export default userRouter;