import { z } from "zod";
import { roles } from "../types/boards.types";

export const createBoardSchema = z.object({
    name: z.string().min(3).max(50),
    thumbnail: z.string().min(3).max(50).nullable(),
}).strict()

export const updateBoardSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    thumbnail: z.string().min(3).max(50).nullable().optional(),
}).strict()

export const boardRoleSchema = z.object({
    role: z.enum(roles)
}).strict()

export const updateboardRoleSchema = z.object({
    role: z.enum(roles).optional()
}).strict()
