import { z } from "zod";
import { roles } from "../types/boards.types";

export const BoardSchema = z.object({
    name: z.string().min(3).max(50),
    color: z.string().min(3).max(50).optional(),
}).strict()

export const BoardRoleSchema = z.object({
    role: z.enum(roles)
}).strict()
