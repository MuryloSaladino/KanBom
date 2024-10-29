import { z } from "zod";
import { roles } from "../types/boards.types";

export const createBoardSchema = z.object({
    name: z.string().min(3).max(50),
    color: z.string().min(3).max(50).optional(),
}).strict()

export const updateBoardSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    color: z.string().min(3).max(50).optional(),
}).strict()

export const boardRoleSchema = z.object({
    role: z.enum(roles)
}).strict()

export const updateboardRoleSchema = z.object({
    role: z.enum(roles).optional()
}).strict()
