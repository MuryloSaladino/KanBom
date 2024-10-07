import { z } from "zod";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";

export type TUserCreation = z.infer<typeof createUserSchema>;

export type TUserUpdate = z.infer<typeof updateUserSchema>;
