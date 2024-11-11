import { z } from "zod";

export const WorkspaceSchema = z.object({
    name: z.string().min(3).max(50),
}).strict()
