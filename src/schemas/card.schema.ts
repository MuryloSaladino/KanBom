import { z } from "zod";

export const createCardListSchema = z.object({
    name: z.string().min(1).max(50),
    color: z.string().length(7).optional(),
}).strict();

export const updateCardListSchema = createCardListSchema.partial().strict();


export const createCardSchema = z.object({
    description: z.string().min(1).max(50),
}).strict();
