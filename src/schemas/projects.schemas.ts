import { z } from "zod";
import { roles } from "../types/projects.types";

export const createProjectSchema = z.object({
    name: z.string().min(3).max(50),
    thumbnail: z.string().min(3).max(50).nullable(),
}).strict()

export const updateProjectSchema = z.object({
    name: z.string().min(3).max(50).optional(),
    thumbnail: z.string().min(3).max(50).nullable().optional(),
}).strict()

export const inviteToProjectSchema = z.object({
    role: z.enum(roles)
}).strict()

export const participantUpdateSchema = z.object({
    role: z.enum(roles).optional()
}).strict()
