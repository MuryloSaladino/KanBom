import { z } from "zod";
import { UserSchema } from "../schemas/users.schemas";

export type IUserPayload = z.infer<typeof UserSchema>;
