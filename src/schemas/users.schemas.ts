import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    details: z.object({
        birthdate: z.date(),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(255),
        profilePicture: z.string().max(255)
    })
}).strict();

export const updateUserSchema = z.object({
    birthdate: z.date().optional(),
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(255).optional(),
    profilePicture: z.string().max(255).optional()
})