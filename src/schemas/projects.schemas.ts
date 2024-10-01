import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(3).max(50),
    thumbnail: z.string().min(3).max(50).nullable(),
}).strict()

export const inviteToProjectSchema = z.object({
    role: z.enum(["Owner", "Editor", "Reader"])
}).strict()
