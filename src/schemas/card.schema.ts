import { z } from "zod";

export const CardListSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().length(7).optional(),
}).strict();

export const CardSchema = z.object({
    description: z.string().min(1).max(50),
}).strict();
