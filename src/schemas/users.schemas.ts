import { z } from "zod";

export const UserSchema = z.object({
    email: z
        .string()
        .email("Choose a valid email format"),
    password: z
        .string()
        .min(8, "At least 8 characters")
        .regex(/(?=.*?[A-Z])/, "At least one uppercase letter")
        .regex(/(?=.*?[a-z])/, "At least one lowercase letter")
        .regex(/(?=.*?[0-9])/, "At least one number")
        .regex(/(?=.*?[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, { message: "At least one special character" }),
    confirm: z
        .string(),
    details: z.object({
        firstName: z
            .string()
            .min(2, "At least 2 characters"),
        lastName: z 
            .string()
            .min(2, "At least 2 characters"),
        birthdate: z
            .string()
    }),
}).refine(({ password, confirm }) => password === confirm, {
    message: "Password doesn't match",
    path: ["confirm"],
})