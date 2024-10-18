import { z } from "zod";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas/workspaces.schemas";

export type TWorkspaceCreation = z.infer<typeof createWorkspaceSchema>;

export type TWorkspaceUpdate = z.infer<typeof updateWorkspaceSchema>;
