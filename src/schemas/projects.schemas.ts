import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(3).max(50),
    thumbnail: z.string().min(3).max(50).nullable(),
}).strict()
