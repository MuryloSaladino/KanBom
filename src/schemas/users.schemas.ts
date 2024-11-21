import { z } from "zod";

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    details: z.object({
        birthdate: z.string().date(),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(255),
        profilePicture: z.string().max(255).nullable().optional()
    }).strict(),
}).strict();
