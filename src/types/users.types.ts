import { z } from "zod";
import { UserSchema, updateUserSchema } from "../schemas/users.schemas";

export type TUserCreation = z.infer<typeof UserSchema>;

export type TUserUpdate = z.infer<typeof updateUserSchema>;
