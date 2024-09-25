import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    birthdate: z.string().date(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(255),
    profilePicture: z.string().max(255).nullable()
}).strict();

export const updateUserSchema = z.object({
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    birthdate: z.string().date().optional(),
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(255).optional(),
    profilePicture: z.string().max(255).nullable().optional()
}).strict();