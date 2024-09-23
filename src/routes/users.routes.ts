import { Router } from "express";
import { createUserController, deleteUserController, getUserByIdController, getUsersController, updateUserController } from "../controllers/users.controllers";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/:userId", getUserByIdController);
userRouter.patch("/:userId", updateUserController);
userRouter.delete("/:userId", deleteUserController);
userRouter.get("", getUsersController);

export default userRouter;