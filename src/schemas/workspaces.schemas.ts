import { z } from "zod";

export const createWorkspaceSchema = z.object({
    name: z.string().min(3).max(50),
}).strict()

export const updateWorkspaceSchema = z.object({
    name: z.string().min(3).max(50).optional(),
}).strict()
