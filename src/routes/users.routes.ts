import { Router } from "express";
// import { createUserController, deleteOwnUserController, getOwnUserController, updateOwnUserController } from "../controllers/users.controllers";
// import authenticate from "../middlewares/authenticate.middleware";
// import validateBody from "../middlewares/validateBody.middleware";
// import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

const userRouter = Router();

// userRouter.post("", validateBody(createUserSchema), createUserController);
// userRouter.get("", authenticate, getOwnUserController);
// userRouter.patch("", authenticate, validateBody(updateUserSchema), updateOwnUserController);
// userRouter.delete("", authenticate, deleteOwnUserController);

export default userRouter;
