import { z } from "zod";

export const CardListSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().length(7).optional(),
    index: z.number().nonnegative(),
}).strict();

export const CardSchema = z.object({
    description: z.string().min(1).max(50),
    detailedDescription: z.string(),
    startDate: z.string().datetime().nullable(),
    finishDate: z.string().datetime().nullable(),
    index: z.number().nonnegative(),
}).strict();
